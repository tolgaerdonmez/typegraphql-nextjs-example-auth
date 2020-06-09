import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { v4 } from "uuid";
import { redis } from "../../redis";
import { sendMail } from "../../utils/sendMail";
import { forgotPasswordPrefix } from "../../constants/redisPrefixes";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1 Day expiration

    await sendMail(
      email,
      "http://localhost:3000/user/password/change/" + token
    );

    return true;
  }
}
