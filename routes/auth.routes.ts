import { Router } from "express";
import {
  addTweetsWithOwner,
  TweetsByOwner,
  TweetsByOneUser,
  deleteTweet,
  OrdenarTweetsPorFechas,
  OrdenarTweetsPorFechasNuevas,
  countTweets,

} from "../controllers/tweets.controller";
import {
 login,
  profile,
  register,
 updatePassword,
  updateUserByEmail,
  TweetsByOwnerOne,
  updateBiography,
  
  
} from "../controllers/auth.controller";
import {addCommentWithOwner,commentsByid ,addLikeComment, GetLikeComment, dislikeComment,deleteComment,updateComments, GetLikeComments, countLikesCo} from "../controllers/comments.controller"
import { addFollow,followTweets,getFollowers} from "../controllers/follow.controller";

import { GetLike,addLikes,deleteLike,GetLikeOwner,countLikes} from "../controllers/like.controller";
import { sendEmail } from "../controllers/sendemail.controller";
import { requireAuth } from "../middleware/requireAuth";
const router = Router();

router.post("/login",login);

router.get("/profile", requireAuth, profile);
router.post("/register", register);
router.put("/update/:email", updateUserByEmail);
router.put("/updatepassword/:email", updatePassword);
router.put("/updatebiography/:email", updateBiography);

router.post('/sendEmail/:email',sendEmail );

router.post("/tweet/:owner", addTweetsWithOwner);
router.get("/tweet/:owner", TweetsByOwner);
router.get("/tweetSearch/:tweets", TweetsByOneUser);
router.get("/userSearch/:username", TweetsByOwnerOne );
router.get("/tweetsFilterForOld/:tweets", OrdenarTweetsPorFechas);
router.get("/tweetsFilterForNew/:tweets", OrdenarTweetsPorFechasNuevas);
router.delete('/deleteTweets/:tweets',deleteTweet);
router.get('/countTweets/:owner',countTweets);


router.post('/like/:id_tweet/:owner', addLikes);
router.get('/like/:owner/:id_tweet', GetLike);
router.delete('/notlike/:owner/:id_tweet', deleteLike);
router.get('/likeOwner/:id_tweet', GetLikeOwner);
router.get('/countLike/:id_tweet',countLikes)

router.post('/comment/:id_tweet/:owner',addCommentWithOwner)
router.get('/comment/:id_tweet',commentsByid)
router.put('/updateComment/:_id',updateComments)
router.delete('/deleteComment/:_id', deleteComment);
router.get('/countLikeCo/:id_tweet',countLikesCo)

router.post('/likeComment/:id_tweet/:owner', addLikeComment);
router.get('/likeComment/:owner/:id_tweet', GetLikeComment);
router.delete('/notlikeComment/:owner/:id_tweet', dislikeComment);
router.get('/likeOwnerComments/:id_tweet', GetLikeComments);



router.post('/follow/:owner', addFollow);
router.get('/follow/:owner1', followTweets);
router.get('/followers/:owner', getFollowers);



export default router;
