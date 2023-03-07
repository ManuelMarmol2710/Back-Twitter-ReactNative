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
    const idComments = await Comments.findOne({ id_tweet: req.params.id_tweet });
  
    if (idComments) {
      res.status(200).json(idComments);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }
  
    const token = jwt.sign(
      {
        //infromacion del usario email: nombre: imagen: ect
        id: idComments.id_tweet
     
      },
      "secret",
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    return res.json({
      token,
    });
  };
  export const comments = (req: Request, res: Response) => {
    return res.json({
      comments: {
        username: req.payload,
        id: req.params.id_tweet,
        id1: req.body.id_tweet,
      },
    });
  };