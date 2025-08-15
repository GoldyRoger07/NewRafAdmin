// export class Compte{
//     constructor(
//         public idCompte = "",
//         public username = "",
//         public email = "",
//         public nom = "",
//         public prenom = "",
//         public password = "",
//         public createdAt = new Date(),
//         public telephone = "",
//         public urlPhotoProfile = "",
//         public solde = 0,
//         public soldePromo = 0,
//         public codePromo = "",
//         public role = "",
//         public actif = false,
//         public points = 0,
//         public idAgent = "",
//         public idConnection = ","
//     ){}
// }

export interface Compte{
    idCompte?: string;
    username?: string;
    email?: string;
    nom?: string;
    prenom?: string;
    password?: string;
    createdAt?: Date;
    telephone?: string;
    urlPhotoProfile?: string;
    solde?: number;
    soldePromo?: number;
    codePromo?: string;
    role?: string;
    actif?: boolean;
    points?: number;
    idAgent?: string;
    idConnection?: string;
}