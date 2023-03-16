import { Request, Response } from "express";
import Like from "../models/like";
import Tweets from "../models/tweets";

  
export const addLikes = async (
  req: Request,
  res: Response
) => {
  const { owner,id_tweet } = req.params;
 try{
 const newtweets = new Like({
    owner,
    id_tweet,
    like:true
  });

  const saveTweets = await newtweets.save();

  return res.status(201).json(saveTweets);
 }catch (err) {
 
return res.status(400).json(err)
}
};
 
  export const GetLike = async (req: Request,
    res: Response
  ) => { 
    const { owner } = req.params;
    const getlike = await Like.findOne({$and: [{owner},{id_tweet: req.params.id_tweet}]} )
    if (getlike) {
      res.status(200).json(getlike);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }

  }
  export const GetLikeOwner = async (req: Request,
    res: Response
  ) => { 
    const owner = await Like.find({ id_tweet: req.params.id_tweet })
    if (owner) {
      res.status(200).json(owner);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }

  }
 
  export const GetLikeFiltrar = async (req: Request,
    res: Response
  ) => {
    const owner = await Like.find().sort({"id_tweet": 1});
  //  const owner1 = owner.id_tweet
    //const owner2 = await Tweets.find(owner1)
    if (owner) {
      res.status(200).json(owner);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }

  }
  export const deleteLike = async (req: Request, res: Response) => {
   const {owner} = req.params;
    const user = await Like.findOneAndDelete({$and: [{owner},{id_tweet: req.params.id_tweet}]});
    if (user) {
      res.status(200).json("Tweet eliminado");
    } else {
      return res.status(400).json({ msg: "Tweet incorrecto." });
    }
    


  };
  
export const countLikes = async (req: Request, res: Response) => {
const replies = await Like.countDocuments({id_tweet: req.params.id_tweet})
return res.status(200).json(replies);
  
}