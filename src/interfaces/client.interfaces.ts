import { z } from "zod"
import { clientSchema, clientSchemaRequest, clientSchemaResponse } from "../schemas/client.schemas"
import { DeepPartial } from "typeorm"


type TClient = z.infer<typeof clientSchema>

type TClientRequest = z.infer<typeof clientSchemaRequest>

type TClientResponse = z.infer<typeof clientSchemaResponse>

type TClientUpdateRequest = DeepPartial<TClientRequest>


export { TClient, TClientRequest, TClientResponse,TClientUpdateRequest }

