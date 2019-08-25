const request = require("supertest");

const app = require("../../src/app/app");
const { user } = require("../../src/app/models");

describe("Testing user controller", () => { 
    it("Add a new user", async (done) => {
        const res = await request(app)
            .post("/addUser")
            .set("Content-Type", "application/json")
            .send({
                user: {
                    name : "Jhonatan R. Santos",
                    email : "jhonatanatm@gmail.com",
                    password: "123456789"
                }
            });
        expect(res.status).toBe(201);
        done();
    });

    it("Try to add a registered user", async (done) => {
        const res = await request(app)
            .post("/addUser")
            .set("Content-Type", "application/json")
            .send({
                user: {
                    name : "Jhonatan R. Santos",
                    email : "jhonatanatm@gmail.com",
                    password: "123456789"
                }
            });
        expect(res.status).toBe(500);
        done();
    });

    it("Try to add a user wihout name, email and password", async (done) => {
        const res = await request(app)
            .post("/addUser")
            .set("Content-Type", "application/json")
            .send({
                user: {}
            });
        expect(res.status).toBe(500);
        done();
    });
});
