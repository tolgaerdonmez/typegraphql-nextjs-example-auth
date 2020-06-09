import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class ChangePasswordInput {
  @Field()
  token: string;

  @Field()
  @Length(5)
  password: string;
}
