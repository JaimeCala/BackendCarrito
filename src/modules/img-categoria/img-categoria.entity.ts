import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Categoria } from "../categoria/categoria.entity";

@Entity('imgcategoria')
export class ImgCategoria extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idimgcategoria:number;

    @Column({type:'varchar', length:50, nullable:false})
    nombreimgcategoria:string;

    @Column({type:'varchar', nullable:false})
    linkimgcategoria:string;

    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Categoria, categoria => categoria.imgcategorias)
    @JoinColumn({name:'idcategoria'})
    categoria: Categoria;
    
}