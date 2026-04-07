import { PrismaClient } from '@prisma/client';
import { PersistedUser, User } from './user.model';

export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async save(user: User): Promise<User> {
    const persistedUser = user.toPersistence();

    await this.prismaClient.user.create({
      data: {
        id: persistedUser.id,
        name: persistedUser.name,
        email: persistedUser.email,
        createdAt: persistedUser.createdAt,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const userRecord = await this.prismaClient.user.findUnique({
      where: { email },
    });
    if (!userRecord) {
      return null;
    }

    return User.restore(this.mapRecordToPersistedUser(userRecord));
  }

  private mapRecordToPersistedUser(record: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  }): PersistedUser {
    return {
      id: record.id,
      name: record.name,
      email: record.email,
      createdAt: new Date(record.createdAt),
    };
  }
}

export default UserRepository;
