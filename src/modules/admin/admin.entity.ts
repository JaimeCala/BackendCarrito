import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn,  } from "typeorm";
import { User } from "../user/user.entity";

@Entity('admin')
export class Admin extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idadmin:number;

    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    @OneToOne(() => User, user => user.admin)
    @JoinColumn({name:'idusuario'})
    user: User;

}