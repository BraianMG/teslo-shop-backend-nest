import { Product } from '../../products/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    example: '0becc285-6583-4cc5-a8b5-18b934b4cdcd',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'P4ssw0rd',
    description: 'User password',
  })
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    example: 'User admin',
    description: 'User fullname',
    default: null,
  })
  @Column('text')
  fullName: string;

  @ApiProperty({
    example: true,
    description: 'User active',
    default: true,
  })
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    example: ['user', 'admin'],
    description: 'User roles',
    default: ['user'],
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
