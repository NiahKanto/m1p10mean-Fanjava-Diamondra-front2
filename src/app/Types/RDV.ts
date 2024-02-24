export interface RDV {
    dateHeure : string | null
    service: ServicesRDV 
}

export interface ServiceRDV{
    idService : string
    idEmploye : string | null
}

export type ServicesRDV = ServiceRDV[]

export interface ServiceRDVData{
    idService : string
    idEmploye : string | null
    nom: string
    prix: number
    delai: number
    commission: number
    etat: number
}

export type ServicesRDVData = ServiceRDVData[]

export interface RDVDataUnit {
    dateHeure : Date
    service?: ServicesRDVData 
    etat: number
}

export type RDVDataUnits= RDVDataUnit[]

export interface RDVDataTotal {
    totalMontant:number
    totalDuree:number
}

export type RDVDataTotals = RDVDataTotal[]

export interface RDVData {
    totalRdvs : RDVDataTotals,
    rdvs: RDVDataUnits
}

export interface RDVUnit {
    totalRdv : RDVDataTotal,
    rdv: RDVDataUnit
}

export interface RDVID {
    _id : string
}