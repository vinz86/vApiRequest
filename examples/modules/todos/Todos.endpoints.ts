import type { Endpoint } from 'vapirequest/src/ApiModels'

export const todosEndpoints: Endpoint = {
  getTodo: {
    dev: 'todos/{id}',
    test: 'todos/{id}',
    prod: 'todos/{id}',
  }
};