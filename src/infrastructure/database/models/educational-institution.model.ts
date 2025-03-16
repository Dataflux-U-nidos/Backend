import {model, Schema, Document} from 'mongoose';

interface EducationalInstitution extends Document {
    name: string;
    location_l: string;
    price_range: 'Low' | 'Medium' | 'High';
    aceptation_difficulty: 'Low' | 'Medium' | 'High';
    description: string;
    link: string;
    events: string[];
}

const EducationalInstitutionSchema = new Schema<EducationalInstitution>({
    name: { type: String, required: true },
    location_l: { type: String, required: true },
    price_range: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    aceptation_difficulty: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    events: { type: [String], required: true },
});

export const EducationalInstitutionModel = model<EducationalInstitution>('EducationalInstitution', EducationalInstitutionSchema);