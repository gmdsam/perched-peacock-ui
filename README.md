# Perched Peacock UI

A simple web application to check availability of parking space among the parking lots provided by the company and book the same.

#### Backend Repository: https://github.com/gmdsam/perched-peacock-api

### See it LIVE! : https://perched-peacock-ui.herokuapp.com/

API Docs: https://perched-peacock-api.herokuapp.com/swagger.json

### Technical Stack

- Framework: **Angular (with Typescript)**
- Deployment: **Docker**

### CI/CD

- [CI] All the commits are being tested for docker image build & code level unit tests

    Config file path: `.circleci/config.yml`

    Circle CI : https://circleci.com/gh/gmdsam/perched-peacock-ui

- [CD] All the commits to `master` branch are being automatically deployed to heroku

    Config file path: `heroku.yml`

### Setup guide

#### Running with Node [Recommended]

1. Get Node & npm installed in your system. Recommended versions are:

- Node: 10.15.3
- npm: 6.4.1

2. Download the dependencies using the command `npm install` at the project root

3. Now, start the application using the below command at the project root:

- `npm start`
