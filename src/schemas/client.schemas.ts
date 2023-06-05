import { z } from "zod"

const clientSchema = z.object({
    id: z.string(),
    full_name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    createdAt: z.date()
})

const clientSchemaRequest = clientSchema.omit({
    id: true,
    createdAt: true
})

const clientSchemaResponse = clientSchema.omit({
    password: true,
})

const clientsSchemaResponse = z.array(clientSchemaResponse)

const clientSchemaUpdateRequest = clientSchemaRequest.partial()


export { clientSchema, clientSchemaRequest, clientSchemaResponse, clientsSchemaResponse, clientSchemaUpdateRequest }