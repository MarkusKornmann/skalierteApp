FROM node:alpine
WORKDIR /app
COPY App.js .
EXPOSE 8081
CMD ["node", "App.js"]
