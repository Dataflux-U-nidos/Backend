export interface EducationalInstitution {
    _id: string;
    name: string;
    location_l: string;
    price_range: 'Low' | 'Medium' | 'High';
    aceptation_difficulty: 'Low' | 'Medium' | 'High';
    description: string;
    link: string;
    events: string[]; // no se de que seria el array exactamente
}