import { CreateUserInput, User, UserOutput } from './user.model';
import { UserRepository } from './user.repository';

/**
 * Error thrown when user input fails validation rules.
 */
export class UserValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserValidationError';
  }
}

/**
 * Error thrown when user uniqueness constraints are violated.
 */
export class DuplicateUserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateUserError';
  }
}

/**
 * Service responsible for user creation business rules.
 */
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Creates a user after sanitization and validation.
   * @param input - User creation payload.
   * @returns Created user output payload.
   * @throws UserValidationError
   * @throws DuplicateUserError
   */
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

  /**
   * Trims and normalizes user input values.
   * @param input - Raw user payload.
   * @returns Sanitized user payload.
   */
  private sanitizeInput(input: CreateUserInput): CreateUserInput {
    return {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
    };
  }

  /**
   * Validates required user fields and email format.
   * @param input - Sanitized user payload.
   * @throws UserValidationError
   */
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
