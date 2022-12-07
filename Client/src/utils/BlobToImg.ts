async function BlobToImg(blob: Blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      const base64String = e.target.result;
      base64String.replace('application/octet-stream', 'image/png');
      resolve(base64String);
    };
    fileReader.onerror = (e: any) => {
      reject(e);
    };
    fileReader.readAsDataURL(blob);
  });
}

export default BlobToImg;
