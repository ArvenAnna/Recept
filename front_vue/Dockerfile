From node:carbon

RUN mkdir -p /usr/src/app

COPY ./fe/package.json /usr/src/app/fe/package.json

RUN cd /usr/src/app/fe && npm install

COPY ./fe /usr/src/app/fe

WORKDIR /usr/src/app/fe

RUN npm run dev

#RUN npm test

#RUN ./dependencies/dependenciesCheck.sh

EXPOSE 4004

CMD ["npm", "run", "node-server"]
