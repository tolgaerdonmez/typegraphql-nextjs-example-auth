import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
// import { MyContext } from "src/types/MyContext";
import { redis } from "../../redis";
import { confirmUserPrefix } from "../../constants/redisPrefixes";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("token") token: string
    // @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token);

    if (!userId) {
      return false;
    }

    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    await redis.del(token);

    return true;
  }
}
