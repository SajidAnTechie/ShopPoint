FROM node:13.12.0-alpine
# set working directory to app
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.3 -g --silent
# add app
COPY . ./
# start app
CMD ["npm", "start"]