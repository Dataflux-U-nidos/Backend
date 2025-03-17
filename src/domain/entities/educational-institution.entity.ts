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
  price_range: "low" | "medium" | "high";
  aceptation_difficulty: "low" | "medium" | "high";
  description: string;
  link: string;
  events: Event[];
}

export default EducationalInstitution;
