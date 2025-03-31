import { useState, useCallback } from 'react';
import { consultarCNPJ } from '../services/cnpjService';
import { CNPJResponse } from '../types/cnpj';

interface UseCNPJState {
  data: CNPJResponse | null;
  loading: boolean;
  error: string | null;
}

export const useCNPJ = () => {
  const [state, setState] = useState<UseCNPJState>({
    data: null,
    loading: false,
    error: null,
  });

  const consultar = useCallback(async (cnpj: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await consultarCNPJ(cnpj);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao consultar CNPJ';
      setState({ data: null, loading: false, error: message });
      throw error;
    }
  }, []);

  const limpar = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    consultar,
    limpar,
  };
}; 