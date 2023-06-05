import { Router } from "express"
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware"
import { clientSchemaRequest, clientSchemaUpdateRequest } from "../schemas/client.schemas"
import { createContactController, deleteContactController, generatePdfClientsController, listContactsController, retrieveContactController, updateContactController } from "../controllers/contact.controller"
import { createClientController, deleteClientController, listClientsController, retrieveClientController, updateClientController } from "../controllers/client.controllers"
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware"
import { ensureIsOwnerContactMiddleware } from "../middlewares/ensureIsOwnerContact.middleware"
import { contactSchemaRequest, contactSchemaRequestUpdate } from "../schemas/contact.schema"


const clientRoutes = Router()

clientRoutes.post("", ensureDataIsValidMiddleware(clientSchemaRequest), createClientController)
clientRoutes.get("/all", listClientsController)
clientRoutes.use(ensureAuthMiddleware)
clientRoutes.get("", retrieveClientController)
clientRoutes.patch("/:id", ensureDataIsValidMiddleware(clientSchemaUpdateRequest),updateClientController)
clientRoutes.delete("/:id", deleteClientController)

clientRoutes.get("/contact", listContactsController)
clientRoutes.get("/contact/getpdf", generatePdfClientsController)
clientRoutes.use(ensureIsOwnerContactMiddleware)
clientRoutes.post("/contact", ensureDataIsValidMiddleware(contactSchemaRequest), createContactController)
clientRoutes.get("/contact/:id", retrieveContactController)
clientRoutes.patch("/contact/:id", ensureDataIsValidMiddleware(contactSchemaRequestUpdate), updateContactController)
clientRoutes.delete("/contact/:id", deleteContactController)

export { clientRoutes }