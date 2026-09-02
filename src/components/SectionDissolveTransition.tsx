import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useTransform, MotionValue } from 'motion/react';

const coverVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const coverFragmentShader = `
  uniform vec2 uResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uEdgeIntensity;
  uniform float uEdgeBrightness;
  uniform vec3 uAccentColor;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }

  void main() {
    vec2 centeredUv = vUv - uCenter;
    float aspect = uResolution.x / uResolution.y;
    centeredUv.x *= aspect;
    float dist = length(centeredUv);
    float angle = atan(centeredUv.y, centeredUv.x);
    
    float noiseScale = 5.0;
    vec2 pixelatedUv = floor(vUv * uResolution / noiseScale) * noiseScale / uResolution;
    float blockNoise = fbm(pixelatedUv * 40.0 + uTime * 0.25) * 0.22;
    float angularNoise = fbm(vec2(angle * 4.0, uTime * 0.15)) * 0.18;
    
    float totalNoise = blockNoise + angularNoise;
    float noisyDist = dist + totalNoise;
    
    float maxDist = length(vec2(aspect * 0.5, 0.5));
    float normalizedDist = noisyDist / maxDist;
    
    float dissolveThreshold = uDissolve * 1.45;
    float dissolveMask = smoothstep(dissolveThreshold - 0.04, dissolveThreshold + 0.02, normalizedDist);
    
    // Glowing laser energy wave along the boundary
    float edgeZoneWidth = 0.15 * (1.0 - uDissolve * 0.4) + 0.03;
    float edgeZone = smoothstep(dissolveThreshold - edgeZoneWidth, dissolveThreshold, normalizedDist) * 
                     smoothstep(dissolveThreshold + 0.04, dissolveThreshold, normalizedDist);
    
    float sparkle = hash(floor(vUv * uResolution / 4.0) + vec2(uTime * 12.0)) * edgeZone;
    
    vec3 baseTheme = vec3(0.0, 0.0, 0.0);
    vec3 edgeLaser = mix(vec3(1.0, 1.0, 1.0), uAccentColor, 0.78);
    
    vec3 finalColor = baseTheme;
    finalColor += edgeLaser * edgeZone * 4.0 * uEdgeIntensity;
    finalColor += vec3(sparkle * 5.0 * uEdgeBrightness);
    
    // Black veil opacity wiping out the previous layout
    float alpha = (1.0 - dissolveMask) * min(1.0, uDissolve * 1.8);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface DissolveSceneProps {
  progressValue: number;
}

const DissolveScene: React.FC<DissolveSceneProps> = ({ progressValue }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uDissolve: { value: 0.0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0.0 },
      uEdgeIntensity: { value: 1.0 },
      uEdgeBrightness: { value: 1.0 },
      uAccentColor: { value: new THREE.Color('#f05228') },
    }),
    [size]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uDissolve.value = progressValue;
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={coverVertexShader}
        fragmentShader={coverFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};

interface SectionDissolveTransitionProps {
  scrollYProgress?: MotionValue<number>;
}

export const SectionDissolveTransition: React.FC<SectionDissolveTransitionProps> = ({
  scrollYProgress,
}) => {
  const [glSupported, setGlSupported] = useState<boolean>(true);
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  // Dedicated transition window: 0.64 to 0.82 (dissolves previous layout completely before next section emerges)
  const mappedDissolve = useTransform(
    scrollYProgress ?? ({ get: () => 0 } as any),
    [0.64, 0.82],
    [0, 1]
  );

  useEffect(() => {
    if (scrollYProgress) {
      return mappedDissolve.on('change', (v) => {
        setCurrentProgress(v);
      });
    }
  }, [scrollYProgress, mappedDissolve]);

  // Transition overlay visibility: active strictly during 0.64 - 0.86
  const transitionOpacity = useTransform(
    scrollYProgress ?? ({ get: () => 0 } as any),
    [0.63, 0.65, 0.82, 0.86],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity: transitionOpacity }}
      className="absolute inset-0 w-full h-full pointer-events-none z-25 overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1. WebGL Shader Dissolve Field */}
      {glSupported && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Canvas
            dpr={1}
            frameloop="always"
            gl={{ alpha: true, antialias: false }}
            onError={() => setGlSupported(false)}
          >
            <OrthographicCamera
              makeDefault
              manual
              left={-1}
              right={1}
              top={1}
              bottom={-1}
              near={0.1}
              far={10}
              position={[0, 0, 1]}
            />
            <React.Suspense fallback={null}>
              <DissolveScene progressValue={currentProgress} />
            </React.Suspense>
          </Canvas>
        </div>
      )}
    </motion.div>
  );
};

export default SectionDissolveTransition;
