import * as login from "../../../../src/handlers/auth/login";
import * as assert from "node:assert";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  admin_user,
  no_email,
  no_parameters,
  no_password,
  normal_user,
} from "../../../../mocks/login";

let called = false;
const done = () => {
  called = true;
};

let status = 0;
const reply = {
  status: (statusCode: number) => {
    status = statusCode;
    return reply;
  },
  send: () => {},
} as FastifyReply;

beforeEach(() => {
  called = false;
  status = 0;
});

describe("pre-validation hooks", () => {
  it("handles no parameters", async () => {
    login.hooks.preValidation(
      { body: no_parameters } as FastifyRequest<{
        Body: {};
      }>,
      reply,
      done
    );

    assert.equal(called, false);
    assert.equal(status, 422);
  });

  it("handles no email", async () => {
    login.hooks.preValidation(
      { body: no_email } as FastifyRequest<{
        Body: { password: string };
      }>,
      reply,
      done
    );

    assert.equal(called, false);
    assert.equal(status, 422);
  });

  it("handles no password", async () => {
    login.hooks.preValidation(
      { body: no_password } as FastifyRequest<{
        Body: { email: string };
      }>,
      reply,
      done
    );

    assert.equal(called, false);
    assert.equal(status, 422);
  });

  it("handles all parameters being present", () => {
    login.hooks.preValidation(
      {
        body: normal_user,
      } as FastifyRequest<{ Body: { email: string; password: string } }>,
      reply,
      done
    );

    assert.equal(called, true);
  });
});

describe("handler", () => {
  it("logs in a normal user", () => {
    login.handler(
      {
        body: normal_user,
      } as FastifyRequest<{ Body: { email: string; password: string } }>,
      reply
    );

    assert.equal(status, 200);
  });

  it("logs in an admin user", () => {
    login.handler(
      {
        body: admin_user,
      } as FastifyRequest<{ Body: { email: string; password: string } }>,
      reply
    );

    assert.equal(status, 200);
  });
});
