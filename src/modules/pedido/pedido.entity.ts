import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,  OneToMany, ManyToOne, JoinColumn, OneToOne, Double } from "typeorm";
import { Venta } from "../venta/venta.entity";
import { PedidoProducto } from "../pedido-produ/pedido-produ.entity";
import { Cliente } from "../cliente/cliente.entity";
import { Repartidor } from "../repartidor/repartidor.entity";

@Entity('pedido')
export class Pedido extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idpedido:number;

    @Column({type:'varchar', length:250,nullable:true})
    comentario:string;

    @Column({type:'varchar', length:250,nullable:true})
    direccion:string;

    //-------------INHABILITAR CAMPO PRECIO SI NO VA ELIMINAR TODO LA DB----//
    @Column({type:'float', nullable:true})
    precio:number;

    @Column({type:'varchar', length:100})
    latitud:string;

    @Column({type:'varchar', length:100})
    longitud:string;

    @Column({type:'date', nullable:false})
    fecha:Date;

    @Column({type:'time', nullable:false})
    hora:Date;

    @Column({type:'varchar', length:50, nullable:true})
    nombrefilepdf:string;

    @Column({type:'varchar', nullable:true})
    linkfilepdf:string;

    @Column({type:'varchar',default: 'ESPERA', length:10,nullable:false})
    estado:string;
    
    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @OneToMany(() => Venta, venta => venta.pedido)
    ventas: Venta[];

    @OneToMany(() => PedidoProducto, pedidoproducto => pedidoproducto.pedido)
    pedidoproductos: PedidoProducto[];

    @ManyToOne(() => Cliente, cliente => cliente.pedidos)
    @JoinColumn({name:'idcliente'})
    cliente: Cliente;

    @OneToMany(() => Repartidor, repartidor => repartidor.pedidos)
   // @JoinColumn({name:'idrepartidor'})
    repartidor: Repartidor;
    
    
}