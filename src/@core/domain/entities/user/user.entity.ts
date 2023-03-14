import { Either, left, right } from '@/@core/shared';
import { InvalidEmailError, InvalidNameError } from '../errors';
import { EmailValidator, NameValidator } from '../validators';

export type UserProps = {
  id?: number;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  password: string;
  hashedRt?: string;
  emailVerified: boolean;
};

export class User {
  private props: UserProps;

  private constructor(props: UserProps) {
    this.props = props;
  }

  public static create(
    value: UserProps,
  ): Either<InvalidNameError | InvalidEmailError, User> {
    if (!EmailValidator.validate(value.email)) {
      return left(new InvalidEmailError(value.email));
    }

    if (!NameValidator.validate(value.name)) {
      return left(new InvalidNameError(value.name));
    }

    return right(new User(value));
  }

  get id(): number {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get password(): string {
    return this.props.password;
  }

  get hashedRt(): string {
    return this.props.hashedRt;
  }

  get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  public verifyEmail(): void {
    this.props.emailVerified = true;
  }

  public alterEmail(email: string): Either<InvalidEmailError, boolean> {
    if (!EmailValidator.validate(email)) {
      return left(new InvalidEmailError(email));
    }
    return right(true);
  }

  public alterName(name: string): Either<InvalidNameError, boolean> {
    if (!NameValidator.validate(name)) {
      return left(new InvalidNameError(name));
    }
    return right(true);
  }
}
