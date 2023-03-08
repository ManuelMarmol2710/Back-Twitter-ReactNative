import { Request, Response } from "express";
import Comments from "../models/comment";
import jwt from "jsonwebtoken";
import tweets from "../models/tweets";
export const addCommentWithOwner = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { comment } = req.body;
    if (!req.body.comment ) {
      return res.status(400).json({ msg: "No ingresado" });
    }
   const newComment = new Comments({
      comment,
    });
  
    const saveComments = await newComment.save();
    saveComments!.owner = req.params.owner;
    saveComments!.id_tweet = req.params.id_tweet;
    const newComentsWithOwner = new Comments(saveComments);
    await newComentsWithOwner.save();
    return res.status(201).json(saveComments);
  };
  export const commentsByid = async (req: Request, res: Response) => {
    const idComments = await Comments.find({ id_tweet: req.params.id_tweet });
  
    if (idComments) {
      res.status(200).json(idComments);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }
  
  }
  export const addLikeComment = async (
    req: Request,
    res: Response
  ) => {
    const { id_tweet } = req.params;
    const {owner} = req.params;
    const user = await Comments.findByIdAndUpdate(
        { _id: req.params._id },
        {
          id_tweet,  
         like:true,
         owner
        },
        {  new: true, upsert: true}
      );
    
      res.status(200).json(user);
 
    
  };
  export const GetLikeComment = async (req: Request,
    res: Response
  ) => { 
    const owner = await Comments.findById({ _id: req.params._id })
    if (owner) {
      res.status(200).json(owner);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }

  }
  export const dislikeComment = async (req: Request, res: Response) => {
  
    const user = await Comments.findByIdAndUpdate(
      { _id: req.params._id },
      {
       like:false
      },
      {  new: true }
    );
  
    res.status(200).json(user);
  };