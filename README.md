# Back-end : Anywhere Fitness

- Required Login credentials are as follows:
    |----------------------------------------------------------------|
    |    1. For Instructor           |        2. For Client          |
    |    ----------------------------|------------------------------ |
    |    username:dummy1             |        username:dummy2        |
    |    password:password1          |        password:password2     |
    |----------------------------------------------------------------|



API
Link: 

ENDPOINTS
---------------------------------------------------------------
METHOD          ROUTE                            RESTRICTION    
---------------------------------------------------------------
POST    |       /api/auth/register                |  NO
POST    |       /api/auth/login                   |  NO
GET     |       /api/classes                      |  YES
GET     |       /api/classes/:id                  |  YES  
GET     |       /api/instructors                  |  YES
GET     |       /api/instructors/clients          |  YES
GET     |       /api/:insId/classes               |  YES
POST    |       /api/instructors/:insId/classes   |  YES
PUT     |       /api/:insId/classes/:id           |  YES
DELETE  |       /api/:insId/classes/:id           |  YES
--------------------------------------------------------------

# Route For Authorization

POST /api/auth/register
- Returns new user object
|

POST /api/auth/login
- Returns the user (if found and valid) along with a JSON Web token
- Your request body must include the username, password

GET  /api/classes 
- Returns an array of all the classes that Anywhere fitness offers

GET  /api/classes/:id
- Returns classes by ID

GET  /api/instructors 
- Returns an array of all the instructors

GET  /api/instructors/clients 
- Returns a list of all clients

GET  /api/:insId/classes
- Returns a list of all classes from instructor with the  matching id

GET  /api/instructors/:insId/classes
- Returns a list of all fitness classes and clients in each of the classes that the instructor is hosting

POST  /api/instructors/:insId/classes 
- Add new class for the instructor.
- Requires: name, type, intensity, max_clients, day, start_time, duration, location

PUT  /api/:insId/classes/:id 
- Updates existing class
- Requires: name, type, intensity, max_clients, day, start_time, duration, location

 DELETE  /api/:instructorId/classes/:classId 
 - Deletes existing class











