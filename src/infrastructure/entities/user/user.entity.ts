import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  @Entity('user')
  export class UserEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;
  
    @Column({
      unique: true,
    })
    public phone: string;
  
    @Column({
      unique: true,
    })
    public email: string;
  
    @Column()
    public password: string;
    
    @CreateDateColumn({
      type: 'timestamptz',
    })
    public created: Date;
  
    @Column({
      default: true,
    })
    public isActive: boolean;
}
  