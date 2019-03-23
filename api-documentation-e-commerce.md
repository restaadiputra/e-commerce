# API Documentation

##### Basic Url : /api/

### Product Routes

List of routes product:

| Route        | HTTP | Header(s) | Description             | Request | Response                 |
| ------------ | ---- | --------- | ----------------------- | ---- | ------------------------ |
| /product    | GET  | token     | get all products        | none | an array of products     |
| /product    | POST | token     | create a single product | name:String**(Required)**, description:String**(Required)**, price:Integer**(Required)**, stock:Integer**(Required)** | an object of new product |
| /product/:id | GET  | token     | get a single product    | none | an object of one product |
| /product/:id | PUT | token | update a single product | name:String, description:String, price:Integer, stock:Integer | an updated object of one product |
| /product/:id | DELETE | token | delete a single product | none | a deleted object of one product |

List of filter routes:

| Route                       | HTTP | Description                           |
| --------------------------- | ---- | ------------------------------------- |
| /product?name=<productname> | GET  | Get all products filtered by its name |



### User Routes

List of routes user:

| Route     | HTTP   | Header(s)           | Description             | Request                                                      | Response                                 |
| --------- | ------ | ------------------- | ----------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| /user     | GET    | none                | get all users           | none                                                         | an array of users with basic information |
| /user/:id | GET    | none                | get a single user       | none                                                         | an object of one user                    |
| /user/:id | PUT    | token or admin only | update a single product | fullname:String, username:String, password:String, role:String, address:String, phone:String | an updated object of one user            |
| /user/:id | DELETE | token or admin only | delete a single product | none                                                         | a deleted object of one user             |

List of filter routes:

| Route                 | HTTP | Description                        |
| --------------------- | ---- | ---------------------------------- |
| /user?name=<username> | GET  | Get all users filtered by its name |



### Sign In & Sign Up Routes

List of routes sign-in sign-up:

| Route   | HTTP | Header(s) | Description                   | Request                                                      | Response              |
| ------- | ---- | --------- | ----------------------------- | ------------------------------------------------------------ | --------------------- |
| /signin | POST | none      | Sign in user into application | username:String**(Required)**, password:String**(Required)** | token                 |
| /signup | POST | none      | Sign up user for new account  | fullname:String**(Required)**, username:String**(Required)**, password:String**(Required)**, role:String**(Required)**, address:String**(Required)**, phone:String**(Required)** | an object of new user |



### Cart Routes

List of cart product:

| Route     | HTTP   | Header(s) | Description          | Request                     | Response                      |
| --------- | ------ | --------- | -------------------- | --------------------------- | ----------------------------- |
| /cart     | GET    | token     | get all carts        | none                        | an array of carts             |
| /cart     | POST   | token     | create a single cart | items:Product**(Required)** | an object of new cart         |
| /cart/:id | GET    | token     | get a single cart    | none                        | an object of one cart         |
| /cart/:id | PUT    | token     | update a single cart | items:Product**(Required)** | an updated object of one cart |
| /cart/:id | DELETE | token     | delete a single cart | none                        | a deleted object of one cart  |

