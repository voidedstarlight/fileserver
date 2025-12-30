FROM node:24-alpine
WORKDIR /usr/src/app

RUN apk update
RUN apk --no-cache add uchardet zip

COPY . .
RUN npm ci

ENV NODE_ENV=production
RUN npm run build
EXPOSE 8192
CMD ["npm", "start"]
