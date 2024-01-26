## Node.js JWT User Authentication

This Node.js application provides a simple user authentication system using JSON Web Tokens (JWT). The app allows users to log in, generating both an access token and a refresh token. When the access token expires, users can use the refresh token to obtain a new access token. Additionally, there is a logout route to revoke access tokens.

#### Features

- **User Authentication:** Log in with a username to receive an access token and a refresh token.
- **Token Refresh:** If the access token expires, obtain a new one using the refresh token.
- **Logout:** Revoke access tokens to ensure user logout.

> **Note:** all endpoints with header requests are listed inside requests.rest file

#### Usage

**Install dependencies:**
```
npm install
```

**Set up environment variables:**
Create a **.env** file with the following variables:

```
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

**Run the application:**
```
npm start
```

#### API Routes:
- **POST /login:** Log in and receive access token and refresh token.
- **POST /token:** Obtain a new access token using the refresh token.
- **DELETE /logout:** Revoke access tokens.



#### Configuration
Token Expiry: The access token expires in 30 seconds by default. Adjust the expiration time in the generateAccessToken function.

#### Dependencies
- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **jsonwebtoken:** JSON Web Token implementation for Node.js.



## Additional File: Post Retrieval

This Node.js application includes a file for retrieving user-specific posts. Utilizing JWT for authentication, users can access their posts by providing a valid access token. The **/posts** route filters and returns posts associated with the authenticated user.

#### Usage

- Ensure the main authentication app is running.
- Run the Post Retrieval app:

```
npm run authStart
```

**Access User Posts:**
Use a valid access token in the Authorization header to access user-specific posts:
GET http://localhost:3000/posts

---
#### License
This project is licensed under the MIT License - see the LICENSE file for details.
