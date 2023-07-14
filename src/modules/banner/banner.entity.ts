import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('banners')
export class Banner extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idbanner: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    nombreimgbanner: string;

    @Column({type: 'varchar', nullable: false})
    linkimgbanner: string;
    
    @Column({type:'varchar',default:'ACTIVO', length:10, nullable:true})
    estado: string;

    @CreateDateColumn({type: 'timestamp',  name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp',  name:'updated_at'})
    updatedAt: Date;

    

}
