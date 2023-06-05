import "reflect-metadata"
import "express-async-errors"
import express, { Application } from "express"
import cors from "cors"
import { clientRoutes } from "./routes/client.routes"
import { loginRoutes } from "./routes/login.routes"
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware"

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use("/client", clientRoutes)
app.use("/login", loginRoutes)

app.use(handleAppErrorMiddleware)


export default app