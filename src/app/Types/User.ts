export interface UserLogin {
    nom : string
    mdp: string
}

export interface UserInscription {
    nom : string
    email : string
    mdp: string
    confirmmdp: string
}

export interface User{
    _id: string
    nom: string
    email: string
}

export type Users = User[]