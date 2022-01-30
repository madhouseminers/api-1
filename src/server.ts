import fastify, { FastifyReply, FastifyRequest } from "fastify";
import * as login from "./handlers/auth/login";

const server = fastify({
  logger: { file: `logs/${new Date().toDateString()}` },
});

server.post("/auth/login", login.hooks, login.handler);

export default server;

/**
 *
 * /-----\      /-----\       /------\       /-----------\
 * | Web | ---> | API | <---> | Node | <---> | Instances |
 * \-----/      \-----/       \------/       \-----------/
 *                 |
 *                 |          /-----\
 *                 \--------->| DNS |
 *                            \-----/
 *
 * Endpoints:
 * Login
 * Register
 * Whitelist application
 * Nodes (CRUD)
 * Instances (CRUD)
 */
