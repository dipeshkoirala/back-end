const bcrypt = require("bcryptjs");


exports.seed = async function(knex) {
  await knex("users").insert([   
    {
      username: "dummy1", 
      password: bcrypt.hashSync("password1", 8),
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@gmail.com",
      type:"Instructor"
    },
    {
      username: "dummy2", 
      password: bcrypt.hashSync("password2", 8),
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@gmail.com",
      type:"Client"
    }
	])
};
