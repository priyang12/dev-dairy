const Endpoint =
  process.env.NODE_ENV === 'production' ? `/api` : 'http://localhost:5001/api';

const API = process.env.REACT_APP_ENVIRONMENT === 'test' ? '/mock' : Endpoint;

export default API;
