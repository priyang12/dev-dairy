import { Toaster } from 'react-hot-toast';

function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      reverseOrder={false}
      containerStyle={{
        zIndex: '9999',
        top: '25%',
      }}
      containerClassName=""
      toastOptions={{
        className: '',
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
        },

        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
      }}
    />
  );
}

export default CustomToaster;
