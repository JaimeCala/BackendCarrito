import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('login')
export class Login extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  idlogin: number;

  @Column({ type: 'varchar', unique: false, nullable: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'date', nullable: true })
  fecha: Date;

  @Column({ type: 'time', nullable: true })
  hora: Date;

  @Column({
    type: 'uuid',
    unique: true,
    name: 'reset_password_token',
    nullable: true,
  })
  resetPasswordToken: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.logins,
  )
  @JoinColumn({ name: 'idusuario' })
  user: User;
}
