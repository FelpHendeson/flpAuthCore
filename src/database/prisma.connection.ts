import { PrismaClient } from '@prisma/client';

export class PrismaConnection {
  private readonly client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public static fromEnv(env: NodeJS.ProcessEnv = process.env): PrismaConnection {
    if (!env.DATABASE_URL) {
      throw new Error('DATABASE_URL is required to initialize Prisma.');
    }

    return new PrismaConnection();
  }

  public async connect(): Promise<void> {
    await this.client.$connect();
    await this.client.$queryRaw`SELECT 1`;
  }

  public getClient(): PrismaClient {
    return this.client;
  }

  public async close(): Promise<void> {
    await this.client.$disconnect();
  }
}

export default PrismaConnection;
