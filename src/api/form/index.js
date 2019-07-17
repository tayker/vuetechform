import axios from 'axios';

export const getData = () => axios.get('http://localhost:3000/form');

export const sendData = (params) => axios.post('http://localhost:3000/formRes', params);