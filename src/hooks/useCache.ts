import { useState, useEffect, useCallback } from 'react';

interface CacheConfig<T> {
  key: string;
  ttl?: number; // Time to live in milliseconds
  initialData?: T;
  onError?: (error: Error) => void;
}

interface CacheData<T> {
  data: T;
  timestamp: number;
}

const CACHE_PREFIX = '@SecureBridge:cache:';
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export function useCache<T>({
  key,
  ttl = DEFAULT_TTL,
  initialData,
  onError,
}: CacheConfig<T>) {
  const cacheKey = CACHE_PREFIX + key;
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Carregar dados do cache
  const loadFromCache = useCallback((): T | undefined => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return undefined;

      const { data, timestamp }: CacheData<T> = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > ttl;

      if (isExpired) {
        localStorage.removeItem(cacheKey);
        return undefined;
      }

      return data;
    } catch (err) {
      console.error('Erro ao carregar cache:', err);
      localStorage.removeItem(cacheKey);
      return undefined;
    }
  }, [cacheKey, ttl]);

  // Salvar dados no cache
  const saveToCache = useCallback((data: T) => {
    try {
      const cacheData: CacheData<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (err) {
      console.error('Erro ao salvar cache:', err);
    }
  }, [cacheKey]);

  // Atualizar dados
  const update = useCallback(async (fetchFn: () => Promise<T>) => {
    setLoading(true);
    setError(null);

    try {
      const newData = await fetchFn();
      setData(newData);
      saveToCache(newData);
      return newData;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [saveToCache, onError]);

  // Limpar cache
  const clear = useCallback(() => {
    localStorage.removeItem(cacheKey);
    setData(undefined);
  }, [cacheKey]);

  // Carregar dados iniciais do cache
  useEffect(() => {
    const cached = loadFromCache();
    if (cached) {
      setData(cached);
    }
  }, [loadFromCache]);

  return {
    data,
    loading,
    error,
    update,
    clear,
  };
}

// Hook para lista paginada com cache
export interface PaginatedCache<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface PaginatedCacheConfig<T> extends Omit<CacheConfig<PaginatedCache<T>>, 'key'> {
  baseKey: string;
}

export function usePaginatedCache<T>({
  baseKey,
  ttl,
  initialData,
  onError,
}: PaginatedCacheConfig<T>) {
  const getCacheKey = (page: number, per_page: number) => 
    `${baseKey}:page=${page}:per_page=${per_page}`;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data,
    loading,
    error,
    update,
    clear,
  } = useCache<PaginatedCache<T>>({
    key: getCacheKey(currentPage, itemsPerPage),
    ttl,
    initialData,
    onError,
  });

  const updatePage = useCallback(async (
    page: number,
    per_page: number,
    fetchFn: () => Promise<PaginatedCache<T>>
  ) => {
    setCurrentPage(page);
    setItemsPerPage(per_page);
    return update(fetchFn);
  }, [update]);

  return {
    items: data?.items || [],
    total: data?.total || 0,
    page: currentPage,
    per_page: itemsPerPage,
    total_pages: data?.total_pages || 0,
    loading,
    error,
    updatePage,
    clear,
  };
} 