import { Type, Static } from "@sinclair/typebox";

export const MajorSchema = Type.Object({
  name: Type.String(),
  institutionId: Type.String({ pattern: "^[0-9a-fA-F]{24}$" }),
  difficulty: Type.Union([
    Type.Literal("low"),
    Type.Literal("medium"),
    Type.Literal("high"),
  ]),
  price: Type.Number(),
  description: Type.String(),
  pensumLink: Type.String({ format: "uri" }),
  jobId: Type.String({ pattern: "^[0-9a-fA-F]{24}$" }),
  focus: Type.String(),
});

export type MajorDto = Static<typeof MajorSchema>;

export const CreateMajorSchema = MajorSchema;
export const UpdateMajorSchema = Type.Partial(MajorSchema);
