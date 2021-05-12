import { Tree, TreeChildren, TreeParent, Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, ManyToMany } from 'typeorm';
import { Template } from './template';
import { Field } from './field';

@Entity()
@Tree('closure-table')
export class Section extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: String })
  public title: string;

  @Column({ default: false, type: Boolean })
  public hidding: boolean;

  @ManyToOne(() => Template, (template) => template.sections)
  public template: Template;

  @ManyToMany(() => Field, (field) => field.sections)
  public fields: Field[];

  @TreeChildren()
  public children: Section[];

  @TreeParent()
  public parent: Section;
}
