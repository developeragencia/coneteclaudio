import axios from 'axios';
import { CNPJResponse, CNPJError } from '../types/cnpj';

const CACHE_KEY = 'cnpj_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

interface CacheItem {
  data: CNPJResponse;
  timestamp: number;
}

const getCachedData = (cnpj: string): CNPJResponse | null => {
  const cache = localStorage.getItem(CACHE_KEY);
  if (!cache) return null;

  const cacheData = JSON.parse(cache) as Record<string, CacheItem>;
  const item = cacheData[cnpj];

  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_DURATION) {
    delete cacheData[cnpj];
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    return null;
  }

  return item.data;
};

const setCacheData = (cnpj: string, data: CNPJResponse): void => {
  const cache = localStorage.getItem(CACHE_KEY);
  const cacheData = cache ? JSON.parse(cache) : {};

  cacheData[cnpj] = {
    data,
    timestamp: Date.now(),
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

const formatCNPJ = (cnpj: string): string => {
  return cnpj.replace(/\D/g, '');
};

const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length !== 14) return false;

  // Validação do dígito verificador
  let soma = 0;
  let peso = 2;

  for (let i = 11; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }

  let digito = 11 - (soma % 11);
  if (digito > 9) digito = 0;

  if (parseInt(cnpj.charAt(12)) !== digito) return false;

  soma = 0;
  peso = 2;

  for (let i = 12; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }

  digito = 11 - (soma % 11);
  if (digito > 9) digito = 0;

  return parseInt(cnpj.charAt(13)) === digito;
};

export const consultarCNPJ = async (cnpj: string): Promise<CNPJResponse> => {
  try {
    const formattedCNPJ = formatCNPJ(cnpj);

    if (!validateCNPJ(formattedCNPJ)) {
      throw new Error('CNPJ inválido');
    }

    // Verifica cache
    const cachedData = getCachedData(formattedCNPJ);
    if (cachedData) {
      return cachedData;
    }

    const response = await axios.get<CNPJResponse>(
      `${import.meta.env.VITE_API_URL}/cnpj/${formattedCNPJ}`,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }
    );

    // Salva no cache
    setCacheData(formattedCNPJ, response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as CNPJError;
      throw new Error(errorData?.message || 'Erro ao consultar CNPJ');
    }
    throw error;
  }
}; 