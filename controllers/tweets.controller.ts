import { Request, Response } from "express";
import Tweets from '../models/tweets';

export const addTweetsWithOwner = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { tweets } = req.body;
  
    if (!tweets) {
      return res
        .status(400)
        .json({ msg: "Por favor colocar Tweet" });
    }
  
    const newtweets = new Tweets({
      tweets,
      
    });
  
    const saveTweets = await newtweets.save();
    saveTweets!.owner = req.params.owner;
  
    const newtweetWithOwner = new Tweets(saveTweets);
    await newtweetWithOwner.save();
    return res.status(201).json(saveTweets);
  };
  export const TweetsByOwner = async (req: Request, res: Response) => {
    const owner = await Tweets
      .find({ owner: req.params.owner})
      .select("tweets owner");
  
    if (owner) {
      res.status(200).json(owner);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }
  };
  export const TweetsByOneUser = async (req: Request, res: Response) => {
    const tweet = await Tweets.findOne({ tweets: req.body.tweets }).select("tweets");
  
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }
  };


  

  
  