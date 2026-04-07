import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput } from './user.model';
import { DuplicateUserError, UserService, UserValidationError } from './user.service';

interface CreateUserRequest {
  Body: CreateUserInput;
}

export class UserController {
  constructor(private readonly userService: UserService) {}

  public readonly createUser = async (
    request: FastifyRequest<CreateUserRequest>,
    reply: FastifyReply,
  ): Promise<FastifyReply> => {
    try {
      const user = await this.userService.createUser(request.body);
      return reply.status(201).send({ user });
    } catch (error) {
      if (error instanceof UserValidationError) {
        return reply.status(400).send({ message: error.message });
      }

      if (error instanceof DuplicateUserError) {
        return reply.status(409).send({ message: error.message });
      }

      throw error;
    }
  };
}

export default UserController;
