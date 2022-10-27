FROM node:16.18.0
WORKDIR /frontend
COPY package*.json ./
RUN npm install
RUN npm install react-scripts
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]