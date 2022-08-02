import { ToastContainer } from 'react-toastify';

function CustomToaster() {
  return (
    <ToastContainer
      autoClose={false}
      draggableDirection="x"
      draggable
      draggablePercent={60}
      style={{
        position: 'fixed',
        top: '30%',
      }}
    />
  );
}

export default CustomToaster;
