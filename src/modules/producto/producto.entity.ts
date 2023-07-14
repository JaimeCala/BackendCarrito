import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Double, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { PedidoProducto } from "../pedido-produ/pedido-produ.entity";
import { UnidadProducto } from "../unidad-produc/unidad-produc.entity";
import { ImgProducto } from "../img-producto/img-producto.entity";
import { Categoria } from "../categoria/categoria.entity";
import { Compra } from "../compra/compra.entity";


@Entity('producto')
export class Producto extends  BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idproducto:number;

    @Column({type:'varchar', length:100, unique:true, nullable:false})
    nombre:string;

    @Column({type:'varchar', length:100})
    descripcion:string;

    @Column({nullable:false})
    stock:number;

    @Column()
    minimo:number;

    @Column({nullable: true})
    maximo:number;

    @Column({type:'varchar', nullable: true})
    vencimiento:string;

    @Column({type:'float', nullable:false})
    precio:number;

    @Column({type:'varchar', length:15,nullable:true})
    disponible:string;

    @Column({type:'varchar',default:'ACTIVO', length:10, nullable:false})
    estado: string;


    @Column({type:'float',nullable:true})
    peso:number;

    @Column({type:'date',nullable:true})
    fecha:Date;

    @Column({type: 'varchar', default: 'NO', length:3, nullable:true})
    oferta: string;
    
    @Column({type: 'float' , default: 0.0 , nullable:true})
    porcentaje: number;

    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @OneToMany(() => PedidoProducto, pedidoproducto => pedidoproducto.producto)
    pedidoproductos: PedidoProducto[];

    @OneToMany(() => UnidadProducto, unidadproducto => unidadproducto.producto)
    unidadproductos: UnidadProducto[];

    @OneToMany(() => ImgProducto, imgproducto => imgproducto.producto)
    imgproductos: ImgProducto[];

    @ManyToOne(() => Categoria, categoria => categoria.productos)
    @JoinColumn({name:'idcategoria'})
    categoria: Categoria;

    @OneToMany(() => Compra, compra => compra.producto)
    compra: Compra[];

    

}