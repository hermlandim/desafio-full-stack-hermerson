import { DataSourceOptions, DataSource } from "typeorm"
import path from "node:path"
import "dotenv/config"

    

const DataSourceConfig = (): DataSourceOptions => {

    const entityPath = path.join(__dirname, "entities/**.{js,ts}")
    const migrationsPath = path.join(__dirname, "migrations/**.{js,ts}")
 
    const dbUrl: string | undefined = process.env.DATABASE_URL

    if(!dbUrl){
        throw new Error("Env var DATABASE_URL does not exists")
    }

    const nodeEnv: string | undefined = process.env.NODE_END

    if(nodeEnv === "test"){
        return {
            type: "sqlite",
            database: ":memory",
            synchronize: true,
            entities: [entityPath]
        }
    }

    return {
        type: "postgres",
        synchronize: false,
        logging: true,
        url: dbUrl,
        entities: [entityPath],
        migrations: [migrationsPath]
    }

}

const AppDataSource: DataSource = new DataSource(DataSourceConfig())

export {AppDataSource}