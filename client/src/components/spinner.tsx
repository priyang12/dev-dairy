import Loading from '../Assets/loading.gif';

export default () => (
  <div className="top">
    <img
      src={Loading}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="loading..."
    />
  </div>
);
