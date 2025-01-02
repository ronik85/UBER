# Uber Backend API

## Endpoints

### POST /users/register

Register a new user.

#### Request

- **URL**: `/users/register`
- **Method**: `POST`

- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Response

- **Body**:

  ```json
  {
    "token": "jwt-token",
    "user": {
      "_id": "user-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### POST /users/login

Login user.

#### Request

- **URL**: `/users/register`
- **Method**: `POST`

- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Response

- **Body**:
  ```json
  {
    "token": "jwt-token",
    "user": {
      "_id": "user-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### POST /users/profile

Get the data of the user

#### Request

- **URL**: `/users/profile`
- **Method**: `GET`

#### Response

- **Body**:
  ```json
  {
    "token": "jwt-token",
    "user": {
      "_id": "user-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```



### POST /users/logout

Logout the current user and blacklist the token provided in cookie or headers

#### Request

- **URL**: `/users/logout`
- **Method**: `GET`

#### Response

- **Body**:
  ```json
  {
    "token": "jwt-token",
    "user": {
      "_id": "user-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```


