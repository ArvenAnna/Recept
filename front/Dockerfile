From node:carbon

RUN mkdir -p /usr/src/app

COPY ./fe/package.json /usr/src/app/fe/package.json

RUN cd /usr/src/app/fe && npm install

COPY ./fe /usr/src/app/fe

RUN cd /usr/src/app/fe && ./node_modules/.bin/webpack

WORKDIR /usr/src/app/fe

EXPOSE 4003

CMD ["npm", "run", "node-server"]