export interface RDV {
    dateHeure : string | null
    service: ServicesRDV 
}

export interface ServiceRDV{
    idService : string
    idEmploye : string | null
}

export type ServicesRDV = ServiceRDV[]