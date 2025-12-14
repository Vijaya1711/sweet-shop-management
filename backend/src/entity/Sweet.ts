import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity()
  export class Sweet {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ unique: true })
    name!: string;
  
    @Column()
    category!: string;
  
    @Column("decimal", { precision: 10, scale: 2 })
    price!: number;
  
    @Column("int", { default: 0 })
    quantity!: number;
  
    @Column({ nullable: true })
    description?: string;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
    @Column({ nullable: true })
    image?: string;

  }
  