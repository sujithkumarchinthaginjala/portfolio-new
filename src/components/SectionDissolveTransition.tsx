import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useTransform, MotionValue } from 'motion/react';

const liquidPixelVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const liquidPixelFragmentShader = `
  uniform vec2 uResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform vec3 uAccentColor;
  uniform vec3 uSecondaryColor;
  varying vec2 vUv;

  // High quality hash
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // 2D Value Noise
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Fractional Brownian Motion for viscous fluid simulation
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.87758, 0.47942, -0.47942, 0.87758);
    for (int i = 0; i < 4; i++) {
      v += a * vnoise(p);
      p = rot * p * 2.02 + vec2(100.0);
      a *= 0.5;
    }
    return v;
  }

  // 2D Domain Warping for organic liquid flow
  vec2 liquidDomainWarp(vec2 p, float t) {
    vec2 q = vec2(
      fbm(p + vec2(t * 0.14, t * 0.07)),
      fbm(p + vec2(5.2, 1.3) + vec2(-t * 0.10, t * 0.16))
    );

    vec2 r = vec2(
      fbm(p + 3.2 * q + vec2(1.7, 9.2) + vec2(t * 0.08, -t * 0.12)),
      fbm(p + 3.2 * q + vec2(8.3, 2.8) + vec2(-t * 0.09, t * 0.06))
    );

    return r;
  }

  void main() {
    vec2 st = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 aspectVec = vec2(aspect, 1.0);

    // Continuous time for living fluid motion
    float t = uTime * 0.55;

    // Fluid domain warping vector
    vec2 flow = liquidDomainWarp(st * 3.2 * aspectVec, t);

    // Subtle cursor ripple effect if interacting
    vec2 pointerDiff = (st - uPointer) * aspectVec;
    float mouseDist = length(pointerDiff);
    float mouseRipple = sin(mouseDist * 24.0 - t * 4.0) * exp(-mouseDist * 4.5) * 0.025;

    // Dynamic pixel grid sizing:
    // Transitions from fine matrix to chunky tactile liquid pixel droplets, dissolves smoothly
    float peak = sin(clamp(uDissolve, 0.0, 1.0) * 3.14159265);
    float pixelSize = mix(8.0, 38.0, pow(peak, 0.75));

    // Calculate pixel grid
    vec2 gridRes = uResolution / max(pixelSize, 1.0);

    // Displace the pixel grid sampling with the fluid flow vector + mouse ripple (Liquid Pixelation)
    float fluidDistortStrength = (0.04 + 0.14 * peak);
    vec2 fluidUv = st + (flow - 0.5) * fluidDistortStrength + normalize(pointerDiff + 0.0001) * mouseRipple;

    // Quantized pixel cell ID & normalized coordinates inside cell [0, 1]
    vec2 cellCoord = fluidUv * gridRes;
    vec2 cellId = floor(cellCoord);
    vec2 cellUv = fract(cellCoord);
    vec2 p = cellUv - 0.5; // [-0.5, 0.5]

    // Liquid Droplet SDF: rounded droplet with surface tension
    // Rounded box with soft curved corners
    vec2 b = vec2(0.36); // droplet core size
    vec2 d = abs(p) - b;
    float dropletDist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
    float dropletShape = smoothstep(0.09, -0.02, dropletDist);

    // 3D pseudo-normal for glossy liquid refraction & specular sheen
    float dome = sqrt(max(0.0, 0.25 - dot(p, p)));
    vec3 normal = normalize(vec3(p.x * 2.4, p.y * 2.4, max(dome, 0.15)));

    // Studio directional light for liquid specular highlight
    vec3 lightDir = normalize(vec3(0.45, 0.75, 0.75));
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfVec = normalize(lightDir + viewDir);
    float NdotH = max(dot(normal, halfVec), 0.0);
    float specular = pow(NdotH, 22.0) * dropletShape;

    // Dissolve Wavefront calculation (Radial + Flow + Directional cascading liquid sweep)
    vec2 centeredUv = (st - uCenter) * aspectVec;
    float dist = length(centeredUv);
    
    // Liquid wave front modulated by fluid noise
    float waveFront = dist * 0.75 + (1.0 - st.y) * 0.25 + (flow.x + flow.y - 1.0) * 0.24;
    
    // Wave threshold drives the transition
    float sweep = uDissolve * 1.50;

    // Triple-band chromatic aberration across the fluid boundary
    float chromaSpread = 0.04 * (0.35 + 0.65 * peak);
    float maskR = smoothstep(sweep - 0.06 - chromaSpread, sweep + 0.04, waveFront);
    float maskG = smoothstep(sweep - 0.06, sweep + 0.04, waveFront);
    float maskB = smoothstep(sweep - 0.06 + chromaSpread, sweep + 0.04, waveFront);

    // Glowing liquid reaction edge zone
    float edgeWidth = 0.20 * (1.0 - uDissolve * 0.3) + 0.04;
    float edgeZone = smoothstep(sweep - edgeWidth, sweep, waveFront) * 
                     smoothstep(sweep + 0.06, sweep, waveFront);

    // Liquid cell sparkle & bio-electric caustics along the active edge
    float cellHash = hash(cellId + floor(uTime * 8.0));
    float sparkle = cellHash * edgeZone * step(0.65, hash(cellId * 1.37));

    // Base obsidian liquid veil (dark deep black fluid that obscures underlying section)
    vec3 liquidBody = vec3(0.015, 0.015, 0.022);

    // Color gradient across the molten rim:
    // Brand fiery orange (#f05228) -> Molten amber (#ff9040) -> Hot white core
    vec3 moltenRim = mix(uAccentColor, uSecondaryColor, clamp(flow.x * 1.2, 0.0, 1.0));
    moltenRim = mix(moltenRim, vec3(1.0, 0.96, 0.92), smoothstep(0.72, 1.0, edgeZone));

    // Compose final color
    vec3 col = liquidBody;

    // Add glowing liquid pixels
    col += moltenRim * edgeZone * 3.8 * dropletShape;

    // Add chromatic dispersion on edge
    col.r += (1.0 - maskR) * edgeZone * 0.85;
    col.b += (1.0 - maskB) * edgeZone * 0.45;

    // Add 3D specular shine & caustics
    col += vec3(1.0, 0.94, 0.88) * (specular * 1.9 * (0.4 + edgeZone * 1.2));
    col += vec3(1.0, 0.82, 0.65) * (sparkle * 4.5);

    // Alpha mask: wipe out previous layer cleanly as wave expands
    float combinedMask = (1.0 - maskG);
    
    // Liquid alpha fades in and forms a complete transition veil
    float veilAlpha = smoothstep(0.0, 0.15, uDissolve);
    float alpha = combinedMask * veilAlpha;
    
    // Make sure edge glowing elements have solid presence
    alpha = max(alpha, edgeZone * dropletShape * 1.2);
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

interface DissolveSceneProps {
  progressValue: number;
}

const DissolveScene: React.FC<DissolveSceneProps> = ({ progressValue }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const targetProgress = useRef<number>(0);
  const currentProgress = useRef<number>(0);
  const targetPointer = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const { size } = useThree();

  // Update target whenever scroll changes
  useEffect(() => {
    targetProgress.current = progressValue;
  }, [progressValue]);

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uDissolve: { value: 0.0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0.0 },
      uAccentColor: { value: new THREE.Color('#f05228') },
      uSecondaryColor: { value: new THREE.Color('#ff9040') },
    }),
    [size]
  );

  useFrame((state, delta) => {
    // Smooth lerp for buttery liquid viscosity
    const lerpSpeed = Math.min(1.0, delta * 12.0);
    currentProgress.current += (targetProgress.current - currentProgress.current) * lerpSpeed;

    // Track normalized pointer [0, 1]
    targetPointer.current.set(
      state.pointer.x * 0.5 + 0.5,
      -state.pointer.y * 0.5 + 0.5
    );

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uDissolve.value = currentProgress.current;
      materialRef.current.uniforms.uPointer.value.lerp(targetPointer.current, 0.1);
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={liquidPixelVertexShader}
        fragmentShader={liquidPixelFragmentShader}
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

  // Dedicated liquid pixel transition window: 0.61 to 0.81
  const mappedDissolve = useTransform(
    scrollYProgress ?? ({ get: () => 0 } as any),
    [0.61, 0.81],
    [0, 1]
  );

  useEffect(() => {
    if (scrollYProgress) {
      return mappedDissolve.on('change', (v) => {
        setCurrentProgress(v);
      });
    }
  }, [scrollYProgress, mappedDissolve]);

  // Transition overlay visibility: active strictly during 0.60 - 0.85
  const transitionOpacity = useTransform(
    scrollYProgress ?? ({ get: () => 0 } as any),
    [0.60, 0.63, 0.81, 0.85],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity: transitionOpacity }}
      className="absolute inset-0 w-full h-full pointer-events-none z-25 overflow-hidden flex items-center justify-center select-none"
    >
      {/* WebGL Liquid Pixel Shader Transition Canvas */}
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
