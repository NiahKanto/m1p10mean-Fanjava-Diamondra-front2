export interface Offre{
    _id: string
    dateDebut: string
    dateFin: string
    nom: string
    description: string
    prixTotal: number
    service: Service4Offre[]
}

export interface Service4Offre{
    idService: string
    nom:string
    delai: number
    prix: number
    commission: number 
    etat:number
}

export type Offres = Offre[]

export interface OffreAjout{
    dateDebut: string
    dateFin: string
    nom: string
    description: string
    reduction: string
    service: string[]
}