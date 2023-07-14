import { BaseEntity, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { Producto } from "../producto/producto.entity";
import { Proveedor } from "../proveedor/proveedor.entity";


@Entity('compra')
export class Compra extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idcompra: number;

    @Column({type: 'float', nullable:false})
    precio_compra_uni: number;

    @Column({type: 'float', nullable:false})
    precio_compra_total: number;


    @Column({type: 'varchar', nullable:true, length:20})
    tipo_comprobante: string;

    @Column({type:'varchar', nullable:true,length:20})
    num_comprobante: string;

    @Column({ nullable: false})
    cantidad_ingreso: number;

    @Column({type: 'varchar', nullable: true, length: 150})
    observacion: string;


    @Column({type: 'date', nullable:false})
    fecha: Date;

    @Column({type: 'time', nullable:false})
    hora:Date;

    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Proveedor , proveedor => proveedor.compra)
    @JoinColumn({name:'idproveedor'})
    proveedor: Proveedor;

    @ManyToOne(() => Producto, producto => producto.compra)
    @JoinColumn({name:'idproducto'})
    producto: Producto;

}