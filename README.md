# Deployed API


# Register / Login Endpoints
| Request | URL | Description |
| ------- | --- | ----------- |
| POST | /api/signup | Signup a new user |
| POST | /api/login | Login a user |

# Users Endpoints -- Authentication Required
| Request | URL | Description |
| ------- | --- | ----------- |
| GET | api/users | Retrieve all users in database |
| GET | api/users/:id | Retrieve user by id |
| GET | api/users/:id/owned | Retrieve all tech items user owns |
| GET | api/users/:id/rented | Retrieve all tech items user is renting |
| POST | api/users/:id | Add a tech item to rent out under user id |
| PUT | api/users/:id | Update a specific user |
| DELETE | api/users/:id | Delete a specific user |

# Tech Endpoints -- Authentication Required
| Request | URL | Description |
| ------- | --- | ----------- |
| GET | api/tech | Retrieves all tech items in database |
| GET | api/tech/:id | Retrieves tech item with specific user id |
| PUT | api/tech/:id | Update a tech item with specific user id |
| DELETE | api/tech/:id | Delete tech item with specific id |

# Owners
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| username | string | yes | yes | username |
| password | string | yes | no | password |
| firstName | string | yes | no | user's first name |
| lastName | string | yes | no | users' last name |

# Items
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| name | string | yes | no | item name |
| description | string | yes | no | item description |
| condition | string | yes | no | item condition |
| price | float | yes | no | item's price |
