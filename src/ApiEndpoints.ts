import type {Endpoint} from './ApiModels';

/* Endpoint statici definiti per gli ambienti dev, test e prod */
const staticEndpoints: Endpoint = {
    testEndpoint: {
        dev: 't_dev',
        test: 't_test',
        prod: 't_prod',
    },
};

/* Tutti gli endpoint API, inclusi quelli statici e dinamici */
export const apiEndpoints: Endpoint = {
    ...staticEndpoints,
};