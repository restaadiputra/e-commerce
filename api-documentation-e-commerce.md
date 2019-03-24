# API Documentation

##### Basic Url : /api/

### Product Routes

List of routes product:

| Route        | HTTP | Header(s) | Description             | Request | Response                 |
| ------------ | ---- | --------- | ----------------------- | ---- | ------------------------ |
| /product    | GET  | none  | get all products        | none | an array of products     |
| /product    | POST | none  | create a single product | name:String**(Required)**, description:String**(Required)**, price:Integer**(Required)**, stock:Integer**(Required)** | an object of new product |
| /product/:id | GET  | token     | get a single product    | none | an object of one product |
| /product/:id | PUT | token | update a single product | name:String, description:String, price:Integer, stock:Integer | an updated object of one product |
| /product/:id | DELETE | token | delete a single product | none | a deleted object of one product |

List of filter routes:

| Route                       | HTTP | Description                           |
| --------------------------- | ---- | ------------------------------------- |
| /product?name=<productname> | GET  | Get all products filtered by its name |





### Sign In & Sign Up Routes(Customer)

List of routes sign-in sign-up:

| Route           | HTTP | Header(s) | Description                   | Request                                                      | Response              |
| --------------- | ---- | --------- | ----------------------------- | ------------------------------------------------------------ | --------------------- |
| /users/signin   | POST | none      | Sign in user into application | username:String**(Required)**, password:String**(Required)** | token, fullname, role |
| /users/register | POST | none      | Sign up user for new account  | fullname:String**(Required)**, email:String**(Required**), username:String**(Required)**, password:String**(Required)**, role:String**(Required)**, address:String**(Required)**, phone:String**(Required)** | an object of new user |



### Sign In & Sign Up Routes(Admin)

List of routes sign-in sign-up:

| Route           | HTTP | Header(s) | Description                   | Request                                                      | Response              |
| --------------- | ---- | --------- | ----------------------------- | ------------------------------------------------------------ | --------------------- |
| /admin/signin   | POST | none      | Sign in user into application | username:String**(Required)**, password:String**(Required)** | token, fullname, role |
| /admin/register | POST | none      | Sign up user for new account  | fullname:String**(Required)**, email:String**(Required),** username:String**(Required)**, password:String**(Required)**, role:String**(Required)**, | an object of new user |





### Cart Routes

List of cart product:

| Route     | HTTP   | Header(s) | Description          | Request                     | Response                     |
| --------- | ------ | --------- | -------------------- | --------------------------- | ---------------------------- |
| /cart     | GET    | token     | get all carts        | none                        | an array of carts            |
| /cart     | POST   | token     | create a single cart | items:Product**(Required)** | an object of new cart        |
| /cart/:id | DELETE | token     | delete a single cart | none                        | a deleted object of one cart |

