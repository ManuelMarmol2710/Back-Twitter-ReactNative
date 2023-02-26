import { Request, Response } from "express";
import follow from "../models/follow";
import Tweets from "../models/tweets";
export const addFollow = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { following } = req.body;
  const newFollow = new follow({
    following,
  });

  const saveFollow = await newFollow.save();
  saveFollow!.owner = req.params.owner;

  const newfollowWithOwner = new follow(saveFollow);
  await newfollowWithOwner.save();
  return res.status(201).json(saveFollow);
};
export const followTweets = async (req: Request, res: Response) => {
    const followers = await follow.find(
     { owner: req.body.owner },
    { following: 0 | 1, _id: 0 }
  );
  if (followers) {
    const owner1 = await Tweets.find({ followers }, { _id: 0 }).select(
      "tweets owner"
    );
    console.log(followers)
    res.status(200).json(owner1);
  
};
}

export const getFollowers = async (req: Request, res: Response) => {
  const owner = await follow.find(
    { owner: { $in: req.params.owner } },
    { following: 1, _id: 0 }
  );

  if (owner) {
    res.status(200).json(owner);
  } else {
    return res.status(400).json({ msg: "Titulo incorrecto." });
  }
};
