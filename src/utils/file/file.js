export const bufferToFile = (buffer, contentType, fileName = 'image.jpg') => {
  const blob = new Blob([new Uint8Array(buffer)], { type: contentType })
  return new File([blob], fileName, { type: contentType })
}
