
import { Request, Response } from "express";
import User from "../models/users";
import jwt from "jsonwebtoken";

export const login = async(req: Request, res: Response) => {
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
      name: req.params.name  ,
      last_Name: req.body.last_Name
    },
  });
};


export const register = async (req: Request, res: Response): Promise<Response> => {
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

}

