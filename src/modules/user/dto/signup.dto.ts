import { IsNotEmpty, Matches } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'ERROR_REQUIRED_USERNAME' })
  username: string;

  @IsNotEmpty({ message: 'ERROR_REQUIRED_PASSWORD' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Minimum eight characters, at least one letter and one number',
  })
  password: string;
}
