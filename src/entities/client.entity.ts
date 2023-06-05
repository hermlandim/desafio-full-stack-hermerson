import { getRounds, hash, hashSync } from "bcryptjs"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany, BeforeUpdate } from "typeorm"
import { Contact } from "./contact.entity"


@Entity("clients")
class Client {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    full_name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    phone: string

    @CreateDateColumn()
    createdAt?: string | Date
    
    @OneToMany(() => Contact, (contact) => contact.client)
    contacts: Contact[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword () {
        const isEncryptRound = getRounds(this.password)
        if(!isEncryptRound){
            this.password = hashSync(this.password, 10)
        }
    }


}

export { Client }

