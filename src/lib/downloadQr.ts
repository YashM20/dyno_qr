"use client"
import html2canvas from 'html2canvas';

export default async function downloadQr(format: 'jpeg' | 'png' | 'svg' | 'webp', elementId: string) {
  const qrElement = document.getElementById(elementId);
  if (!qrElement) {
    console.error(`QR code element with id "${elementId}" not found`);
    return;
  }

  try {
    if (format === 'svg') {
      // Handle SVG download
      const svgElement = qrElement.querySelector('svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = 'qr-code.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
      } else {
        console.error('SVG element not found');
      }
    } else {
      // Handle other formats (jpeg, png, webp)
      const canvas = await html2canvas(qrElement);
      const dataUrl = canvas.toDataURL(`image/${format}`);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `qr-code.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error('Error generating QR code image:', error);
  }
}
