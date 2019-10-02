import mongoose, { Document, Schema } from "mongoose";

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
  ville: JSON, // TODO Solve why it has to be a JSON ?
  services: JSON, // TODO Submodels https://github.com/VictorPichon/gwent-decks/blob/master/api/models/cards.js
  prix: JSON, // TODO Submodels https://github.com/VictorPichon/gwent-decks/blob/master/api/models/cards.js
});

const GasStation = mongoose.model<IGasStation>("GasStation", GasStationSchema);

export default GasStation;
