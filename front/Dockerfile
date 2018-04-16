From node:carbon

RUN mkdir -p /usr/src/app

COPY ./fe/package.json /usr/src/app/fe/package.json

RUN cd /usr/src/app/fe && npm install

COPY ./fe /usr/src/app/fe

WORKDIR /usr/src/app/fe

RUN ./node_modules/.bin/webpack

RUN npm test

RUN ./dependenciesCheck.sh

EXPOSE 4003

CMD ["npm", "run", "node-server"]
