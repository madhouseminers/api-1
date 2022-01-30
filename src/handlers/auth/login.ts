import type { FastifyReply, FastifyRequest } from "fastify";
import type { HookHandlerDoneFunction } from "fastify/types/hooks";

interface Body {
  email: string;
  password: string;
}

export const hooks = {
  preValidation: (
    request: FastifyRequest<{ Body }>,
    response: FastifyReply,
    done: HookHandlerDoneFunction
  ) => {
    if (
      request.body &&
      request.body.hasOwnProperty("email") &&
      request.body.hasOwnProperty("password")
    ) {
      done();
    }

    response.status(422).send();
  },
};

export function handler(
  request: FastifyRequest<{ Body }>,
  response: FastifyReply
) {
  response.status(200).send();
}
