# Project Proposal Manager

Before you can run the application, you need to install a few tools and programs. Below is how to do this.

### Setup environment.
To be able to run the program locally you will need to have Node.js installed on your computer.
If you don't have Node.js installed on your computer, you can find it here: [nodejs.org](https://nodejs.org/en/).
Make sure to download the 'recommended for most users'-option, this will be a version lower than the version with the latest features.

Make sure your Node version is up to date (v6.10.0 works).
To check version:
```bash
$ node --version
```
#### Clone the repository
You can either download the zip file and extract it where you want or you can clone the repository

Clone:
```bash
$ git clone https://github.com/uis-no/ppm.git
$ cd ppm
```

### Install necessary libraries
In order for the application to run the necessary commands to build the program, and start a local server you need to install angular-cli globally in npm.

In the command line interface, run this command:
```bash
$ npm install -g @angular/cli
```
After that has been done, you will need to install the packages related to this application

Install dependencies
```bash
$ npm install
```

### config
Before you can start up the application you need to add the 'config.js' file.
You need to create a folder called 'config' and in that folder create a config.js.
Copy the code below into the file and replace the strings with the appropriate values.
```javascript
module.exports = {
  db: {
    connection: 'MongoDB URL' // ex. mongodb://username:password@ds237516.mlab.com:61196/databasename
  },
  mail: {
    user: 'mail account user', // ex. username@something.com
    pass: 'mail account password' // ex. secretpassword
  }
};
```


### Run the app
Open up a terminal (mac OS) or command line interface (Windows OS) in the root directory of the program (where the server.js file is) and enter:
```bash
$ npm run build
```
When it is done building you should see:
```bash
$ API running on localhost:3000
$ Connected to database!
$ mongoose connection has been opened
```
Entering 'localhost:3000' in your browser will take you to the program.
