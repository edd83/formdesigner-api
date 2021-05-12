import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Section } from './section';
import { Field } from './field';

@Entity()
export class Template extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: String })
  public title: string;

  @OneToMany(() => Section, (section) => section.template)
  public sections: Section[];

  @OneToMany(() => Field, (field) => field.template)
  public fields: Field[];
}
