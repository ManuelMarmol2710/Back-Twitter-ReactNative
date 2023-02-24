import { Request, Response } from "express";
import User from "../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "Usuario o contraseña invalidos." });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ msg: "Usuario o contraseña incorrectos." });
  }
  const token = jwt.sign(
    {
      //infromacion del usario email: nombre: imagen: ect
      email: user.email,
      name: user.name,
      last_Name: user.last_Name,
    },
    "secret",
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  const isMatch = await user.comparePassword(req.body.password);

  if (isMatch) {
    return res.status(200).json({ token });
  }

  res.status(400).json({
    msg: "email y contraseña incorrectos",
  });

  return res.json({
    token,
  });
};

export const profile = (req: Request, res: Response) => {
  return res.json({
    profile: {
      username: req.payload,
      name: req.params.name,
      last_Name: req.body.last_Name,
    },
  });
};

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.name ||
    !req.body.last_Name
  ) {
    return res.status(400).json({ msg: "Llenar todos los campos de datos." });
  }

  const user = await User.findOne({ email: req.body.email });

  console.log(user);
  if (user) {
    return res.status(400).json({ msg: "El usuario ya existe." });
  }
  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const updateUserByEmail = async (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(400).json({ msg: "Llenar algun campo de datos." });
  }

  const user = await User.findOneAndUpdate(
    { email: req.params.email },
    {
      email: req.params.email,
      name: req.body.name,
      last_Name: req.body.last_Name,
    },
    { upsert: true, new: true }
  );

  res.status(200).json(user);
};

export const updatePassword = async (req: Request, res: Response) => {
  const salt = await bcrypt.genSalt(10);
  const contrasenaCifrada = await bcrypt.hash(req.body.password, salt);
  const updatePassword = await User.findOneAndUpdate(
    { email: req.params.email },
    {
      password: contrasenaCifrada,
    },
    { upsert: true, new: true }
  );

  res.status(200).json(updatePassword);
};
export const deleteUserByEmail = async (req: Request, res: Response) => {
  const user = await User.findOneAndDelete({ email: req.params.email });
  const { concept } = req.body;
  if (!concept) {
    return res
      .status(400)
      .json({ msg: "Por favor colocar su correo y su contraseña" });
  }
  if (user) {
    res.status(200).json("Usuario eliminado");
  } else {
    return res.status(400).json({ msg: "Correo incorrecto." });
  }
};

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
