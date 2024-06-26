import { shallowRef } from "vue";
import { RemovableRef, useStorage, StorageSerializers } from "@vueuse/core";

export interface Cache<T> extends RemovableRef<T> {
  refresh: () => Promise<T>;
}

let caches: Record<string, RemovableRef<any>> = {};

function useCache<T>(key: string): RemovableRef<T> {
  return (caches[key] ||= import.meta.env.SSR
    ? shallowRef(null)
    : useStorage<T>(key, null, undefined, {
        serializer: StorageSerializers.object,
      }));
}

export async function withCache<T>(key: string, fn: () => T | Promise<T>) {
  const cache = useCache<T>(key) as Cache<T>;
  cache.refresh = async () => (cache.value = await fn());
  cache.value ||= await fn();
  return cache;
}
