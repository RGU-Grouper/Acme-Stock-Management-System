# Acme-Frontend

## Gmail OAuth Information
Lauch the LogIn.html if you want to test the Google Oauth login. 

You will need to be running the server on XAMPP as the domain is set to localhost.

## Node and NPM (Node Package Manager)
Sync files from GitHub, "npm install" in command prompt while in the ACME-FRONTEND directory.

### Command prompt commands:
I want to run the server in production: npm start

I want to run the server for development: npm run dev

I want to write sass: npm run sass

npm start runs "node server.js" which starts the web-server running on port 2000.
npm run dev runs "nodemon server.js" which restarts the server automatically when a change is saved in the code, very handy for development.
npm run sass runs "sass --watch WWW/scss/main.scss WWW/css/style.css", it turns .scss files into style.css. --watch means it does this every time a change is saved.
