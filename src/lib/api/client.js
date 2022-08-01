import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = 'http://localhost:1337`';

// client.defaults.headers.common['Authorization'] = 'Bearer';

export default client;