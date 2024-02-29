export interface Service{
    _id: string
    nom: string
    commission: number
    delai: number
    prix: number
    idEmploye? : string
}

export type Services = Service[];
export type Servicee = Service;

export interface ServiceAjout{
    nom: string
    commission: number
    delai: number
    prix: number
}

export interface serv4rdv{
    idService: string
    nom:string
    delai: number
    prix: number
    commission: number 
    etat:number
    _id: string
}