import { Request, Response } from "express";
import Like from "../models/like";

export const addLike = async (
    req: Request,
    res: Response
  ) => {
    const { id_tweet } = req.params;
    const {owner} = req.params;
    const user = await Like.findByIdAndUpdate(
        { _id: req.params.id_tweet },
        {
          id_tweet,  
         like:true,
         owner
        },
        {  new: true, upsert: true}
      );
    
      res.status(200).json(user);
 
    
  };
  
 
  export const GetLike = async (req: Request,
    res: Response
  ) => { 
    const owner = await Like.findById({ _id: req.params._id })
    if (owner) {
      res.status(200).json(owner);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }

  }
  export const dislike = async (req: Request, res: Response) => {
  
    const user = await Like.findByIdAndUpdate(
      { _id: req.params._id },
      {
       like:false
      },
      {  new: true }
    );
  
    res.status(200).json(user);
  };