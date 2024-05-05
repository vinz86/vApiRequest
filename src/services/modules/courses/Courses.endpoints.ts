import type { Endpoints } from '@/services/ApiModels'

export const coursesEndpoints: Endpoints = {
  getCourses: {
    dev: 'courses.json',
    test: 'courses.json',
    prod: 'courses.json',
  },
  getCourse: {
    dev: '{course}/{chapter}/use_cpm.xml',
    test: '{course}/{chapter}/use_cpm.xml',
    prod: '{course}/{chapter}/use_cpm.xml',
  }
};