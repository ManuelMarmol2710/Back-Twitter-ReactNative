import { model, Schema, Document } from "mongoose";

export interface tweets extends Document {
  tweets: string;
  owner: string;

}

const tweetsSchema = new Schema(
  {
   
    tweets: {
      type: String,
      require: true,
    },

    owner: {
      type: String,
      require: true,
    },

  
  },
  {
    versionKey: false,
  }
);
tweetsSchema.pre<tweets>("save", async function (next) {});

export default model<tweets>("Tweets", tweetsSchema);
