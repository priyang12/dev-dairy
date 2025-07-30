const Endpoint =
  import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5001/api';

const isTest = import.meta.env.VITE_APP_ENVIRONMENT;
const API = isTest === 'test' ? '/mock' : Endpoint;

export default API;
