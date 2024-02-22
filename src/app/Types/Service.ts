export interface Service{
    _id: string
    nom: string
    commission: number
    delai: number
    prix: number
}

export type Services = Service[];
export type Servicee = Service;

export interface ServiceAjout{
    nom: string
    commission: number
    delai: number
    prix: number
}