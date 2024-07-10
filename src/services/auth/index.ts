import { User } from "@prisma/client";
import SigninDTO from "@src/dtos/signin.dto";
import SignupDTO from "@src/dtos/signup.dto";
import db from "@src/services/db";
import bcrypt from "bcrypt";
import { omit } from "lodash";
import { sign } from "jsonwebtoken";

type UserReturnType = Promise<
  [Partial<User> | null, { message: string } | null]
>;

export const signin = async (signinDto: SigninDTO): UserReturnType => {
  const user = await db.user.findUnique({
    where: {
      email: signinDto.email,
    },
  });

  if (!user) {
    return [null, { message: "User was not found" }];
  }

  const password = signinDto.password;
  try {
    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (passwordMatch) {
      return [omit(user, "password"), null];
    }
  } catch {
    // Do nothing for now
  }
  return [null, { message: "User was not found" }];
};

export const signup = async (signupDto: SignupDTO): UserReturnType => {
  let user = await db.user.findUnique({
    where: {
      email: signupDto.email,
    },
  });
  if (user) {
    return [null, { message: "Email is already registered" }];
  }

  const salt = 10;
  const hashedPassword = await bcrypt.hash(signupDto.password, salt);

  user = await db.user.create({
    data: {
      ...signupDto,
      password: hashedPassword,
    },
  });

  return [omit(user, "password"), null];
};

export const signJwt = (user: Partial<User>): string => {
  const secret = process.env.JWT_SECRET as string;

  const jwt = sign(user, secret, {
    expiresIn: "1d",
  });
  return jwt;
};
