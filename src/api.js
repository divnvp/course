import router from './router';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.1.1.87:8081',
    timeout: 2500,
});

axios.defaults.withCredentials = true

instance.interceptors.response.use(({ data }) => data);
instance.interceptors.response.use(null, (err) => {
    const { status, config } = (err && err.response) || {};
    if (status === 401 && !config.url.endsWith('/auth')) {
        console.info('redirect to /auth');
        router.push({ name: 'auth' });
    }
    throw err;
});

export default instance;
