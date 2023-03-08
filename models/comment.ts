import { model, Schema, Document } from "mongoose";

export interface comment extends Document {
  comment: string;
  owner: string;
  id_tweet: string;
}

const commentsSchema = new Schema(
  {
   
    comment: {
      type: String,
      require: true,
      
    },
    id_tweet: {
        type: String,
        require: true,
        
      },

    owner: {
      type: Object,
      require: true,
    },

    time:{
      type: Date,
      default: Date.now(),
  
    },
    like: {
      type: Boolean,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);
commentsSchema.pre<comment>("save", async function (next) {});

export default model<comment>("Comments", commentsSchema);