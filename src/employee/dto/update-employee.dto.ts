import { IsEmail, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateEmployeeDto {
	@IsOptional()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	position?: string;

	@IsOptional()
	@IsNumber()
	salary?: number;
}
