import { Request, Response } from "express";
import User from "../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ msg: "Usuario o contraseña invalidos." });
  }
const user = await User.findOne({ username: req.body.username});
  
if (!user) {
    return res.status(400).json({ msg: "Usuario o contraseña incorrectos." });
  }
  const isMatch = await user.comparePassword(req.body.password); 
 if (isMatch) {
const token = jwt.sign(
    {

      email: user.email,
      name: user.name,
      last_Name: user.last_Name,
      username: user.username,
      biography: user.biography
    },
    "secret",
    {
      expiresIn: 60 * 60 * 24,
    }
  );
    return res.status(200).json({ token });
  } if(!isMatch) {
res.status(400).json({
    msg: "usuario y contraseña incorrectos",
  });
}
}

export const profile = (req: Request, res: Response) => {
  return res.json({
    profile: {
      username: req.payload,
      name: req.params.name,
      last_Name: req.body.last_Name,
      Username: req.params.username,
      biography: req.params.biography

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
    !req.body.last_Name ||
    !req.body.username ||
    !req.body.biography
  ) {
    return res.status(400).json({ msg: "Llenar todos los campos de datos." });
  }
if(req.body.name.length <= 2) {
  return res.status(400).json({ msg: "El nombre debe tener al menos 3 caracteres." });
}
if(req.body.last_Name.length < 2) {
  return res.status(400).json({ msg: "El apellido debe tener al menos 3 caracteres." });
}
if (req.body.password.length < 7){
  return res.status(400).json({ msg: "La contraseña mayor a 7 caracteres" });
  }
  if (req.body.username.length <= 3){
    return res.status(400).json({ msg: "La contraseña mayor a 3 caracteres" });
    }

  const user = await User.findOne({ email: req.body.email });
 const username = await User.findOne({username: req.body.username})
  console.log(user);
  if (user) {
    return res.status(400).json({ msg: "El correo ya existe." });
  }
  if (username) {
    return res.status(400).json({ msg: "El usuario ya existe." });
  }
  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const updateUserByEmail = async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.last_Name) {
    return res.status(400).json({ msg: "Llenar algun campo de datos." });
  }

  const user = await User.findOneAndUpdate(
    { email: req.params.email },
    {
      name: req.body.name,
      last_Name: req.body.last_Name,
   },
    {  new: true }
  );

  res.status(200).json(user);
};
export const updateBiography = async (req: Request, res: Response) => {
  if (!req.body.biography) {
    return res.status(400).json({ msg: "Llenar algun campo de datos." });
  }

  const user = await User.findOneAndUpdate(
    { email: req.params.email },
    {
      biography: req.body.biography,
    },
    { new: true }
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
export const TweetsByOwnerOne = async (req: Request, res: Response) => {
   const owner = await User.find({username: {$regex: req.params.username}});

  if (owner) {
    res.status(200).json(owner);
  } else {
    return res.status(400).json({ msg: "Usuario incorrecto." });
  }
};

