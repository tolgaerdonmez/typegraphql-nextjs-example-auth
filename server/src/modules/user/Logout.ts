import { Resolver, Mutation, Ctx } from "type-graphql";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() context: MyContext): Promise<boolean> {
    return new Promise((res, rej) =>
      context.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        context.res.clearCookie("qid");
        return res(true);
      })
    );
  }
}
