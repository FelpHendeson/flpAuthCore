import { randomUUID } from 'node:crypto';

/**
 * Input payload used to create a user.
 */
export interface CreateUserInput {
  name: string;
  email: string;
}

/**
 * User shape persisted in the database layer.
 */
export interface PersistedUser {
  userId: string;
  name: string;
  email: string;
  createdAt: Date;
}

/**
 * User payload returned to API clients.
 */
export interface UserOutput {
  userId: string;
  name: string;
  email: string;
  createdAt: string;
}

/**
 * Domain entity that encapsulates user data transformations.
 */
export class User {
  private constructor(
    private readonly userId: string,
    private readonly name: string,
    private readonly email: string,
    private readonly createdAt: Date,
  ) {}

  /**
   * Creates a new user domain entity.
   * @param input - User creation data.
   * @returns A new user instance with generated identifier.
   */
  public static create(input: CreateUserInput): User {
    return new User(randomUUID(), input.name, input.email, new Date());
  }

  /**
   * Rebuilds a domain user from persisted data.
   * @param input - Persisted user values.
   * @returns Restored user entity.
   */
  public static restore(input: PersistedUser): User {
    return new User(input.userId, input.name, input.email, input.createdAt);
  }

  /**
   * Returns the user email address.
   * @returns User email.
   */
  public getEmail(): string {
    return this.email;
  }

  /**
   * Converts the entity to persistence representation.
   * @returns User data in persistence format.
   */
  public toPersistence(): PersistedUser {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    };
  }

  /**
   * Converts the entity to API output representation.
   * @returns User payload for HTTP responses.
   */
  public toOutput(): UserOutput {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt.toISOString(),
    };
  }
}

export default User;
