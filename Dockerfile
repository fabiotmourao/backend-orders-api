FROM node:18-alpine

# Instala bash e dependências mínimas
RUN apk add --no-cache bash

# Define diretório de trabalho
WORKDIR /usr/src/app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Instala dependências com resolução de conflitos
RUN npm install --legacy-peer-deps

# Copia o restante do código
COPY . .

# Compila TypeScript
RUN npm run build

# Expõe porta do NestJS
EXPOSE 3000

# Inicia a aplicação em modo produção
CMD ["npm", "run", "start"]
