import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity('reclamos')
export class Reclamo extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idreclamo: number;

    @Column({type: 'varchar',  nullable: true})
    comentario: string;

    @Column({type:'varchar',default:'ACTIVO', length:10, nullable:true})
    estado: string;

    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => User, user => user.reclamo)
    @JoinColumn({name:'idusuario'})
    user: User;

    

}