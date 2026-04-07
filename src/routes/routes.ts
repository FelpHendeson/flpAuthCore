import { FastifyInstance } from 'fastify';
import { UserController } from '../user/user.controller';

/**
 * Registers application HTTP routes.
 */
export class AppRoutes {
  constructor(private readonly userController: UserController) {}

  /**
   * Attaches route handlers to the Fastify instance.
   * @param app - Fastify application instance.
   */
  public async register(app: FastifyInstance): Promise<void> {
    app.get('/', this.root);
    app.get('/health', this.health);
    app.post('/users', this.userController.createUser);
  }

  /**
   * Root endpoint used for basic service identification.
   * @returns Root endpoint payload.
   */
  private readonly root = async (): Promise<{ ok: boolean; message: string }> => {
    return { ok: true, message: 'Auth API' };
  };

  /**
   * Health endpoint used for liveness checks.
   * @returns Health status payload.
   */
  private readonly health = async (): Promise<{ status: string }> => {
    return { status: 'ok' };
  };
}

export default AppRoutes;
