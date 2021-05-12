import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinTable, ManyToMany } from 'typeorm';
import { Template } from './template';
import { Section } from './section';

@Entity()
export class Field extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: String })
  public title: string;

  @Column({ type: String })
  public type: string;

  // To retrieve data we need to JSON.PARSE, this data will be stringified
  @Column('simple-json')
  public value: { content: number|string|boolean|string[] };

  @Column({ default: false, type: Boolean })
  public mandatory: boolean;

  @Column({ default: false, type: Boolean })
  public hidding: number;

  @ManyToOne(() => Template, (template) => template.fields)
  public template: Template;

  @ManyToMany(() => Section, (section) => section.fields)
  @JoinTable()
  public sections: Section[];
}
