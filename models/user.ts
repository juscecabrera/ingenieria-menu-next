import { Schema, model, models } from "mongoose";

// Define el esquema de usuario
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
});

// Exporta el modelo, reutilizando si ya existe
export const User = models.User || model("User", userSchema);
