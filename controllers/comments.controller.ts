import { Request, Response } from "express";
import Comments from "../models/comment";

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
  const { owner,id_tweet } = req.params;
 try{
 const newtweets = new Comments({
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
 
  export const GetLikeComment = async (req: Request,
    res: Response
  ) => { 
    const { owner } = req.params;
    const getlike = await Comments.findOne({$and: [{owner},{id_tweet: req.params.id_tweet}]} )
    if (getlike) {
      res.status(200).json(getlike);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }

  }
 
  export const dislikeComment = async (req: Request, res: Response) => {
    const {owner} = req.params;
     const user = await Comments.findOneAndDelete({$and: [{owner},{id_tweet: req.params.id_tweet}]});
     if (user) {
       res.status(200).json("Tweet eliminado");
     } else {
       return res.status(400).json({ msg: "Tweet incorrecto." });
     }
     
   };
   export const GetLikeComments = async (req: Request,
    res: Response
  ) => { 
    const owner = await Comments.find({ id_tweet: req.params.id_tweet })
    if (owner) {
      res.status(200).json(owner);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }

  }

  export const updateComments= async (req: Request, res: Response) => {
    if (!req.body.comment) { 
      return res.status(400).json({ msg: "Llenar algun campo de datos." });
    }
  
    const user = await Comments.findByIdAndUpdate(
      { _id: req.params._id },
      {
        
        comment: req.body.comment,
      
      },
      { new: true }
    );
  
    res.status(200).json(user);
  };


  export const deleteComment = async (req: Request, res: Response) => {
    const user = await Comments.findByIdAndDelete({_id: req.params._id });
    if (user) {
      res.status(200).json("comentario eliminado");
    } else {
      return res.status(400).json({ msg: "comentario incorrecto." });
    }
  };
  export const countLikesCo = async (req: Request, res: Response) => {
    const replies = await Comments.countDocuments({id_tweet: req.params.id_tweet})
    return res.status(200).json(replies);
      
    }