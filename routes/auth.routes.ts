import { Router } from "express";
import {
  addTweetsWithOwner,
  TweetsByOwner,
  TweetsByOneUser,
  deleteTweet

} from "../controllers/tweets.controller";
import {
  deleteUserByEmail,
  login,
  profile,
  register,
  sendEmail,
  updatePassword,
  updateUserByEmail,
  TweetsByOwnerOne,
  
} from "../controllers/auth.controller";

import { addFollow,followTweets,getFollowers} from "../controllers/follow.controller";

import { requireAuth } from "../middleware/requireAuth";
const router = Router();

router.post("/login",login);
router.delete("/profile/:email", deleteUserByEmail);

router.get("/profile", requireAuth, profile);
router.post("/register", register);
router.put("/update/:email", updateUserByEmail);
router.put("/updatepassword/:email", updatePassword);

router.post('/sendEmail/:email',sendEmail )

router.post("/tweet/:owner", addTweetsWithOwner);
router.get("/tweet/:owner", TweetsByOwner);
router.get("/tweetSearch/:tweets", TweetsByOneUser);
router.get("/userSearch/:username", TweetsByOwnerOne );
router.get("/tweet/:owner", TweetsByOwner);
router.delete('/deleteTweets/:tweets',deleteTweet);
router.post('/follow/:owner', addFollow)
router.get('/follow/:owner1', followTweets)
router.get('/followers/:owner', getFollowers)

export default router;
