import type { Endpoint } from './ApiModels';

// Endpoint statico
const staticEndpoints: Endpoint = {
  testEndpoint: {
    dev: 'test/{parametro1}',
    test: 't_test',
    prod: 't_prod',
  },
};

export const apiEndpoints: Endpoint = {
  ...staticEndpoints,
  //...dynamicEndpoints,
};
