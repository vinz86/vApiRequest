import type { Endpoints } from '../../../../vApiRequest_pkg/src/ApiModels'

export const todosEndpoints: Endpoints = {
  getTodo: {
    dev: 'todos/{id}',
    test: 'todos/{id}',
    prod: 'todos/{id}',
  }
};