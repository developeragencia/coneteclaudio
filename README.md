# SecureBridgeConnect

Uma aplicação web moderna e segura para gerenciamento de conexões.

## 🚀 Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/secure-bridge-connect.git

# Entre na pasta do projeto
cd secure-bridge-connect

# Instale as dependências
npm install

# Copie o arquivo de exemplo de variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🚀 Deploy

### Vercel

1. Crie uma conta na [Vercel](https://vercel.com)
2. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

3. Faça login na sua conta:
```bash
vercel login
```

4. Configure as variáveis de ambiente:
```bash
vercel env add VITE_API_URL
```

5. Faça o deploy:
```bash
vercel
```

### Build Manual

1. Crie o build de produção:
```bash
npm run build
```

2. Teste o build localmente:
```bash
npm run preview
```

3. O diretório `dist` contém os arquivos estáticos prontos para deploy.

## 📝 Scripts

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera o build de produção
- `npm run preview` - Testa o build localmente
- `npm run lint` - Executa o linter
- `npm run format` - Formata os arquivos com Prettier
- `npm test` - Executa os testes
- `npm run test:coverage` - Executa os testes com cobertura

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
