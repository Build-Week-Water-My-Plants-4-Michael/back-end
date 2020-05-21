### WATER MY PLANTS

#### Run Server

npm run server

#### END POINTS

Register a user: //register
http method: [POST]

Login a user: //login
http method: [POST]

plants: /auth/plants
http method: [GET]

**/--------------------------------------------/ AUTH ROUTES /-----------------------------------/**

**Register a Teacher**
_method url_: `/register`

_http method_: **[POST]**

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
    "id": 7,
  "username": "jon",
  "password": "$2a$14$P9TdTUDUccAM5TeGmulCVed1uVrc1C3lGSlsAw6iCSCBw2LE6ehWG",
  "phoneNumber": "555-867-5309"
  }
```

##### 409 (Conflict)

```
    {
         "message": "Username is already taken"

    }
```

##### 500 (Server error)

```
  {
   SQLITE_CONSTRAINT: NOT NULL constraint
    }
  }
```

`SQLITE_CONSTRAINT` usually indicates that one of the fields that is required to be unique

**/----------------------------------------/**

### **Login a user**

_method url_: `/login`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description             |
| ---------- | ------ | -------- | ----------------------- |
| `username` | String | Yes      | must be registered user |
| `password` | String | Yes      |                         |

#### Example

```
  {
    "username": "jon",
    "password": "abc123"
  }
```

#### Response

##### 200 (ok)

> no issues logging in

###### Example response

```
  {
    "message": "Welcome, jon!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJuYW1lIjoiam9uIiwicGhvbmVOdW1iZXIiOiI1NTUtODY3LTUzMDkiLCJpYXQiOjE1OTAxMDI2MzB9.8XtkFSDjApIQYPlppmyM8V3ZmEgxfxbXt0O0rtrehi8"
  }
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid credentials"
  }
```

**/--------------------------------------------/ PLANTS ROUTES /-----------------------------------/**

### **Get all Plants**

> user must be logged into access

_method url_: `/plants`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Response

##### 200 (ok)

###### Example response

```
[
  {
    "id": 1,
    "nickname": "Peace Lily",
    "species": "Spathiphyllum",
    "h2oFrequency": "2 weeks",
    "image": "prettyphoto.url"
  },
  {
    "id": 2,
    "nickname": "Cactus",
    "species": "Caryophyllales",
    "h2oFrequency": "4 weeks",
    "image": "prettyphoto.url"
  },
]
```

##### 401 (Unauthorized)

```
{
  "message": "You shall not pass!"
}
```

**/----------------------------------------/**

### **Get a single Plant**

_method url_: `/plants/:id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
  {
    "id": 1,
    "nickname": "Peace Lily",
    "species": "Spathiphyllum",
    "h2oFrequency": "2 weeks",
    "image": "prettyphoto.url"
  },

]
```

##### 401 (Unauthorized)

```
{
  "message": "You shall not pass!"
}
```

**/----------------------------------------/**

### **Add a new Plant**

_method url_: `/plants`

_http method_: **[POST]**

#### Response

##### 200 (ok)

###### Example response

```
[
  {
    "id": 1,
    "nickname": "Peace Lily",
    "species": "Spathiphyllum",
    "h2oFrequency": "2 weeks",
    "image": "prettyphoto.url"
  },

]
```

**/----------------------------------------/**

### **Update a Plant**

_method url_: `/plants`

_http method_: **[PUT]**

#### Response

##### 200 (ok)

###### Example response

```
[
  {
    "id": 1,
    "nickname": "Updated Lily",
    "species": "Spathiphyllum",
    "h2oFrequency": "2 weeks",
    "image": "prettyphoto.url"
  },

]
```

**/----------------------------------------/**

### **Delete a Plant**

_method url_: `/plants/:id`

_http method_: **[DELETE]**

#### Response

##### 200 (ok)

###### Example response

```
    {
    "removed": 1
    }
```

##### 200 (ok)

###### Example response

```
    {
       "message": "Could not find Plants with given id"
    }
```
