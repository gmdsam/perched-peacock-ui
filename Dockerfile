FROM node:10.15.3

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

# start app
CMD ng serve --port $PORT
