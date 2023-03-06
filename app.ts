import express from'express'
import authRoutes from './routes/auth.routes'
import morgan from "morgan";
import cors from "cors";
const app = express()

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:19006',
    credentials:true
}));
app.get("/", (_req, res) => {
    res.send(`  La api esta en http://localhost:${app.get("port")} `);
  });
app.use(authRoutes)


export default app