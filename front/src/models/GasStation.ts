export interface IServices {
  service: string[];
}

export interface IFuels {
  gnv: number;
  sp95E10: number;
  sp95: number;
  sp98: number;
  e85: number;
  gazole: number;
}

interface IGeoJSON {
  type: string[];
  coordinates: number[];
}

export interface IGasStation extends IFuels {
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
}

export default IGasStation;
