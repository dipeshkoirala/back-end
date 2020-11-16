const supertest = require("supertest")
const { intersect } = require("../config")
const server = require("../index")

describe("integ test", ()=>{
    it("gets a lists of users", async ()=>{
        const res = await supertest(server).get("")
    })
})