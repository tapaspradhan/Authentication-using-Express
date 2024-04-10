# Frontend Part

- Here I built and register form and login form.
- In register form we take the userdata and validate them if user is not fill all required box that time i show a aler message.
- In register form I store the data in MONGODB database.
- password and confirm password check.
- 

# Backend Part

- A user register through POST method 
- I use POST,GET, USE method from express
- When a user is signup using mail id that time check the valid mail id if is valid then go to  next step other wise show the result false and give a custom message.
- User data save time encript the user password and then save in database. 
- Database connection with MONGODB using mongoose 
- Mongoose use also schema modeling which is store in mongodb database.
- In signin case chck the email id and passwod, id data is available in databse then sigin.
- Signin time generate a JWT token and set that token in browser cookie.
- If user is logout that time remove the cookie and show a message to user is logut successfully.
- 