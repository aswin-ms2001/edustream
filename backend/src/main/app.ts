import express,  {type Express}  from "express";
import { env } from "@/infrastructure/config/env";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import indexRouter from "@/interface-adapters/routes/index.routes";


const app:Express = express()


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, 
}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


app.use("/",indexRouter);

app.listen(env.PORT,()=>{
    console.log(`Server running on port ${env.PORT}`);
})