import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";
import { schema_getuser, schema_createuser } from "../schema/reqresSchema.js";

describe("API Tests Suite", function () {
    const baseURL = "https://reqres.in";

    // GET
    it("READ - Get single users", async function () {
        const response = await fetch(`${baseURL}/api/users?page=2`, {
            method: "GET",
            headers: { "x-api-key": "reqres_25892dcbb99e41849987298409d6df9e" },
        });

        expect(response.status, 'Status tidak 200').to.equal(200);
    });

    // POST
    it("CREATE - Create User Baru", async function () {
        const newPost = {
            name: "morpheus",
            job: "leader"
        };

        const response = await fetch(`${baseURL}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
                "x-api-key": "reqres_25892dcbb99e41849987298409d6df9e" },
            body: JSON.stringify(newPost),
        });

        expect(response.status, 'Status tidak 201').to.equal(201);
    });
});