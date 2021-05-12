import { getConnection } from 'typeorm';
import { Field } from '../entities/field';
import { Section } from '../entities/section';

// For template
export async function getSectionsComponent(ids: number[]): Promise<Section[]> {
  return await getConnection()
    .createQueryBuilder(Section, 'section')
    .where('section.id IN (:...ids)', { ids })
    .getMany();
}

// For section & template
export async function getFieldsComponent(ids: number[]): Promise<Field[]> {
  return await getConnection()
    .createQueryBuilder(Field, 'field')
    .where('field.id IN (:...ids)', { ids })
    .getMany();
}

export async function getFieldsSectionId(id: number): Promise<Field[]> {
  return await getConnection()
    .createQueryBuilder(Field, 'field')
    .select('id')
    .addSelect('title')
    .addSelect('hidding')
    .addSelect('value')
    .addSelect('type')
    .addSelect('mandatory')
    .innerJoin('field_sections_section', 'fss', 'fss.fieldId = field.id')
    .where('fss.sectionId = :id', { id })
    .getRawMany();
}

export async function getSectionChildren(parent: Section): Promise<Section> {
  await getConnection()
    .createQueryBuilder(Section, 'section')
    .where('section.parent = :id', { id: parent.id })
    .getMany();
  return await getConnection()
    .getTreeRepository(Section)
    .findDescendantsTree(parent);
}

// For section tree
// export async function get(): Promise<Section> {

// }
