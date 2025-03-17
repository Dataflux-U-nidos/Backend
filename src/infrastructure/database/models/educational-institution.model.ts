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
    price_range: 'Bajo' | 'Medio' | 'Alto';
    aceptation_difficulty: 'Fácil' | 'Medio' | 'Difícil';
    description: string;
    link: string;
    events: Event[];
}

const EventSchema = new Schema<Event>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
}, { _id: true }); //creeria que esto es correcto

const EducationalInstitutionSchema = new Schema<EducationalInstitution>({
    name: { type: String, required: true },
    location_l: { type: String, required: true },
    price_range: { type: String, enum: ['Bajo', 'Medio', 'Alto'], required: true },
    aceptation_difficulty: { type: String, enum: ['Fácil', 'Medio', 'Difícil'], required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    events: { type: [EventSchema], required: true }, 
});

export const EducationalInstitutionModel = model<EducationalInstitution>('EducationalInstitution', EducationalInstitutionSchema);
