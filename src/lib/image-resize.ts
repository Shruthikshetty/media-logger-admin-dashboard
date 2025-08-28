type ImageResizeOptions = {
  img: HTMLImageElement;
  maxWidth: number;
  maxHeight: number;
};

/**
 * Resize an image while keeping aspect ratio, to fit within a given maxWidth and maxHeight.
 *
 * @param {HTMLImageElement} img - The image to resize.
 * @param {number} maxWidth - The maximum width of the resized image.
 * @param {number} maxHeight - The maximum height of the resized image.
 *
 * @returns {string} A data URI of the resized image.
 * @throws {Error} If the canvas context is not available.
 */

export function resizeImageKeepAspect({
  img,
  maxWidth,
  maxHeight,
}: ImageResizeOptions) {
  const { width, height } = img;

  let newWidth = width;
  let newHeight = height;

  // If image is larger than max, scale down
  if (width > maxWidth || height > maxHeight) {
    const widthRatio = maxWidth / width;
    const heightRatio = maxHeight / height;
    const scale = Math.min(widthRatio, heightRatio);
    newWidth = Math.round(width * scale);
    newHeight = Math.round(height * scale);
  }

  // Now draw on canvas
  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.drawImage(img, 0, 0, newWidth, newHeight);

  return canvas.toDataURL('image/jpeg');
}

/**
 * Converts a data URI (base64) to a File object
 * @param dataUrl The data URL string (e.g., "data:image/jpeg;base64,...")
 * @param filename Desired filename (with extension)
 * @returns File object
 */
export function dataURLToFile(dataUrl: string, filename: string): File {
  const [prefix, base64] = dataUrl.split(',');
  const mimeMatch = prefix.match(/:(.*?);/);
  const mime: string = mimeMatch ? mimeMatch[1] : 'application/octet-stream';

  const binary = window.atob(base64);
  const array = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }

  return new File([array], filename, { type: mime });
}
