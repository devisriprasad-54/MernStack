### steps to create backend
1.Generate package.json
   npm init -y
2. create http server
   a. install and import express module
      npm install express
   b. import express module

   http req types (CRUD operations):
   GET-Read resource
   POST-Create resource
   PUT-Update resource
   DELETE-Delete resource

   USER API:
   GET http://127.0.0.1:3000/users  --> get all users
   POST http://127.0.0.1:3000/user --> create new user
   PUT http://127.0.0.1:3000/users/<id> --> update existing user
   DELETE http://127.0.1:3000/users/<id> --> delete existing user