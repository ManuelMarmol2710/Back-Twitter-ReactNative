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
import { addFollow,ObtenerQuienSigo, getFollowersAndTweets, deleteFollow} from "../controllers/follow.controller";

import { GetLike,addLikes,deleteLike,GetLikeOwner,countLikes, GetLikeFiltrar} from "../controllers/like.controller";
import { sendEmail } from "../controllers/sendemail.controller";
import { requireAuth } from "../middleware/requireAuth";
const router = Router();

router.post("/login",login);
router.post("/register", register);
router.get("/profile", requireAuth, profile);
router.put("/update/:email", requireAuth,updateUserByEmail);
router.put("/updatepassword/:email",requireAuth, updatePassword);
router.put("/updatebiography/:email",requireAuth, updateBiography);

router.post('/sendEmail/:email',requireAuth,sendEmail );

router.post("/tweet/:owner",requireAuth, addTweetsWithOwner);
router.get("/tweet/:owner",requireAuth, TweetsByOwner);
router.get("/tweetSearch/:tweets",requireAuth, TweetsByOneUser);
router.get("/userSearch/:username",requireAuth, TweetsByOwnerOne );
router.get("/tweetsFilterForOld/:tweets", requireAuth,OrdenarTweetsPorFechas);
router.get("/tweetsFilterForNew/:tweets",requireAuth, OrdenarTweetsPorFechasNuevas);
router.delete('/deleteTweets/:_id',requireAuth,deleteTweet);
router.get('/countTweets/:owner',requireAuth, countTweets);


router.post('/like/:id_tweet/:owner',requireAuth, addLikes);
router.get('/like/:owner/:id_tweet', requireAuth,GetLike);
router.delete('/notlike/:owner/:id_tweet',requireAuth, deleteLike);
router.get('/likeOwner/:id_tweet', requireAuth,GetLikeOwner);
router.get('/countLike/:id_tweet',requireAuth,countLikes)
router.get('/likeFiltrarfol',requireAuth,GetLikeFiltrar)

router.post('/comment/:id_tweet/:owner',requireAuth,addCommentWithOwner)
router.get('/comment/:id_tweet',requireAuth,commentsByid)
router.put('/updateComment/:_id',requireAuth,updateComments)
router.delete('/deleteComment/:_id',requireAuth, deleteComment);
router.get('/countLikeCo/:id_tweet',requireAuth,countLikesCo)

router.post('/likeComment/:id_tweet/:owner', requireAuth,addLikeComment);
router.get('/likeComment/:owner/:id_tweet',requireAuth, GetLikeComment);
router.delete('/notlikeComment/:owner/:id_tweet', requireAuth,dislikeComment);
router.get('/likeOwnerComments/:id_tweet', requireAuth,GetLikeComments);



router.post('/follow/:owner', addFollow);
router.get('/follow/:owner', ObtenerQuienSigo);
router.get('/followers/:owner',  getFollowersAndTweets);
router.delete('/unfollow/:owner/:following', deleteFollow);



export default router;
