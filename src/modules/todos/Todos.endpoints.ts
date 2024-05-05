import type { Endpoint } from "../../../../vApiRequest_pkg/src/ApiModels";

export const todosEndpoints: Endpoint = {
  getTodo: {
    dev: 'todos/{id}',
    test: 'todos/{id}',
    prod: 'todos/{id}',
  }
};