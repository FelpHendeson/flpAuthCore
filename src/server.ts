import 'dotenv/config';
import { Application } from './app';

/**
 * Handles application startup and Fastify listen lifecycle.
 */
export class Server {
  constructor(
    private readonly application: Application,
    private readonly port: number,
    private readonly host: string,
  ) {}

  /**
   * Starts the HTTP server.
   */
  public async start(): Promise<void> {
    const app = await this.application.createApp();

    try {
      await app.listen({ port: this.port, host: this.host });
      console.log(`Server running at http://${this.host}:${this.port}`);
    } catch (error) {
      app.log.error(error);
      process.exit(1);
    }
  }
}

const port = Number(process.env.PORT) || 3333;
const host = process.env.HOST || '0.0.0.0';

const server = new Server(new Application(), port, host);
await server.start();
