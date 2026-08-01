export function downloadResume() {
  // Using an iframe to trigger the download seamlessly as requested
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = '/resume/Sujith_resume_@1.pdf';
  document.body.appendChild(iframe);
  
  // Cleanup the iframe after download initializes
  setTimeout(() => {
    if (document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
  }, 10000);
}

export function openPrintableResume() {
  const win = window.open('', '_blank');
  if (!win) {
    // Fallback if popup blocker is active
    downloadResume();
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sujith Kumar Chinthaginjala - Resume</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
          background-color: #333;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      </style>
    </head>
    <body>
      <iframe src="/resume/Sujith_resume_@1.pdf" title="Sujith Kumar Resume"></iframe>
    </body>
    </html>
  `);
  win.document.close();
}
