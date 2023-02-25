FROM node:16.5.0
RUN mkdir /app
WORKDIR /app
COPY . .
RUN touch ./.env
RUN npm install
EXPOSE 5173
RUN npm run build
RUN cp -a dist/. public/
# CMD npm run dev




