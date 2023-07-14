import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "../user/user.entity";
import { Venta } from "../venta/venta.entity";

@Entity('vendedor')
export class Vendedor extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idvendedor:number;

    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @OneToOne(() => User, user => user.vendedor)
    @JoinColumn({name:'idusuario'})
    user: User;

    @OneToMany(() => Venta, venta => venta.vendedor)
    ventas: Venta[];


    

}