import { Router } from "express";
import {
  addTweetsWithOwner,
  TweetsByOwner,
  TweetsByOneUser,
  deleteTweet,
  OrdenarTweetsPorFechas,
  OrdenarTweetsPorFechasNuevas,

} from "../controllers/tweets.controller";
import {
 login,
  profile,
  register,
 updatePassword,
  updateUserByEmail,
  TweetsByOwnerOne,
  
} from "../controllers/auth.controller";
import {addCommentWithOwner,commentsByid ,addLikeComment, GetLikeComment, dislikeComment,deleteComment,updateComments} from "../controllers/comments.controller"
import { addFollow,followTweets,getFollowers} from "../controllers/follow.controller";

import { addLike, GetLike, dislike} from "../controllers/like.controller";
import { sendEmail } from "../controllers/sendemail.controller";
import { requireAuth } from "../middleware/requireAuth";
const router = Router();

router.post("/login",login);

router.get("/profile", requireAuth, profile);
router.post("/register", register);
router.put("/update/:email", updateUserByEmail);
router.put("/updatepassword/:email", updatePassword);

router.post('/sendEmail/:email',sendEmail );

router.post("/tweet/:owner", addTweetsWithOwner);
router.get("/tweet/:owner", TweetsByOwner);
router.get("/tweetSearch/:tweets", TweetsByOneUser);
router.get("/userSearch/:username", TweetsByOwnerOne );
router.get("/tweetsFilterForOld/:tweets", OrdenarTweetsPorFechas);
router.get("/tweetsFilterForNew/:tweets", OrdenarTweetsPorFechasNuevas);
router.delete('/deleteTweets/:tweets',deleteTweet);

router.put('/like/:id_tweet/:owner', addLike);
router.get('/like/:_id', GetLike);
router.put('/notlike/:_id', dislike);

router.post('/comment/:id_tweet/:owner',addCommentWithOwner)
router.get('/comment/:id_tweet',commentsByid)
router.put('/likeComment/:_id/:owner', addLikeComment);
router.get('/likeComment/:_id', GetLikeComment);
router.put('/notlikeComment/:_id', dislikeComment);
router.put('/updateComment/:_id',updateComments)
router.delete('/deleteComment/:_id', deleteComment);

router.post('/follow/:owner', addFollow);
router.get('/follow/:owner1', followTweets);
router.get('/followers/:owner', getFollowers);



export default router;
