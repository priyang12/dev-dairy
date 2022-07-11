import jsmediatags from 'jsmediatags-web';

// url={SongFile}
// onLoadedMetadata={(event: any) =>
//   jsmediatags.read(event.target.src, {
//     onSuccess: (tag: any) => {
//       const { data } = tag.tags.picture;
//       const { format } = tag.tags.picture;

//       let base64String = '';

//       data.forEach((byte: any) => {
//         base64String += String.fromCharCode(byte);
//       });

//       setImgSrc(
//         `data:image/${format};base64,${window.btoa(base64String)}`,
//       );
//     },
//   })
// }
export default jsmediatags;
