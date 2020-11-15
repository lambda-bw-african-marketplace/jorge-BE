const supertest = require("supertest")
const server = require("../api/server")

test("GET message introduction test", async () => {
	const res = await supertest(server).get("/")
	expect(res.statusCode).toBe(200)
	expect(res.type).toBe("application/json")
	expect(res.body.message).toBe("Welcome to Build Week Project - African Marketplace")
})