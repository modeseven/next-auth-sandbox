const express = require('express');
const app = express();
const port = 3001;
const jwt = require('jsonwebtoken');
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Mock OAuth Provider running at http://localhost:${port}`);
});


app.get('/authorize', (req, res) => {
  // Include the client_id and redirect_uri in the query string for the callback
  const { client_id, redirect_uri } = req.query;
  const state = req.query.state;
  const authorizationCode = 'mockAuthCode123'; 

  // Render an HTML page with a "Log In" button
  res.send(`
    <html>
      <body>
        <form action="/oauth/mock-login" method="post">
          <input type="hidden" name="client_id" value="${client_id}" />
          <input type="hidden" name="redirect_uri" value="${redirect_uri}" />
          <input type="hidden" name="state" value="${state}" />
          <input type="hidden" name="authorizationCode" value="${authorizationCode}" />
          <button type="submit">SIMULATE PIV</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/oauth/mock-login', (req, res) => {
const { authorizationCode, redirect_uri,state } = req.body;
console.log("test", req.body);
  // Redirect to the client's redirect_uri with the mock authorization code
  res.redirect(`${redirect_uri}?code=${authorizationCode}&state=${state}`);
});

  app.post('/token', (req, res) => {
    console.log("token", req.body);
    const payload = {
      iss: "mock",
      sub: "user-123", // Add the subject identifier (e.g., user ID)
      aud: "mock-client-id",
      id: '123',
      name: 'Mock User',
      email: 'mock@example.com',
      iat: Math.floor(Date.now() / 1000),
  };

  // Load your RSA private key from a file
  const privateKey = fs.readFileSync('/home/mbegley/projects/mock-secureauth/private.key', 'utf8');


  const access_token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1h'
   });



    res.json({
      access_token,
      refresh_token: 'mockRefreshToken',
      expires_in: 3600
    });
  });

  app.get('/login', (req, res) => {
    const redirectUri = req.query.redirect_uri;
    // Simulate a user logging in and redirecting back with an authorization code
    res.redirect(`${redirectUri}?code=mockAuthCode`);
  });

  app.get('/userinfo', (req, res) => {
    res.json({
      id: '123',
      name: 'Mock User',
      email: 'mock@example.com'
    });
  });

  const mockJwks = {
    keys: [
      {
        kty: "RSA",
        kid: "unique-key-identifier",
        use: "sig",
        n: "base64-encoded-modulus",
        e: "base64-encoded-exponent"
      }
    ]
  };


  app.get('/.well-known/openid-configuration', (req, res) => {
    res.status(200).json(mockJwks);
  });
  
  
