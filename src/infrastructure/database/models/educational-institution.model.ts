import { model, Schema, Document } from "mongoose";

interface Event {
  name: string;
  description: string;
  date: Date;
  location: string;
}

interface EducationalInstitution extends Document {
  name: string;
  location_l: string;
  price_range: "low" | "medium" | "high";
  aceptation_difficulty: "easy" | "medium" | "high";
  description: string;
  link: string;
  events: Event[];
}

const EventSchema = new Schema<Event>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
  },
  { _id: true }
); //creeria que esto es correcto

const EducationalInstitutionSchema = new Schema<EducationalInstitution>({
  name: { type: String, required: true },
  location_l: { type: String, required: true },
  price_range: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  aceptation_difficulty: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  description: { type: String, required: true },
  link: { type: String, required: true },
  events: { type: [EventSchema], required: true },
});

export const EducationalInstitutionModel = model<EducationalInstitution>(
  "EducationalInstitutions",
  EducationalInstitutionSchema
);
