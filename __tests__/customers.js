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

describe("integration tests for  customers auth", () => {
	it("POST  customer register done with type, and status code", async () => {
        const res = await supertest(server).post("/customers/register")
        .send({ email: "calenocam100@gmail.com", password: "abc123", full_name: "Rita Reeves"})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
    })

	it("POST Customer login done with type, and status code  500 because it doest have a token ", async () => {
        const res = await supertest(server).post("/customers/login")
        .send({ email: "customer1@gmail.com", password: "abc12345"})
        expect(res.statusCode).toBe(500)
        expect(res.type).toBe("application/json")
    })
 })

 describe("integration tests for  customers", () => {
	it("GET Customers done with type, status code  401 not authorized", async () => {
        const res = await supertest(server).get("/customers")
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })
 })