export interface IServices {
  service: string[];
}

export interface IFuel {
  nom: string;
  id: number;
  maj: string;
  valeur: number;
}

interface IGeoJSON {
  type: string[];
  coordinates: number[];
}

export interface IGasStation {
  id: string;
  nom?: string;
  marque?: string;
  latitude: string;
  longitude: string;
  location?: IGeoJSON;
  cp: string;
  pop: string;
  adresse: string;
  ville: string;
  services: IServices;
  prix: IFuel[];
}

export default IGasStation;
