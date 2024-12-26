import { Review } from 'src/reviews/entities/review.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column({ unique: true, length: 50 })
  Username: string;

  @Column({ length: 255 })
  PasswordHash: string;

  @Column({ unique: true, length: 100 })
  Email: string;

  @Column({ nullable: true, length: 100 })
  FullName?: string;

  @Column({ nullable: true, length: 15 })
  PhoneNumber?: string;

  @Column({ type: 'text', nullable: true })
  Address?: string;

  @Column({ type: 'enum', enum: ['Male', 'Female', 'Other'], nullable: true })
  Gender?: 'Male' | 'Female' | 'Other';

  @Column({ type: 'date', nullable: true })
  DateOfBirth?: Date;

  @Column({ type: 'enum', enum: ['Admin', 'Customer'], default: 'Customer' })
  Role: 'Admin' | 'Customer';

  @CreateDateColumn({ type: 'timestamp' })
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  UpdatedAt: Date;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
