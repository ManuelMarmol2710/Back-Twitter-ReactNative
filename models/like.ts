import { model, Schema, Document } from "mongoose";

export interface like extends Document {
  like: boolean;
  owner: string;
  id_tweet: string;

}

const likeSchema = new Schema(
  {
    owner: {
        type: String,
        require: true,
      },
    like: {
      type: Boolean,
      require: true,
    },

    id_tweet: {
        type: String,
        require: true,
      },
  },
  {
    versionKey: false,
  }
);
likeSchema.pre<like>("save", async function (next) {});

export default model<like>("Like", likeSchema);