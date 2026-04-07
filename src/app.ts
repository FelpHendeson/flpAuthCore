import Fastify, { FastifyInstance } from 'fastify';
import { PrismaConnection } from './database/prisma.connection';
import { AppRoutes } from './routes/routes';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { UserService } from './user/user.service';

/**
 * Creates and wires the Fastify application and dependencies.
 */
export class Application {
  /**
   * Builds the Fastify app with routes and infrastructure dependencies.
   * @returns Configured Fastify application instance.
   */
  public async createApp(): Promise<FastifyInstance> {
    const app = Fastify({ logger: true });
    const databaseConnection = PrismaConnection.fromEnv();

    await databaseConnection.connect();
    const userRepository = new UserRepository(databaseConnection.getClient());
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    const routes = new AppRoutes(userController);

    app.addHook('onClose', async () => {
      await databaseConnection.close();
    });

    await routes.register(app);

    return app;
  }
}

export default Application;
