# Task Manager API
Task Manager is lightweight open source web application to support task management process.
## Users
- POST /users - *create a new user*
- POST /users/login - *get auth token*
- GET /users/current - *get current user data*
- DELETE /users/logout - *logout and remove current user token*
## Projects
- GET /projects - *get all projects related to user*
- GET /projects/:id - *get project by id*
- POST /projects - *create project*
- PUT /projects/:id - *update project by id*
- DELETE /projects/:id - *delete project by id*
