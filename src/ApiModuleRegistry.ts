interface Extension {
  name: string;
  module: any;
  endpoints: Record<string, any>;
}

export class ApiModuleRegistry {
  private static extensions: Record<string, Extension> = {};

  static register(name: string, module: any, endpoints: Record<string, any>): void {
    if (ApiModuleRegistry.extensions[name]) {
      throw new Error(`Extension with name ${name} is already registered.`);
    }
    ApiModuleRegistry.extensions[name] = { name, module, endpoints };
  }

  static unregister(name: string): void {
    if (!ApiModuleRegistry.extensions[name]) {
      throw new Error(`Extension with name ${name} is not registered.`);
    }
    delete ApiModuleRegistry.extensions[name];
  }

  static getExtension(name: string): Extension | undefined {
    return ApiModuleRegistry.extensions[name];
  }

  static getAllExtensions(): Record<string, Extension> {
    return { ...ApiModuleRegistry.extensions };
  }
}
