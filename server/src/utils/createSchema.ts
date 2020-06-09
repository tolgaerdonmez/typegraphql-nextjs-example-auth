import { buildSchema } from "type-graphql";
import { RegisterResolver } from "../modules/user/Register";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { LoginResolver } from "../modules/user/Login";
import { MeResolver } from "../modules/user/Me";
import { LogoutResolver } from "../modules/user/Logout";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [
      RegisterResolver,
      ConfirmUserResolver,
      ChangePasswordResolver,
      ForgotPasswordResolver,
      LoginResolver,
      MeResolver,
      LogoutResolver,
    ],
    authChecker: ({ context: { req } }) => {
      if (req.session.userId) {
        return true;
      }
      return false;
    },
  });
};
