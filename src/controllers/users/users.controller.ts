import userServices from "../../services/index";

import { Request } from "../../types";

export const createUser = async (req: Request, res: Response) => {
  const newUser = userServices.createUser(req.body);
  res.status(201).json(newUser);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = userServices.getAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = userServices.getUserById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUser = userServices.updateUser(id, req.body);
  if (!updatedUser) return res.status(404).json({ message: "User not found" });
  res.json(updatedUser);
};
