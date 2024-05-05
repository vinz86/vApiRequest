import { coursesEndpoints } from '@/services/modules/courses/Courses.endpoints'
import type { Endpoints } from '@/services/ApiModels'
import { todosEndpoints } from '@/services/modules/todos/Todos.endpoints'

export const apiEndpoints: Endpoints = {
  testEndpoint: {
    dev: 'test/{parametro1}',
    test: 't_test',
    prod: 't_prod',
  },

  // Importo gli apiEndpoints degli altri moduli se voglio suddividerlo
  ...coursesEndpoints,
  ...todosEndpoints
};