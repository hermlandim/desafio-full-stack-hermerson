import { z } from "zod"
import { clientSchemaResponse } from "./client.schemas"


const contactSchema = z.object({
    id: z.string(),
    full_name: z.string(),
    email: z.string(),
    phone: z.string(),
    createdAt: z.date(),
    client: clientSchemaResponse
})

const contactSchemaRequest = contactSchema.omit({
    id: true,
    createdAt: true,
    client: true
})

const contactSchemaRequestUpdate = contactSchemaRequest.partial()

const contactSchemaResponse = contactSchema.omit({
    client: true
})

const contactsSchemaResponse = z.array(contactSchemaResponse)



export { contactSchema, contactSchemaRequest, contactSchemaResponse, contactsSchemaResponse, contactSchemaRequestUpdate }