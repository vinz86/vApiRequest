interface ApiModule {
  name: string;
  module: any;
  endpoints: Record<string, any>;
}

// Registro globale dei moduli
export class ApiModuleRegistry {
  private static modules: Record<string, ApiModule> = {};

  static register(name: string, module: any, endpoints: Record<string, any>): void {
    if (ApiModuleRegistry.modules[name]) {
      throw new Error(`Il modulo ${name} è già registrato.`);
    }
    ApiModuleRegistry.modules[name] = { name, module, endpoints };
  }

  static unregister(name: string): void {
    if (!ApiModuleRegistry.modules[name]) {
      throw new Error(`Il modulo ${name} non è registrato.`);
    }
    delete ApiModuleRegistry.modules[name];
  }

  static getModule(name: string): ApiModule | undefined {
    return ApiModuleRegistry.modules[name];
  }

  static getAllModules(): Record<string, ApiModule> {
    return { ...ApiModuleRegistry.modules };
  }
}
