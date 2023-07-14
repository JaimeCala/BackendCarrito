import { BaseEntity, Entity, PrimaryGeneratedColumn, Column,  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { Vendedor } from "../vendedor/vendedor.entity";
import { Pedido } from "../pedido/pedido.entity";

@Entity('venta')
export class Venta extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idventa:number;

    @Column({type:'varchar',length: 15, nullable:false})
    estadopedido:string;

    /*@Column({type:'float', nullable:false})
    total:number;

    @Column({nullable:true})
    cantidad:number;*/

    @Column({type:'varchar', length:200,  nullable:true})
    observacion:string;


    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Vendedor, vendedor => vendedor.ventas)
    @JoinColumn({name:'idvendedor'})
    vendedor: Vendedor;

    @ManyToOne(() => Pedido, pedido => pedido.ventas)
    @JoinColumn({name:'idpedido'})
    pedido: Pedido;

    

}