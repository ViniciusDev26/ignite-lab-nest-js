export interface Service<T = never, K = never> {
  execute: (params: T) => Promise<K>;
}
