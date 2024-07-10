import { authMiddleware } from "@src/middlewares/auth";
import express from "express";

const router = express.Router();

router.get(
  "/",
  authMiddleware.authorize("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      return res.json(req.user);
    }

    return res.status(401).json({ message: "unauthorized" });
  },
);

export default router;
