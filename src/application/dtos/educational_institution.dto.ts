import { Type, Static } from "@sinclair/typebox";

export const EducationalInstitutionSchema = Type.Object({
  name: Type.String(),
  location_l: Type.String(),
  price_range: Type.Union([
    Type.Literal("Low"),
    Type.Literal("Medium"),
    Type.Literal("High"),
  ]),
  aceptation_difficulty: Type.Union([
    Type.Literal("Low"),
    Type.Literal("Medium"),
    Type.Literal("High"),
  ]),
  description: Type.String(),
  link: Type.String({ format: "uri" }),
  events: Type.Array(Type.String()), 
});


export type EducationalInstitutionDto = Static<typeof EducationalInstitutionSchema>;

export const CreateEducationalInstitutionSchema = EducationalInstitutionSchema;
export const UpdateEducationalInstitutionSchema = Type.Partial(EducationalInstitutionSchema);