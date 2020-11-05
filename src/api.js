import router from './router';
import axios from 'axios';

import { conf } from '@/storage/defaultConfiguration';

const CFG = conf.load();

const instance = axios.create({
    // baseURL: CFG.origin + CFG.apiUrl,
    baseURL: 'http://localhost:8081',
    timeout: CFG.timeout,
});

instance.interceptors.response.use(({ data }) => data);
instance.interceptors.response.use(null, (err) => {
    const { status, config } = (err && err.response) || {};
    if (status === 401 && !config.url.endsWith('/auth')) {
        console.info('redirect to /auth');
        router.push({ name: 'auth' });
    }
    throw err;
});

// instance.units = () => instance.get('/unit');
//
// instance.unit = (id) => {
//     const unitId = id !== undefined ? id : router.currentRoute.params.unit_id;
//     const formatUrl = fn => (url, ...args) => fn(join('unit', unitId.toString(), url), ...args);
//     return {
//         get: formatUrl(instance.get),
//         post: formatUrl(instance.post),
//         put: formatUrl(instance.put),
//         delete: formatUrl(instance.delete),
//     };
// };

export default instance;
