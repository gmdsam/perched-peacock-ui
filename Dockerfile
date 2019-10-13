FROM node:10.15.3 as build-stage

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

# start app
RUN ng build --prod --base-href /

FROM python:latest

COPY --from=build-stage /app/dist/perched-peacock-ui/ /app

CMD cd /app && python -m http.server $PORT