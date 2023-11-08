# News App Frontend

This is the frontend app for the test project by Faran Ali for [Innoscripta](https://www.innoscripta.com) 
This project is built in React using Vite as the build tool
To run this project, follow these commands:

open a terminal in the `frontend` directory 

### Step1:
run `docker-compose up --build --no-recreate -d`

This will create and start the docker container
### Step2:
run `docker exec -it vite_docker sh`
This will start a shell session in the docker container
### Step3:
run `npm i && npm run dev`

This will start the frontend app which can be accessed at [localhost:8080](http://localhost:8080)

This frontend app works with the Laravel backend app located in the `backend` directory
