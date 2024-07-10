import SigninDTO from "@src/dtos/signin.dto";
import SignupDTO from "@src/dtos/signup.dto";
import { signin, signJwt, signup } from "@src/services/auth";
import { validateInput } from "@src/utils/validation/classValidator";
import express from "express";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const [input, errors] = await validateInput<SigninDTO>(SigninDTO, req.body);

  if (errors) {
    return res.status(400).json(errors);
  }
  const [user, userErrors] = await signin(input);
  if (userErrors || !user) {
    return res.status(400).json(userErrors);
  }

  const jwt = signJwt(user);

  return res.json({
    ...user,
    accessToken: jwt,
  });
});

router.post("/signup", async (req, res) => {
  const [input, errors] = await validateInput<SignupDTO>(SignupDTO, req.body);

  if (errors) {
    console.log("errors", errors);
    return res.status(400).json(errors);
  }

  const [user, userErrors] = await signup(input);
  if (userErrors || !user) {
    return res.status(400).json(userErrors);
  }

  const jwt = signJwt(user);

  return res.json({
    ...user,
    accessToken: jwt,
  });
});

export default router;
