import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Modulo } from "../modulo/modulo.entity";
import { RolOperacion } from "../rol-operacion/rol-operacion.entity";

@Entity('operacion')
export class Operacion extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idoperacion:number;

    @Column({type:'varchar', length:25, nullable:false})
    nombreoperacion:string;

    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Modulo, modulo => modulo.operacions)
    @JoinColumn({name:'idmodulo'})
    modulos: Modulo;

    @OneToMany(() => RolOperacion, roloperacion => roloperacion.operacions  )
    roloperacions: RolOperacion[];

}