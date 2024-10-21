import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect("mongodb://localhost/bookstore")
    .then(() => {
      console.log("DB connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};
