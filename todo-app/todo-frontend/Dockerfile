FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:3000/

RUN npm run build

RUN npm install -g serve

EXPOSE 4000

CMD ["serve", "-s", "dist", "-l", "4000"]