import { Type, Static } from "@sinclair/typebox";

export const EventSchema = Type.Object({
  name: Type.String(),
  descirption: Type.String(),
  date: Type.String({ format: "date-time" }), // ISO 8601
  location: Type.String(),
});

export const EducationalInstitutionSchema = Type.Object({
  name: Type.String(),
  location_l: Type.String(),
  price_range: Type.Union([
    Type.Literal("Bajo"),
    Type.Literal("Medio"),
    Type.Literal("Alto"),
  ]),
  aceptation_difficulty: Type.Union([
    Type.Literal("Fácil"),
    Type.Literal("Medio"),
    Type.Literal("Difícil"),
  ]),
  description: Type.String(),
  link: Type.String({ format: "uri" }),
  events: Type.Array(EventSchema), 
});

export type EducationalInstitutionDto = Static<typeof EducationalInstitutionSchema>;
export type EventDto = Static<typeof EventSchema>;

export const CreateEducationalInstitutionSchema = EducationalInstitutionSchema;
export const UpdateEducationalInstitutionSchema = Type.Partial(EducationalInstitutionSchema);
