# WATER MY PLANTS

##Run Server
npm run server

Register a user: /api/user/register

http method: [POST]

##Headers

| **name**     | **type** | **required** | **description**  |
| ------------ | -------- | ------------ | ---------------- |
| Content-Type | String   | Yes          | application/json |

##Body

| **name**    | **type** | **required** | **description**  |
| ----------- | -------- | ------------ | ---------------- |
| username    | String   | Yes          | application/json |
| phoneNumber | String   | Yes          | application/json |
| password    | String   | Yes          | application/json |

##example

                {
                    "username": "john",
                    "phoneNumber": "555-867-5309",
    				"password": "abc123",
                }
