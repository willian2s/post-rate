import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import Post from './Post.model';

@Entity()
export default class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'user_name',
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @Column({
    type: 'float',
    nullable: true,
  })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @ManyToOne(Type => Post, post => post.rating)
  @IsNotEmpty()
  post: Post;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date;
}
