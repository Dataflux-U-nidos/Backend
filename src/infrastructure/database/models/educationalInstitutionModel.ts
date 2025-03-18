import { model, Schema, Document } from 'mongoose';

interface Event {
  name: string;
  description: string;
  date: Date;
  location: string;
}

interface EducationalInstitution extends Document {
  name: string;
  location_l: string;
  price_range: 'LOW' | 'MEDIUM' | 'HIGH';
  aceptation_difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  description: string;
  link: string;
  events: Event[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<Event>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
  },
  { _id: true },
); 

const EducationalInstitutionSchema = new Schema<EducationalInstitution>(
  {
    name: { type: String, required: true },
    location_l: { type: String, required: true },
    price_range: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      required: true,
    },
    aceptation_difficulty: {
      type: String,
      enum: ['EASY', 'MEDIUM', 'HARD'],
      required: true,
    },
    description: { type: String, required: true },
    link: { type: String, required: true },
    events: { type: [EventSchema], required: true },
  },
  { 
    timestamps: true 
  },
);

export const EducationalInstitutionModel = model<EducationalInstitution>('EducationalInstitutions',EducationalInstitutionSchema);
