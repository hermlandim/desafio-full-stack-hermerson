
import { Router } from "express";
import { createContactController, deleteContactController, generatePdfContactsForClientController, listContactsController, retrieveContactController, updateContactController } from "../controllers/contact.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsOwnerContactMiddleware } from "../middlewares/ensureIsOwnerContact.middleware";
import { contactSchemaRequest, contactSchemaRequestUpdate } from "../schemas/contact.schema";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";



const contactsRoutes = Router()

contactsRoutes.use(ensureAuthMiddleware)

contactsRoutes.get("", listContactsController)
contactsRoutes.get("/getpdf", generatePdfContactsForClientController)
contactsRoutes.use(ensureIsOwnerContactMiddleware)
contactsRoutes.post("", ensureDataIsValidMiddleware(contactSchemaRequest), createContactController)
contactsRoutes.get("/:id", retrieveContactController)
contactsRoutes.patch("/:id", ensureDataIsValidMiddleware(contactSchemaRequestUpdate), updateContactController)
contactsRoutes.delete("/:id", deleteContactController)


export { contactsRoutes }