# Project Proposal Manager



## Set up.

Make sure your Node version is up to date (6.9.3 works).
To check version:
```bash
$ npm -v
```

Make sure you have angular cli installed.
```bash
$ npm install -g angular-cli
```
Currently angular-cli is still in beta, so a few warnings might appear.
You can check that it is installed by running:
```bash
$ npm ls angular-cli
```

Clone the repo
```bash
$ git clone https://github.com/uis-no/ppm.git
$ cd ppm
```

Install dependencies
```bash
$ npm install
```

Run the app
You need to open two clis, in the first one enter:
```bash
$ npm run build
```
and in the second one enter:
```bash
$ npm start
```

Then go to localhost:4200, this port allows for live updates (from code to browser).
