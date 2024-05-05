import { defineStore } from 'pinia';

interface ApiStoreState {
  data: Record<string, Record<string, unknown>>;
}

export const useApiStore = defineStore('api', {
  state: (): ApiStoreState => ({
    data: {},
  }),
  actions: {
    setData(config: {
      module: string,
      endpoint: string,
      data: any
    }): void {
      const { module, endpoint, data } = config;

      if (!this.data[module]) {
        this.data[module] = {};
      }
      const key = `${endpoint}`;
      this.data[module][key] = data;
    },
    getData(config: {
      module: string,
      endpoint: string,
    }): unknown {
      const { module, endpoint } = config; // Aggiunto module
      if (!this.data[module]) {
        return undefined;
      }
      const key = `${endpoint}`;
      return this.data[module][key];
    },
    clearData(module: string): void {
      if (this.data[module]) {
        delete this.data[module];
      }
    },
    getAllData(module: string): Record<string, unknown> | undefined {
      return this.data[module];
    },
  },
});