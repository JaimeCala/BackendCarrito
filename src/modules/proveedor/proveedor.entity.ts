import { BaseEntity, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Compra } from "../compra/compra.entity";


@Entity('proveedor')
export class Proveedor extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idproveedor: number;

    @Column({type: 'varchar', nullable:false, length:25,})
    nombre: string;

    @Column({type: 'varchar', nullable:false, length:20})
    ci_nit:string;

    @Column({type:'varchar', nullable:false,length:10})
    telefono: string;

    @Column({type: 'varchar', default: 'ACTIVO',nullable: false, length:10})
    estado: string;

    @Column({type: 'varchar', nullable: false, length: 50})
    email: string;

    @Column({type:'varchar', length:100, nullable:false})
    direccion: string;


    @Column({type: 'date', nullable:false})
    fecha: Date;

    @Column({type: 'time', nullable:false})
    hora:Date;

    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @OneToMany(() => Compra , compra => compra.proveedor)
    compra: Compra[];

  

}