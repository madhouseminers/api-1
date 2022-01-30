import * as assert from "node:assert";
import server from "../../../../src/server";

describe("returns a 422 if any required parameters are missing", () => {
  it("handles no parameters", async () => {
    const result = await server.inject({ url: "/auth/login", method: "POST" });
    assert.equal(result.statusCode, 422);
  });
  it("handles no email", async () => {
    const result = await server.inject({
      url: "/auth/login",
      method: "POST",
      payload: { password: "" },
    });
    assert.equal(result.statusCode, 422);
  });
  it("handles no password", async () => {
    const result = await server.inject({
      url: "/auth/login",
      method: "POST",
      payload: { email: "" },
    });
    assert.equal(result.statusCode, 422);
  });
});

describe("logs the user in if the details are correct", () => {
  it("logs in a normal user", async () => {
    const result = await server.inject({
      url: "/auth/login",
      method: "POST",
      payload: { email: "test@user.com", password: "testuser" },
    });
    assert.equal(result.statusCode, 200);
  });

  it("logs in an admin user", async () => {
    const result = await server.inject({
      url: "/auth/login",
      method: "POST",
      payload: { email: "test@user.com", password: "testuser" },
    });
    assert.equal(result.statusCode, 200);
  });
});
