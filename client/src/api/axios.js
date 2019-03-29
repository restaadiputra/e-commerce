import axios from 'axios';

export default axios.create({
  baseURL: 'http://ecommerceserver.restadev.com',
  // baseURL: 'http://localhost:3000',
});
