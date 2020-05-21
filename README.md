### WATER MY PLANTS

#### Run Server

npm run server

END POINTS
Register a user: /auth/register
http method: [POST]

Login a user: /auth/login
http method: [POST]

plants: /auth/plants
http method: [GET]

#### Headers

| **name**       | **type** | **required** | **description**  |
| -------------- | -------- | ------------ | ---------------- |
| `Content-Type` | String   | Yes          | application/json |

#### Body

| **name**      | **type** | **required** | **description**  |
| ------------- | -------- | ------------ | ---------------- |
| `username`    | String   | Yes          | application/json |
| `phoneNumber` | String   | Yes          | application/json |
| `password`    | String   | Yes          | application/json |

#### Response

##### 201 (created)

#### example

```
    {
        "username": "john",
        "phoneNumber": "555-867-5309",
        "password": "abc123",
    }
```
