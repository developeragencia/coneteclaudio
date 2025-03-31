import React from 'react';
import { CNPJResponse } from '../types/cnpj';

interface CNPJInfoProps {
  data: CNPJResponse;
  onClose?: () => void;
}

export const CNPJInfo: React.FC<CNPJInfoProps> = ({ data, onClose }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Informações do CNPJ</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="sr-only">Fechar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Dados Básicos
          </h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">CNPJ</dt>
              <dd className="text-sm text-gray-900">{data.cnpj}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Razão Social</dt>
              <dd className="text-sm text-gray-900">{data.razao_social}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Nome Fantasia</dt>
              <dd className="text-sm text-gray-900">{data.nome_fantasia || '-'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Situação Cadastral
              </dt>
              <dd className="text-sm text-gray-900">{data.situacao_cadastral}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Data de Abertura</dt>
              <dd className="text-sm text-gray-900">
                {formatDate(data.data_abertura)}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Endereço</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Logradouro</dt>
              <dd className="text-sm text-gray-900">
                {data.endereco.logradouro}, {data.endereco.numero}
                {data.endereco.complemento && ` - ${data.endereco.complemento}`}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Bairro</dt>
              <dd className="text-sm text-gray-900">{data.endereco.bairro}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Município/UF
              </dt>
              <dd className="text-sm text-gray-900">
                {data.endereco.municipio}/{data.endereco.uf}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">CEP</dt>
              <dd className="text-sm text-gray-900">{data.endereco.cep}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Informações Adicionais
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Atividade Principal
            </dt>
            <dd className="text-sm text-gray-900">
              {data.atividade_principal.codigo} -{' '}
              {data.atividade_principal.descricao}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Natureza Jurídica
            </dt>
            <dd className="text-sm text-gray-900">
              {data.natureza_juridica.codigo} -{' '}
              {data.natureza_juridica.descricao}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Porte</dt>
            <dd className="text-sm text-gray-900">{data.porte}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Capital Social</dt>
            <dd className="text-sm text-gray-900">
              {formatCurrency(data.capital_social)}
            </dd>
          </div>
        </dl>
      </div>

      {data.atividades_secundarias.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Atividades Secundárias
          </h3>
          <ul className="space-y-2">
            {data.atividades_secundarias.map((atividade, index) => (
              <li key={index} className="text-sm text-gray-900">
                {atividade.codigo} - {atividade.descricao}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}; 