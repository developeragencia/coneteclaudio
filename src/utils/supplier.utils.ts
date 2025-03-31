import { PixKeyType } from '@/types/supplier.types';

export const formatCNPJ = (cnpj: string): string => {
  // Remove caracteres não numéricos
  const numbers = cnpj.replace(/\D/g, '');
  
  // Aplica a máscara: XX.XXX.XXX/XXXX-XX
  return numbers.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};

export const validateCNPJ = (cnpj: string): boolean => {
  // Remove caracteres não numéricos
  const numbers = cnpj.replace(/\D/g, '');

  // Verifica se tem 14 dígitos
  if (numbers.length !== 14) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(numbers)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(numbers[i]) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (parseInt(numbers[12]) !== digit) {
    return false;
  }

  // Validação do segundo dígito verificador
  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(numbers[i]) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (parseInt(numbers[13]) !== digit) {
    return false;
  }

  return true;
};

export const formatBankBranch = (branch: string): string => {
  // Remove caracteres não numéricos
  return branch.replace(/\D/g, '').slice(0, 4);
};

export const formatBankAccount = (account: string): string => {
  // Remove caracteres não numéricos
  const numbers = account.replace(/\D/g, '');
  
  // Aplica a máscara: XXXXX-X
  return numbers.replace(/^(\d{1,5})(\d{1})$/, '$1-$2');
};

export const formatPixKey = (key: string, type: PixKeyType): string => {
  switch (type) {
    case 'cpf':
      // Remove caracteres não numéricos e aplica máscara: XXX.XXX.XXX-XX
      return key.replace(/\D/g, '').replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4'
      );
    case 'cnpj':
      return formatCNPJ(key);
    case 'phone':
      // Remove caracteres não numéricos e aplica máscara: (XX) XXXXX-XXXX
      return key.replace(/\D/g, '').replace(
        /^(\d{2})(\d{5})(\d{4})$/,
        '($1) $2-$3'
      );
    case 'email':
      return key.toLowerCase();
    case 'random':
      // Remove caracteres não alfanuméricos
      return key.replace(/[^a-zA-Z0-9-]/g, '');
    default:
      return key;
  }
};

export const validatePixKey = (key: string, type: PixKeyType): boolean => {
  const cleanKey = key.replace(/\D/g, '');
  
  switch (type) {
    case 'cpf':
      return cleanKey.length === 11;
    case 'cnpj':
      return validateCNPJ(key);
    case 'phone':
      return cleanKey.length === 11;
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key);
    case 'random':
      return key.length >= 32 && key.length <= 36;
    default:
      return false;
  }
}; 