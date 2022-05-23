import { Address } from './Address';

export class User {
  constructor() {
  }
  id: number;
  nom: string;
  prenom: string;
  civilite: string;
  email: string;
  date_de_naissance: string;
  address: Address
}
