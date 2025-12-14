import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes";
import sweetRoutes from "./routes/sweet.routes";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ SERVE IMAGES CORRECTLY
app.use(
  "/images",
  express.static(path.join(__dirname, "..", "images"))
);

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;
