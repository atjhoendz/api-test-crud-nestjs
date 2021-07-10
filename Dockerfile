# development stage
FROM node:lts
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start:dev"]