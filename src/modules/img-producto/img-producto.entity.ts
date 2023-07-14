import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Producto } from "../producto/producto.entity";

@Entity('imgproducto')
export class ImgProducto extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idimgproducto:number;

    @Column({type:'varchar', length:50, nullable:false})
    nombreimgprodu:string;

    @Column({type:'varchar', nullable:false})
    linkimgprodu:string;

    /*@Column({type:'varchar', length:100, nullable:true})
    descripcion:string;*/
    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Producto, producto => producto.imgproductos)
    @JoinColumn({name:'idproducto'})
    producto: Producto;
}