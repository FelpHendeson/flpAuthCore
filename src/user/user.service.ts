import { CreateUserInput, User, UserOutput } from './user.model';
import { UserRepository } from './user.repository';

export class UserValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserValidationError';
  }
}

export class DuplicateUserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateUserError';
  }
}

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(input: CreateUserInput): Promise<UserOutput> {
    const sanitizedInput = this.sanitizeInput(input);
    this.validateInput(sanitizedInput);

    const existingUser = await this.userRepository.findByEmail(sanitizedInput.email);
    if (existingUser) {
      throw new DuplicateUserError('User with this email already exists.');
    }

    const user = User.create(sanitizedInput);
    const savedUser = await this.userRepository.save(user);

    return savedUser.toOutput();
  }

  private sanitizeInput(input: CreateUserInput): CreateUserInput {
    return {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
    };
  }

  private validateInput(input: CreateUserInput): void {
    if (!input.name) {
      throw new UserValidationError('Name is required.');
    }

    if (!input.email) {
      throw new UserValidationError('Email is required.');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.email)) {
      throw new UserValidationError('Email format is invalid.');
    }
  }
}

export default UserService;
