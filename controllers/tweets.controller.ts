import { Request, Response } from "express";
import Tweets from "../models/tweets";

export const addTweetsWithOwner = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { tweets } = req.body;
  if (!req.body.tweets ) {
    return res.status(400).json({ msg: "Usuario o contraseña invalidos." });
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
  const owner = await Tweets.find({ owner: req.params.owner }).select(
    "tweets owner"
  );

  if (owner) {
    res.status(200).json(owner);
  } else {
    return res.status(400).json({ msg: "Titulo incorrecto." });
  }
};

export const TweetsByOneUser = async (req: Request, res: Response) => {
  const tweet = await Tweets.find({ tweets:{ $regex: req.params.tweets }});
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
export const OrdenarTweetsPorFechasNuevas = async (req: Request, res: Response) => {
  const tweet = await Tweets.find({tweets: { $regex: req.params.tweets }}).sort({"time": -1});
if (tweet) {
    res.status(200).json(tweet);
  } else {
    return res.status(400).json({ msg: "Tweet  no encontrado." });
  }
};

export const deleteTweet = async (req: Request, res: Response) => {
  const user = await Tweets.findOneAndDelete({ tweets: req.params.tweets });
  if (user) {
    res.status(200).json("Tweet eliminado");
  } else {
    return res.status(400).json({ msg: "Tweet incorrecto." });
  }
};
