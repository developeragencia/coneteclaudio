import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCache, usePaginatedCache } from '../useCache';

describe('useCache', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('deve inicializar com dados iniciais', () => {
    const initialData = { test: 'data' };
    const { result } = renderHook(() =>
      useCache({
        key: 'test',
        initialData,
      })
    );

    expect(result.current.data).toEqual(initialData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve atualizar dados com sucesso', async () => {
    const { result } = renderHook(() =>
      useCache<{ value: number }>({
        key: 'test',
      })
    );

    const newData = { value: 42 };
    await act(async () => {
      await result.current.update(async () => newData);
    });

    expect(result.current.data).toEqual(newData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    // Verificar se foi salvo no localStorage
    const cached = localStorage.getItem('@SecureBridge:cache:test');
    expect(cached).toBeTruthy();
    const parsedCache = JSON.parse(cached!);
    expect(parsedCache.data).toEqual(newData);
  });

  it('deve lidar com erros corretamente', async () => {
    const error = new Error('Test error');
    const onError = vi.fn();

    const { result } = renderHook(() =>
      useCache({
        key: 'test',
        onError,
      })
    );

    await act(async () => {
      try {
        await result.current.update(async () => {
          throw error;
        });
      } catch (e) {
        // Erro esperado
      }
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(error);
    expect(onError).toHaveBeenCalledWith(error);
  });

  it('deve limpar cache corretamente', () => {
    const initialData = { test: 'data' };
    const { result } = renderHook(() =>
      useCache({
        key: 'test',
        initialData,
      })
    );

    act(() => {
      result.current.clear();
    });

    expect(result.current.data).toBeUndefined();
    expect(localStorage.getItem('@SecureBridge:cache:test')).toBeNull();
  });

  it('deve respeitar TTL do cache', async () => {
    const ttl = 100; // 100ms
    const initialData = { test: 'data' };

    const { result } = renderHook(() =>
      useCache({
        key: 'test',
        ttl,
        initialData,
      })
    );

    // Salvar dados no cache
    await act(async () => {
      await result.current.update(async () => ({ test: 'new data' }));
    });

    // Esperar o TTL expirar
    await new Promise((resolve) => setTimeout(resolve, ttl + 50));

    // Rerender o hook
    const { result: newResult } = renderHook(() =>
      useCache({
        key: 'test',
        ttl,
      })
    );

    // Cache deve estar vazio
    expect(newResult.current.data).toBeUndefined();
  });
});

describe('usePaginatedCache', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('deve gerenciar estado de paginação corretamente', async () => {
    const { result } = renderHook(() =>
      usePaginatedCache<{ id: number }>({
        baseKey: 'test',
      })
    );

    const page1Data = {
      items: [{ id: 1 }, { id: 2 }],
      total: 4,
      page: 1,
      per_page: 2,
      total_pages: 2,
    };

    await act(async () => {
      await result.current.updatePage(1, 2, async () => page1Data);
    });

    expect(result.current.items).toEqual(page1Data.items);
    expect(result.current.page).toBe(1);
    expect(result.current.per_page).toBe(2);
    expect(result.current.total_pages).toBe(2);

    const page2Data = {
      items: [{ id: 3 }, { id: 4 }],
      total: 4,
      page: 2,
      per_page: 2,
      total_pages: 2,
    };

    await act(async () => {
      await result.current.updatePage(2, 2, async () => page2Data);
    });

    expect(result.current.items).toEqual(page2Data.items);
    expect(result.current.page).toBe(2);
  });

  it('deve manter cache separado para diferentes páginas', async () => {
    const { result } = renderHook(() =>
      usePaginatedCache<{ id: number }>({
        baseKey: 'test',
      })
    );

    const page1Data = {
      items: [{ id: 1 }],
      total: 2,
      page: 1,
      per_page: 1,
      total_pages: 2,
    };

    const page2Data = {
      items: [{ id: 2 }],
      total: 2,
      page: 2,
      per_page: 1,
      total_pages: 2,
    };

    // Carregar página 1
    await act(async () => {
      await result.current.updatePage(1, 1, async () => page1Data);
    });

    // Carregar página 2
    await act(async () => {
      await result.current.updatePage(2, 1, async () => page2Data);
    });

    // Verificar cache das duas páginas
    const cache1 = localStorage.getItem('@SecureBridge:cache:test:page=1:per_page=1');
    const cache2 = localStorage.getItem('@SecureBridge:cache:test:page=2:per_page=1');

    expect(JSON.parse(cache1!).data).toEqual(page1Data);
    expect(JSON.parse(cache2!).data).toEqual(page2Data);
  });
}); 