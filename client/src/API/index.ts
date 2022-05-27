const API =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/mock';

export default API;
