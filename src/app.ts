import "reflect-metadata"
import "express-async-errors"
import express, { Application } from "express"
import cors from "cors"
import { clientRoutes } from "./routes/client.routes"
import { loginRoutes } from "./routes/login.routes"
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"
import { contactsRoutes } from "./routes/contact.routes"




const app: Application = express()

app.use(express.json())
app.use(cors())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)) // Não Finalizada

app.use("/client", clientRoutes)
app.use("/client/contact", contactsRoutes)
app.use("/login", loginRoutes)

app.use(handleAppErrorMiddleware)


export default app