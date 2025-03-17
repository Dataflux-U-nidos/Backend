export interface Event {
  name: string;
  description: string;
  date: Date;
  location: string;
}

export interface EducationalInstitution {
  _id: string;
  name: string;
  location_l: string;
  price_range: "LOW" | "MEDIUM" | "HIGH";
  aceptation_difficulty: "LOW" | "MEDIUM" | "HIGH";
  description: string;
  link: string;
  events: Event[];
}

export default EducationalInstitution;
