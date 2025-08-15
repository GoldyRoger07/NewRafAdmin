import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  errors = [
    "no-error",
    "Montant insuffisant",
    "Vous avez atteint votre limite de retrait pour aujourd'hui !",
    "Votre solde est insuffisant",
    "Vous avez deja un code promo",
    "Une erreur inconnu est survenu",
    "Mode agent deja activer",
    "Impossible de participer aux quiz en tant qu'agent",
    "Cette opsyon est indisponible pour les agents",
    "Vous avez deja la quantite de tickets maximal"
  ]

  NO_ERROR = 0
  MIN_RETRAIT_ERROR = 1
  MAX_RETRAIT_ERROR = 2
  NOT_ENOUGH_MONEY_ERROR = 3
  CODE_PROMO_ALREADY_DEFINE = 4 
  NULL_ERROR = 5
  AGENT_ERROR = 7
  AGENT_RETRAIT_ERROR = 8

  
}
