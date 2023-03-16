import { Request, Response } from "express";
import Tweets from "../models/tweets";

export const addTweetsWithOwner = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { tweets } = req.body;
  const {url} = req.body
  if (!req.body.tweets ) {
    return res.status(400).json({ msg: "Usuario o contraseña invalidos." });
  }
 const newtweets = new Tweets({
    tweets,
    url
  });

  const saveTweets = await newtweets.save();
  saveTweets!.owner = req.params.owner;

  const newtweetWithOwner = new Tweets(saveTweets);
  await newtweetWithOwner.save();
  return res.status(201).json(saveTweets);
};
export const TweetsByOwner = async (req: Request, res: Response) => {
  const tweet = await Tweets.find({owner: req.params.owner }).sort({"time": -1});
 if (tweet) {
    res.status(200).json(tweet);
  } else {
    return res.status(400).json({ msg: "Titulo incorrecto." });
  }
};

export const TweetsByOneUser = async (req: Request, res: Response) => {
  const tweet = await Tweets.find({ tweets:{ $regex: req.params.tweets }}).sort({"time": -1});
if (tweet) {
    res.status(200).json(tweet);
  } else {
    return res.status(400).json({ msg: "Tweet  no encontrado." });
  }
};
export const OrdenarTweetsPorFechas = async (req: Request, res: Response) => {
  const tweet = await Tweets.find({tweets: { $regex: req.params.tweets }}).sort({"time": 1});
if (tweet) {
    res.status(200).json(tweet);
  } else {
    return res.status(400).json({ msg: "Tweet  no encontrado." });
  }
};
export const OrdenarTweetsPorImages = async (req: Request, res: Response) => {
  const tweet = await Tweets.find({url: { $regex: req.params.tweets }}).sort({"time": -1});
if (tweet) {
    res.status(200).json(tweet);
  } else {
    return res.status(400).json({ msg: "Tweet  no encontrado." });
  }
};
export const OrdenarTweetsPorFechasNuevas = async (req: Request, res: Response) => {
  const tweet = await Tweets.find({tweets: { $regex: req.params.tweets }}).sort({"time": -1});
if (tweet) {
    res.status(200).json(tweet);
  } else {
    return res.status(400).json({ msg: "Tweet  no encontrado." });
  }
};

export const deleteTweet = async (req: Request, res: Response) => {
  const user = await Tweets.findByIdAndDelete({ _id: req.params._id });
  if (user) {
    res.status(200).json("Tweet eliminado");
  } else {
    return res.status(400).json({ msg: "Tweet incorrecto." });
  }
};
export const countTweets = async (req: Request, res: Response) => {
  const replies = await Tweets.countDocuments({owner: req.params.owner})
  return res.status(200).json(replies);
    
  }
