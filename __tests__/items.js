const supertest = require("supertest")
const server = require("../api/server")
const db = require("../data/configDb")


// // to reset seeds before every test so there is a fresh start
beforeEach(async () => {
	await db.seed.run()
})

// This is a jest hook that will run after all the test are done, and will close the db connection before the test runner ends, so it can prevent any warning.
afterAll(async () => {
	await db.destroy()
})

describe("integration tests for  items", () => {
	it("GET  items done with type, and status code", async () => {
        const res = await supertest(server).get("/items")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
    })

    it("DELETE items done with type, and status code 401 not authorized", async () => {
        const res = await supertest(server).delete("/items/:id")
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })

    it("PUT items done with type, and status code 401 not authorized", async () => {
        const res = await supertest(server).put("/items/:id")
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })

 })

 