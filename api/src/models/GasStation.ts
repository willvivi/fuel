import mongoose, { Document, Schema } from "mongoose";

export const Fuels: string[] = ["Gazole", "SP95", "E85", "GPLc", "E10", "SP98"];

interface IServices {
  service: string[];
}

interface IFuel {
  nom: string;
  id: number;
  maj: string;
  valeur: number;
}

export interface IGasStation extends Document {
  id: string;
  latitude: string;
  longitude: string;
  cp: string;
  pop: string;
  adresse: string;
  ville: string;
  services: IServices;
  prix: IFuel[];
}

const GasStationSchema: Schema = new Schema({
  id: String,
  latitude: String,
  longitude: String,
  cp: String,
  pop: String,
  adresse: String,
  ville: String,
  services: JSON,
  prix: JSON,
});

const GasStation = mongoose.model<IGasStation>("GasStation", GasStationSchema);

export default GasStation;
