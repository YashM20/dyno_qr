"use client"
import html2canvas from 'html2canvas';

export default async function downloadQr(format: 'jpeg' | 'png') {
  const qrElement = document.querySelector('.qr-code-element') as HTMLElement;
  if (!qrElement) {
    console.error('QR code element not found');
    return;
  }

  try {
    const canvas = await html2canvas(qrElement);
    const dataUrl = format === 'jpeg' ? canvas.toDataURL('image/jpeg') : canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `qr-code.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error generating QR code image:', error);
  }
}
