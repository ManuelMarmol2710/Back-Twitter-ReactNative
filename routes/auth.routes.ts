import { Router } from "express";
import {
  addTweetsWithOwner,
  TweetsByOwner,
  TweetsByOneUser,
} from "../controllers/tweets.controller";
import {
  deleteUserByEmail,
  login,
  profile,
  register,
  sendEmail,
  updatePassword,
  updateUserByEmail,
} from "../controllers/auth.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post("/login", login);
router.delete("/profile/:email", deleteUserByEmail);

router.get("/profile", requireAuth, profile);
router.post("/register", register);
router.put("/update/:email", updateUserByEmail);
router.put("/updatepassword/:email", updatePassword);

router.post('/sendEmail/:email',sendEmail )

router.post("/tweet/:owner", addTweetsWithOwner);
router.get("/tweet/:owner", TweetsByOwner);
router.get("/tweet/:owner/:title", TweetsByOneUser);

export default router;
