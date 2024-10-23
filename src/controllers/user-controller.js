import { matchedData, validationResult } from "express-validator";
import { comparePassword } from "../helpers/compare-password.js";
import { hashPassword } from "../helpers/hash-password.js";
import { User } from "../models/user.js";

export const updateUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate({ _id: userId }, { $set: req.body });

    return res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  //console.log(req.user.id, "userID", "id: ", id)
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// change password
export const changePassword = async (req, res) => {
    const userId = req.user.id
  try {


    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()})
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {password, newPassword} = matchedData(req)

    if (!comparePassword(password, user.password)) {
      return res.status(400).json({ message: "Wrong password" });
    }

    if (password === newPassword) {
      return res
        .status(400)
        .json({
          message: "New password cannot be the same as the old password.",
        });
    }

    await User.findByIdAndUpdate(
      { _id: userId },
      { password: hashPassword(newPassword) }
    );

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// change user roles
// admins only can change user roles

export const changeUserRole = async (req, res) => {
  const { role } = req.body;
  const userId = req.params.id;
  console.log(role, "role");
  console.log(userId, "userid");

  try {
    const validRoles = ["admin", "user", "author"];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role provided." });
    }

    const updatedUser = await User.findById(userId);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updatedUser.role === role) {
      return res
        .status(400)
        .json({ message: "Role is already assigned to the user." });
    }

    await User.findByIdAndUpdate(
      { _id: userId },
      { role: role },
      { new: true }
    );

    return res.status(200).json({ message: "Role was changed successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
