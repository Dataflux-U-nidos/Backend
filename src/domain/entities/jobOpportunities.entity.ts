
export interface JobOpportunities {
    id: string // en mongo se pone _id
    name: string
    description: string
    jobs: string[] //lista de carreras de esa oportunidad laboral
    salary: number
}

export default JobOpportunities;