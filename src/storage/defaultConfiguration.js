import { ConfigurationService } from '@/services/configuration';

const configuration = {
    origin: location.origin,
    apiUrl: '/api_st/v1',
    timeout: 2500,
};

export const conf = new ConfigurationService(configuration);