FROM node:16.18.0
WORKDIR /frontend
COPY package*.json ./
ENV PATH /frontend/node_modules/.bin:$PATH
RUN npm install --force
COPY . .
EXPOSE 3000
CMD ["npm", "start"]