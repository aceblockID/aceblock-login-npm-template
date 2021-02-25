[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/aceblockID/aceblock-login-npm-template">
    <img src="images/aceblock_logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Aceblock OIDC client npm package</h3>

  <p align="center">
    This is opesource project of npm package from Aceblock, to help you easilly protect your web application.
    <br />
    <a href="https://github.com/aceblockID/aceblock-login-npm-template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/aceblockID/aceblock-login-npm-template">View Demo</a>
    ·
    <a href="https://github.com/aceblockID/aceblock-login-npm-template/issues">Report Bug</a>
    ·
    <a href="https://github.com/aceblockID/aceblock-login-npm-template/issues">Request Feature</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

New tehnologies are comming and with them new possibillities, so here we are working on self sovereign identity, for enabeling end users to create their own identiti and with that to give them oportunity to gain controll over personal data (age, contact data, hobbies, ect.).

This project is just tiny part of the whole structure and enables businessess to easily implement register and login  of the potential customer into their web portals. At the same tame it makes it easi to implement authentication an authorisation of customers on any web app endpoint.

Here's how login and register works for user:
* User installs our Aceblock IDentity app on their mobile phone and creates their identity by entering their data 
* Business creates Aceblock IDentity for their domain/web portal
* Business installs aceblock-login-npm-template npm package and enters formerly created ID (detaild instructions for implementing are [here][instalation instructions])
* User opens businesses login/register page -> qr code shows -> user scans qr code with his web app and confirms connection and Voilà - User is registered and loged in to the web portal - web page automaticaly redirects from login page to user page

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [JavaScript](https://www.javascript.com/)
* [NPM](https://www.npmjs.com/)
* [ExpressJS](https://expressjs.com/)
* ...



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Befor you start setting up the project you need to install:

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation


1. Get a free API Key at [https://example.com](https://example.com)
   ```sh
   git clone https://github.com/aceblockID/aceblock-login-npm-template.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create config.js file and enter your DID address in `config.js`
   ```JS   
        const env = process.env.APP_RUN_OPTION || 'dev';
        
        const dev = {
        app: {
            port: 4090,
            redirectUrl: '/user'
            bcURL: 'https://ssi.aceblock.com/rpc',
            IPFSclient: '/dns4/ssi.aceblock.com/tcp/5001',
            contractAddress: '0xcEe408DA63635f2bD9A1608cCDC354F1a506f2b5',
            contractAbi: [{ "constant": true, "inputs": [{ "name": "DIDs", "type": "bytes32[]" }], "name": "getDIDdocAddress", "outputs": [{ "name": "DIDdocs", "type": "string[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "DID", "type": "bytes32" }], "name": "getDIDdocAddress", "outputs": [{ "name": "DIDdoc", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ethAddress", "type": "address" }], "name": "getDID", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }],
            didDocSchema: __dirname + '/didDocSchema.json',
            JsonldSchema: __dirname + '/JsonldSchema.json'
        },
        qrjwt: {
            did: 'id:ace:0x1fb5ce0b0c0c09efe1a8f448d0d268365ed9d02dd34a6c2ffa56cc1626a95c02',
            callbackUri: 'http://localhost:4070/callback',
            essClaimFields: ['email', 'phone_number', 'did'],
            volunClaimFields: ['name','address'],
            issuer: "https://self-isued.me/" 
        },
        cbjwt: {
        
        }
        }
        
        
        const config = {
        dev 
        }
        
        module.exports = config[env];
   ```

    Add code to app.js:
    ```JS
        const config = require('./config/config');
    ```

* Acquire did address for your domain and insert it in config file
* Set field essClaimFields with fields that you will require from customer
* Set field volonClaimFields with fields that will be optional for your customer
* Set port field on which your app server is running


5. Install `aceblock-oidc-client` npm package:
    ``sh
        npm install aceblock-oidc-client
    ``

    Add code to app.js:
    ```JS
        const {qrCodeValues, idTokenVerification} = require('aceblock-oidc-client');
    ```

6. Install express-session npm package:
    ```sh
        npm install express-session
    ```

    Add code to app.js:
    ```JS
        const session = require('express-session');
        const crypto = require('crypto');
        
        // Session handling
        app.use(
        session({
            secret: crypto.randomBytes(32).toString('hex'),
            resave: false,
            saveUninitialized: false
        }));
    ```

7. Install cookie-parser npm package:
    ```sh
        npm install cookie-parser
    ```

    Add code to app.js:
    ```JS    
        const cookieParser = require('cookie-parser');
        
        app.use(cookieParser());        
    ```

8. For rendering pages install ejs npm package:
    ```sh
        npm install ejs
    ```

    Add code to app.js:
    ```JS
        const path = require('path');
 
        // ejs engine and views folder
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, 'views'));
    ```


9. For socket connection instal socket.io npm package:
    ```sh
        npm install socket.io
    ```

    Add code to app.js:
    ```JS
        const socket = require('socket.io');
        
        // Start app
        const server = app.listen(port, console.log('App is running on port ' + port));
        
        // Set up socket.io connection
        var io = socket(server);
        
        io.on('connection', (socket) => {
        io.to(socket.id).emit('conn', socket.id);
        socket.on('onload', (data) => {
            socket.nonce = data.nonce;
        });
        });

    ```

10. Create login:
    a. Create api call with code:
    ```JS
        app.get('/login', async (req, res) => {
        const did = config.qrjwt.did,
        callbackUri = config.qrjwt.callbackUri,
        essClaims = config.qrjwt.essClaimFields,
        volClaims = config.qrjwt.volunClaimFields;
        const {imgTag, jwt, nonce, uri} = await qrCodeValues.create_qrcode(did, callbackUri, essClaims, volClaims);
        res.render('login', {qrCodePlaceholder: imgTag, qrCodeContent: jwt, sessionNonce: nonce});
        });
    ```
    b. Create login.ejs page in views folder with code:    
    ```JS
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login page</title>
        <script src="/socket.io/socket.io.js"></script>
        </head>
        <body>
        <h1>This is Login page</h1>
        <div id="qrCode"><%- qrCodePlaceholder %></div>
        <p></p>
        <p><strong>This is content of qr code: </strong><div id="qrCodeContent"></div></p>
        <a href="/">Back to home page</a>
        <p>Here are links to other pages:</p>
        <p><a href="settings">Link to settings page</a></p>
        <p><a href="stats">Link to statistics</a></p>
        <p><a href="user">Link to user settings</a></p>
        <p><a href="logoff">Log off</a></p>
        <script>
            // Make socket connetion
            const socket = io.connect( 'http://localhost:4090');
            //
            const qrCode = document.getElementById("qrCode");
            // Add event emmiter
            function sendNonnce(data){
                socket.emit('onload', {
                    nonce: <%- JSON.stringify(sessionNonce) %>,
                    socketId: data
                });
            }
            // Listen to events
            socket.on('conn', (nonce) => {
                sendNonnce(nonce);
            });
            socket.on('redirect', (redirectUrl, idToken) => {
                document.cookie = 'idToken=' + idToken + '; max-age=600; samesite=strict';           
                window.location.href = redirectUrl;
            });  
        </script>
        </body>        
    ```


11. Add token verification api callback code:

    Add code to app.js:
    ```JS
        // Token verification
        const verifyIdToken = idTokenVerification.initVerIdToken(config);
        
        // api call for token verifiaciont
        app.post('/callback', verifyIdToken, (req, res) => {   
        const location = config.app.redirectUrl;
        const idToken = req.headers['id_token'];
        const tokenPayload = req.payload;
        const rnonce = tokenPayload.nonce;
        console.log(rnonce);
        let json = io.of('/').sockets;
        let socId = getSocketId(json, rnonce);
        // send info to socket for redirection and saving token to cookie
        io.to(socId).emit('redirect', location, idToken);
        res.json({
            nonce: rnonce,
            socketId: socId
        });
        });
        
        // extract socket id from sockets object
        function getSocketId(json, rnonce) {
        let values = [...json.values()];
        let soc =  values.find(socket => socket.nonce === rnonce);
        let socketID;
        if (soc) {
            socketID = soc.id;
        }
        return socketID;
        }        
    ```

12. Add token verification to the rest of the api calls that need to be protected by adding “verifyIdToken” to call as here:
    
    Add code to app.js:
    ```JS
        app.get('/user', verifyIdToken, (req, res) => {
        res.render('user');
        });        
    ```

13. Add log off functionality by setting idToken cookie value to some new value or maxAge to -1 which means that cookie gets deleted (or both):
    
    Add code to app.js:
    ```JS
        // Log off functionality
        app.get('/logoff', (req, res) => {
        // add functionality for to log off
        res.cookie('idToken', 'empty', {maxAge: -1, sameSite:'lax', httpOnly: false});
        res.redirect('/');
        });        
    ```



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/aceblockID/aceblock-login-npm-template/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Gregor Sajovic - [@aceblockcom](https://twitter.com/aceblockcom) - gregor.sajovic@netis.si

Project Link: [https://github.com/aceblockID/aceblock-login](https://github.com/your_username/repo_name)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/aceblockID/aceblock-login-npm-template.svg?style=for-the-badge
[contributors-url]: https://github.com/aceblockID/aceblock-login-npm-template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/aceblockID/aceblock-login-npm-template.svg?style=for-the-badge
[forks-url]: https://github.com/aceblockID/aceblock-login-npm-template/network/members
[stars-shield]: https://img.shields.io/github/stars/aceblockID/aceblock-login-npm-template.svg?style=for-the-badge
[stars-url]: https://github.com/aceblockID/aceblock-login-npm-template/stargazers
[issues-shield]: https://img.shields.io/github/issues/aceblockID/aceblock-login-npm-template.svg?style=for-the-badge
[issues-url]: https://github.com/aceblockID/aceblock-login-npm-template/issues
[license-shield]: https://img.shields.io/github/license/aceblockID/aceblock-login-npm-template.svg?style=for-the-badge
[license-url]: https://github.com/aceblockID/aceblock-login-npm-template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/aceblockcom/
[product-screenshot]: images/screenshot.png
[instalation instructions](https://github.com/aceblockID/aceblock-login-npm-example/blob/master/README.md)
