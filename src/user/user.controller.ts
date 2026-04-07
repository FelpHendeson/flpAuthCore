import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput } from './user.model';
import { DuplicateUserError, UserService, UserValidationError } from './user.service';

/**
 * HTTP request contract for user creation route.
 */
interface CreateUserRequest {
  Body: CreateUserInput;
}

/**
 * Controller responsible for user-related HTTP handlers.
 */
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Handles HTTP creation of a user.
   * @param request - Fastify request containing user creation payload.
   * @param reply - Fastify reply instance.
   * @returns HTTP response with created user or mapped error.
   */
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
