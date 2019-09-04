
# Free-Mentor

Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions. [![Build Status](https://travis-ci.org/murera/Free-Mentor.svg?branch=develop)](https://travis-ci.org/murera/Free-Mentor) [![Coverage Status](https://coveralls.io/repos/github/murera/Free-Mentor/badge.svg?branch=develop)](https://coveralls.io/github/murera/Free-Mentor?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/be19534b73ff5410ec2c/maintainability)](https://codeclimate.com/github/murera/Free-Mentor/maintainability)

Free Mentors is a free, easy-to-use platform that allows young peaple and mentors to connect so they can solve problems together.

Here is UI template for this project on github  [link](https://murera.github.io/Free-Mentor/UI)

#### Here is a list of all API Endpoints that you will find:

| Method        | Endpoint                 | Description|
| ------------- | --------------------------|------------|
| POST           |`/auth/signup`   |User create an account|
| POST          | `/auth/signin`   |Sign in a user |
| GET       | `/users`   |admin get all users|
| GET | `/users/<:user-id>`   |admin get a specific user|
| DELETE          | `/user/<:user-id>`   |delete a user|
| PATCH       | `/user/:<user-id>`   |admin change user to mentor|
| GET        | `/mentors `   | user get all mentors|
| GET          | `/mentors/<:user-id:>`   |User get a specific mentor|
| POST  |`/sessions` |User create mentorship request|
| GET         | `/sessions`   |Mentor can view all mentorship request sessions|
| GET         | `/sessions`   |Mentee can view all his mentorship request sessions|
| GET          | `/sessions/<:user-id:>`   |Mentor can view a specific mentorship request session|
| PATCH          | `/sessions/<:user-id:>/accept`   |Mentor can accept a mentorship request sessions|
| PATCH          | `/sessions/<:user-id:>/reject`   |Mentor can reject a mentorship request sessions|


# Technology Tools used
* Server-side Framework: **Node/Express JS**
* Linting Library: **ESlint**
* Style Guide: **Airbnb**
* Testing Framework: **Mocha** with **Chai**
* Documentation Tools: **Swagger**

# Additional Tools
* JavaScript Es6 with **Babel** transpiler
* TravisCI for Continous Integration
* nyc for test coverage
* CodeClimate and Coveralls for badges
* Heroku for Deployment

The url of the app on heroku is this one [https://free-mentorship.herokuapp.com/](https://free-mentorship.herokuapp.com/).


This is the list of all routes as on the **heroku deployment**:
* Fetch all users  [https://free-mentorship.herokuapp.com/api/v1/users](https://free-mentorship.herokuapp.com/api/v1/users)
* Fetch a specific user [https://free-mentorship.herokuapp.com/api/v1/user/<:user-id:>](https://free-mentorship.herokuapp.com/api/v1/user/<:user-id:>)
* change user to mentor [https://free-mentorship.herokuapp.com/api/v1/user/<:user-id:>](https://free-mentorship.herokuapp.com/api/v1/user/<:user-id:>)
* delete a  user [https://free-mentorship.herokuapp.com/api/v1/<:user-id:>](https://free-mentorship.herokuapp.com/api/v1/<:user-id:>)

* get all mentors[https://free-mentorship.herokuapp.com/api/v1/mentors](https://free-mentorship.herokuapp.com/api/v1/mentors)
* specific mentor[https://free-mentorship.herokuapp.com/api/v1/mentors/<:mentor-id:>](https://free-mentorship.herokuapp.com/api/v1/mentors/<:mentor-id:>)
* sign up [https://free-mentorship.herokuapp.com/api/v1/auth/signup](https://free-mentorship.herokuapp.com/api/v1/auth/signup)
* sign in [https://free-mentorship.herokuapp.com/api/v1/auth/signin](https://free-mentorship.herokuapp.com/api/v1/auth/signin)
* create session [https://free-mentorship.herokuapp.com/api/v1/sessions](https://free-mentorship.herokuapp.com/api/v1/sessions)
* mentor view all sessions [https://free-mentorship.herokuapp.com/api/v1/sessions](https://free-mentorship.herokuapp.com/api/v1/sessions)
* mentee view all sessions [https://free-mentorship.herokuapp.com/api/v1/sessions](https://free-mentorship.herokuapp.com/api/v1/sessions)
* mentor view a specific session [https://free-mentorship.herokuapp.com/api/v1/sessions/<:session-id:>](https://free-mentorship.herokuapp.com/api/sessions/<:session-id:>)
* mentor accept session [https://free-mentorship.herokuapp.com/api/v1/sessions/<:session-id:>/accept](https://free-mentorship.herokuapp.com/api/v1/sessions/<:session-id:>/accept)
* mentor reject session [https://free-mentorship.herokuapp.com/api/v1/sessions/<:session-id:>/reject](https://free-mentorship.herokuapp.com/api/v1/sessions/<:session-id:>/reject)

For a better test you will need to use [POSTMAN](https://www.getpostman.com/)

# Setup Instruction
* Install [git](https://git-scm.com/downloads)
* Install [Node js](https://nodejs.org/en/)

For getting the files into your local machine open git bash and do git clone with repository url

```
$ git clone https://github.com/murera/Free-Mentor.git
```
Navigate to the folder containing all code files by typing cd folder_name

```
$ cd Free-Mentors
```
Install dependincies as they appear in package.json file by

```
$ npm install
```
To start the server do

```
$ npm run dev-start
```
To run the test do

```
$ npm run test
```


## Author

[Amani MURERA](https://murera.github.io/Free-Mentor/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for more details

## Acknowledgments

* [Andela Kigali](https://andela.com/)

