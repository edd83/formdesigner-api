import Joi from 'joi';

const TemplateDetails = Joi.object()
  .keys({
    title: Joi.string()
      .required()
  });

const SectionDetails = Joi.object()
  .keys({
    fields: Joi.array()
      .optional(),
    hidding: Joi.boolean()
      .required(),
    parentId: Joi.number()
      .optional(),
    template: Joi.number()
      .optional(),
    title: Joi.string()
      .required()
  });

const FieldDetails = Joi.object()
  .keys({
    hidding: Joi.boolean()
      .required(),
    mandatory: Joi.array()
      .required(),
    template: Joi.number()
      .optional(),
    title: Joi.string()
      .required(),
    type: Joi.string()
      .required(),
    value: Joi.alternatives(Joi.string(), Joi.array(), Joi.boolean(), Joi.number())
      .required()
  });

export const Schemas = {
  FieldDetails,
  SectionDetails,
  TemplateDetails
};
