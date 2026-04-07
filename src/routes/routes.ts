import { FastifyInstance } from 'fastify';
import { UserController } from '../user/user.controller';

export class AppRoutes {
  constructor(private readonly userController: UserController) {}

  public async register(app: FastifyInstance): Promise<void> {
    app.get('/', this.root);
    app.get('/health', this.health);
    app.post('/users', this.userController.createUser);
  }

  private readonly root = async (): Promise<{ ok: boolean; message: string }> => {
    return { ok: true, message: 'Auth API' };
  };

  private readonly health = async (): Promise<{ status: string }> => {
    return { status: 'ok' };
  };
}

export default AppRoutes;
