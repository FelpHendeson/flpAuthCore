import { PrismaClient } from '@prisma/client';

/**
 * Manages Prisma client lifecycle for application startup and shutdown.
 */
export class PrismaConnection {
  private readonly client: PrismaClient;

  /**
   * Creates a new Prisma client instance.
   */
  constructor() {
    this.client = new PrismaClient();
  }

  /**
   * Builds a Prisma connection using environment variables.
   * @param env - Process environment values.
   * @returns Prisma connection instance.
   * @throws Error when DATABASE_URL is missing.
   */
  public static fromEnv(env: NodeJS.ProcessEnv = process.env): PrismaConnection {
    if (!env.DATABASE_URL) {
      throw new Error('DATABASE_URL is required to initialize Prisma.');
    }

    return new PrismaConnection();
  }

  /**
   * Opens database connection and validates connectivity.
   */
  public async connect(): Promise<void> {
    await this.client.$connect();
    await this.client.$queryRaw`SELECT 1`;
  }

  /**
   * Exposes Prisma client for repository layer usage.
   * @returns Prisma client instance.
   */
  public getClient(): PrismaClient {
    return this.client;
  }

  /**
   * Closes database connection.
   */
  public async close(): Promise<void> {
    await this.client.$disconnect();
  }
}

export default PrismaConnection;
