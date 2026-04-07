import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { PersistedUser, User } from './user.model';

/**
 * Repository responsible for user persistence operations.
 */
export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  /**
   * Persists a user entity in the database.
   * @param user - User domain entity.
   * @returns The same saved domain entity.
   */
  public async save(user: User): Promise<User> {
    const persistedUser = user.toPersistence();

    await this.prismaClient.user.create({
      data: {
        userId: persistedUser.userId,
        name: persistedUser.name,
        email: persistedUser.email,
        createdAt: persistedUser.createdAt,
      },
    });

    return user;
  }

  /**
   * Retrieves a user by email.
   * @param email - User email to search.
   * @returns User domain entity when found, otherwise null.
   */
  public async findByEmail(email: string): Promise<User | null> {
    const userRecord = await this.prismaClient.user.findUnique({
      where: { email },
    });
    if (!userRecord) {
      return null;
    }

    return User.restore(this.mapRecordToPersistedUser(userRecord));
  }

  /**
   * Maps a Prisma user record to persistence shape used by the domain entity.
   * @param record - User record from Prisma client.
   * @returns Mapped persistence user object.
   */
  private mapRecordToPersistedUser(record: PrismaUser): PersistedUser {
    return {
      userId: record.userId,
      name: record.name,
      email: record.email,
      createdAt: new Date(record.createdAt),
    };
  }
}

export default UserRepository;
