const Endpoint =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_BASE_URL
    : 'http://localhost:5001/api';

const isTest = import.meta.env.VITE_APP_ENVIRONMENT;
const API = isTest === 'test' ? 'http://localhost/mock' : Endpoint;

export default API;
