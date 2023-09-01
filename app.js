// Environment
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import OpenApiValidator from "express-openapi-validator";
import { databaseMiddleware } from "./middleware/database-middleware.js";
import { userRouter } from "./routes/user-router.js";
import { patientRouter } from "./routes/patient-router.js";
import { recordRouter } from "./routes/record-router.js";
import { authenticationMiddleware } from "./middleware/auth-middleware.js";
import fs from "fs";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express";

const openApiPath = "./doc/openapi.yaml";
const file = fs.readFileSync(openApiPath, "utf-8");
const swaggerDocument = yaml.parse(file);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// OpenAPI Validator
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./doc/openapi.yaml",
    validateRequests: true,
  })
);

// Swagger UI Setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Database Connection
app.use(databaseMiddleware);

// Import Router
app.use("/users", userRouter);
app.use("/patients", authenticationMiddleware, patientRouter);
app.use("/records", authenticationMiddleware, recordRouter);

// App Listen
app.get("/", (req, res) => {
  res.send("RevoU Milestone 2!");
});

app.listen(port, () => {
  console.log(`server running on localhost:${port}`);
});
