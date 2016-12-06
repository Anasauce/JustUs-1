import axios from 'axios';

const service = {
  getResources: () => axios.get('/resource')
};

export default service;

