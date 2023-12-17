## Login Logic/GoogleAPI ##

This project is the top layer of a mongodb, java/springboot webApp. The backend can be found here: https://github.com/Tay-Day/MyAdSpace-WebApp

First, to run the backend we must fill in the credentials in a .env (environment variables) file in order to connect the backend to a mongoDB. Create a mongoDB using atlas, test the connection using compass and then copy the necessary credentials into an environment file like below. This will be in the gitignore, and used in the application.properties file. 
### MONGO_DATABASE="____________" ### 

###  MONGO_USER="___________" ### 

###  MONGO_PW="___________" ### 

### MONGO_CLUSTER="___________" ###

Next we can add cookie values to be used on the api side: 

### jwtCookieName="_________" ###
### jwtSecret="___________" ### (Make this 64 characters)
### jwtExpirationMs="86400000" ###

Now run the application in "MyAdSpaceApplication" if successful the server should start on a local host, now using ngrok we can connect the localhost api online. This will expose the API, but only pepole with roles in our application can make requests. Now in the front end, 
Change these lines in the axios config file:

const webApp = axios.create({ </br>
    baseURL: 'YOUR NGROK URL HERE', </br>
    headers: {"ngrok-skip-browser-warning": "true"} </br>
}); </br>

Next we can run our frontend using the command "npm start". If all works well you can signup a user, and login to a user. This code has a built in API call to youtube with a button, the key in the code has been changed, but you can register this app with google and get yourself another API key.
