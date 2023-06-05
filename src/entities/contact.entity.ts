import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, ManyToOne } from "typeorm"
import { Client } from "./client.entity"


@Entity("contacts")
class Contact {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    full_name: string

    @Column({ unique: true })
    email: string

    @Column()
    phone: string

    @CreateDateColumn()
    createdAt: string | Date

    @ManyToOne(() => Client, {cascade: true, onDelete: "CASCADE"})
    client: Client
}

export { Contact }