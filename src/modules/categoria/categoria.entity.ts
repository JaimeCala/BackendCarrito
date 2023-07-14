import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Producto } from "../producto/producto.entity";
import { ImgCategoria } from "../img-categoria/img-categoria.entity";

@Entity('categoria')
export class Categoria extends BaseEntity{

     @PrimaryGeneratedColumn('increment')
     idcategoria:number;

     @Column({type:'varchar', length:50, nullable:false})
     nombre:string;

     @Column({type:'varchar', default: 'ACTIVO' ,length:10, nullable:false})
     estado:string;


     @CreateDateColumn({type: 'timestamp',  name:'created_at'})
     createdAt: Date;

     @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
     updatedAt: Date;

     @OneToMany(() => Producto, producto => producto.categoria)
     productos: Producto[];
     
     @OneToMany(() => ImgCategoria, imgcategoria => imgcategoria.categoria)
     imgcategorias: ImgCategoria[];
}