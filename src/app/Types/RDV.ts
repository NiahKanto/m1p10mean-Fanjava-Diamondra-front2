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

export interface RDVDataIdUnit {
    _id: string
    dateHeure : Date
    service?: ServicesRDVData 
    etat: number
}

export type RDVDataIdUnits = RDVDataIdUnit[]

export interface RDVData {
    totalRdvs : RDVDataTotals,
    rdvs: RDVDataIdUnits
}

export interface RDVUnit {
    totalRdv : RDVDataTotal,
    rdv: RDVDataUnit
}

export interface RDVID {
    _id : string
}