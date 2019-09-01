# Free-Mentor

Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.
[![Build Status](https://travis-ci.org/murera/Free-Mentor.svg?branch=develop)](https://travis-ci.org/murera/Free-Mentor)  [![Coverage Status](https://coveralls.io/repos/github/murera/Free-Mentor/badge.svg?branch=ch-setup-travis-168234280)](https://coveralls.io/github/murera/Free-Mentor?branch=ch-setup-travis-168234280)  [![Maintainability](https://api.codeclimate.com/v1/badges/be19534b73ff5410ec2c/maintainability)](https://codeclimate.com/github/murera/Free-Mentor/maintainability)

Free Mentors is a free, easy-to-use platform that allows young peaple and mentors to connect so they can solve problems together.

Here is UI template for this project on github  [link](murera.github.io/Free-Mentor/UI/)

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

