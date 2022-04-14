import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";

@Entity("Users")
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;
}

@Entity("Patient")
export class PatientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({type: "bigint"})
  securitySocialNumber: number;

  @OneToOne(()=> UserEntity )
  @JoinColumn()
  User: string;
}

@Entity("Practitioner")
export class practitionerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({type: "bigint"})
  cps: number;

  @OneToOne(()=> UserEntity)
  @JoinColumn()
  User : string;
}
