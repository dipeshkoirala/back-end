const db=require("../database/config")

function find(){
    return db("users")
    .select("id", "username", "password", "first_name", "last_name", "email")
  }
  
  function findBy(filter) {
    return db("users").where(filter)
  }
  
  function findById(id) {
    return db("users")
    .select("id", "username", "password", "first_name", "last_name", "email")
    .where({id})
    .first()
  }
  
  async function insert(user) {
    return await db("users")
    .insert(user)
    .returning(["id", "username"])
  }
  
  function remove(id) {
    return db("users")
    .where({id})
    .del()
  }
  
  function update(changes, id) {
    return db("users")
    .where({id})
    .update(changes)
  }
  
  module.exports = {
    find, 
    findBy, 
    findById, 
    insert, 
    remove, 
    update
  }