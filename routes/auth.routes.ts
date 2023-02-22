import { Router } from "express";
import { addTweetsWithOwner, TweetsByOwner,TweetsByOneUser } from "../controllers/tweets.controller";
import { login, profile, register } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post("/login", login);

router.get("/profile", requireAuth, profile);
router.post("/register", register);

router.post("/tweet/:owner", addTweetsWithOwner);
router.get("/tweet/:owner", TweetsByOwner);
router.get("/tweet/:owner/:title", TweetsByOneUser);

export default router;
