import { IsEmail, IsString, Length } from "class-validator";

export default class SignupDTO {
	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsEmail()
	email: string;

	@IsString()
	@Length(6, 35)
	password: string;
}
