
import { Request, Response } from "express";
import User from "../models/users";
import follow from "../models/follow";
const nodemailer = require("nodemailer");
export const sendEmail = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.params.email });
  const { email } = req.params;
  const contentHTML = `
<h1>User Information</h1>
<ul>

    <li>User Email: ${email}</li>
    <li>Contraseña: ${user!.password}</li>
</ul>
`;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "manuelmarmolonicos27@gmail.com",
      pass: "ethecvirapfczzpk",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let info = await transporter.sendMail({
    from: '"Recover Password Server" <manuelmarmolonicos27@gmail.com>', // sender address,
    to: email,
    subject: "Password",
    // text: 'Hello World'
    html: contentHTML,
  });
  console.log("Message sent: %s", info.messageId);
  res.status(200).json(info);
};

export const ObtenerQuienSigo = async (req: Request, res: Response) => {
  const owner = await follow.find({owner: req.params.owner}) 
  res.status(200).json(owner)
};

export const ObtenerQuienMeSigue = async (req: Request, res: Response) => {
  const owner = await follow.find({following: req.params.following}) 
  res.status(200).json(owner)
};
export const countFollowers = async (req: Request, res: Response) => {
  const replies = await follow.countDocuments({following: req.params.following})
  return res.status(200).json(replies);
    
  }
