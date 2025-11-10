import { IsEmail, IsNotEmpty } from "class-validator";

export class SubscribeToNewsletter {
  @IsNotEmpty()
  @IsEmail()
  email: string ;
}