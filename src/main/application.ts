import { httpServer } from "@/infra/http/utils/http-server";
import { SERVER } from "@/util/constants";
import cors from "cors";
import express from "express";
import path from "path";

const application = httpServer();

application.use(cors({ exposedHeaders: "X-Total-Count" }));
application.use(express.json());
application.use(express.urlencoded({ extended: true }));

application.setSharedState({});

application.setBaseUrl(SERVER.BASE_URI);

const routesFolder = path.resolve(__dirname, "routes");
const publicRoutesFolder = path.resolve(routesFolder, "public");
const privateRoutesFolder = path.resolve(routesFolder, "private");

application.routesDirectory(publicRoutesFolder);
application.routesDirectory(privateRoutesFolder);

export { application };
