import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import mainRouter from "./routes";
import { setupSwagger } from "./swagger";

export const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Setup Swagger documentation
setupSwagger(app);

app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
