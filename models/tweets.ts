import { model, Schema, Document, now,} from "mongoose";

export interface tweets extends Document {
  tweets: string;
  owner: string;
  url:string;

}

const tweetsSchema = new Schema(
  {
   
    tweets: {
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
       require: true,
    },
    url:{
      type: String
    }
  
  
  },
  {
    versionKey: false,
  }
);
tweetsSchema.pre<tweets>("save", async function (next) {});

export default model<tweets>("Tweets", tweetsSchema);
