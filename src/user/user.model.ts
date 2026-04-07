import { randomUUID } from 'node:crypto';

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface PersistedUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface UserOutput {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export class User {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly createdAt: Date,
  ) {}

  public static create(input: CreateUserInput): User {
    return new User(randomUUID(), input.name, input.email, new Date());
  }

  public static restore(input: PersistedUser): User {
    return new User(input.id, input.name, input.email, input.createdAt);
  }

  public getEmail(): string {
    return this.email;
  }

  public toPersistence(): PersistedUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    };
  }

  public toOutput(): UserOutput {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt.toISOString(),
    };
  }
}

export default User;
