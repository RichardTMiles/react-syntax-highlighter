export default <T>(name: string, loader: () => Promise<T>) => {
  return async (registerLanguage : (name:string, module: any) => void)  => {
    const module = await loader();
    // Use a type assertion here to indicate that module might have a default property
    const mod = module as T & { default?: T };
    registerLanguage(name, mod.default || module);
  };
};
