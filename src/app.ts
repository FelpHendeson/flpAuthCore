import Fastify, { FastifyInstance } from 'fastify';
import { PrismaConnection } from './database/prisma.connection';
import { AppRoutes } from './routes/routes';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { UserService } from './user/user.service';

export class Application {
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
