import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Operacion } from "../operacion/operacion.entity";

@Entity('modulo')
export class Modulo extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idmodulo:number;

    @Column({type:'varchar', length:25 , nullable:false})
    nombremodulo:string;

    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @OneToMany(() => Operacion, operacion => operacion.modulos)
    operacions: Operacion[];

}