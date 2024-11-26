import "reflect-metadata";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public nome: string | null;  

  @Column({ type: 'varchar', length: 255, nullable: true })
  public email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public senha: string;
}