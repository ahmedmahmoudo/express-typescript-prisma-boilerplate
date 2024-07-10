import { IsEmail, IsString, Length } from "class-validator";

export default class SigninDTO {
	@IsEmail()
	email: string;

	@IsString()
	@Length(6, 35)
	password: string;
}
