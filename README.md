# Food-Portal

## To deploy

To Install docker refer:
https://docs.docker.com/engine/install/ubuntu/

Install docker-compose
`sudo apt-get install docker-compose`

To deploy the app, run on terminal
`docker-compose up -d`

To terminate deployment:
`docker-compose down`

## Local Setup and Running

- For Backend:

```
cd backend
npm install
npm start
```

- For Frontend:

```
cd frontend
npm install
npm start
```

CAUTION : If the ports are already being used by some other processes, they must be killed before running the above script

Your App should be up and running on http://localhost:3000/
