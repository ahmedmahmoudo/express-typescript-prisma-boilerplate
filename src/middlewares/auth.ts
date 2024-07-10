import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptionsWithRequest,
} from "passport-jwt";
import passport from "passport";
import db from "@src/services/db";
import { omit } from "lodash";

const options: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
  passReqToCallback: true,
};

passport.use(
  new JwtStrategy(options, async (req, jwt_payload, done) => {
    try {
      // Find the user
      const user = await db.user.findUniqueOrThrow({
        where: {
          id: jwt_payload.id,
        },
      });
      req.user = omit(user, "password");
      return done(null, omit(user, "password"));
    } catch (error) {
      return done(error, false);
    }
  }),
);

export const authMiddleware = passport;
