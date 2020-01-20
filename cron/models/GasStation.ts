import mongoose, { Document, Schema } from "mongoose";

interface IServices {
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

export interface IGasStation extends Document, IFuels {
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

export interface IGasStationSource extends IGasStation {
  prix: IFuel[] | IFuel;
}

const LocationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const ServicesSchema = new mongoose.Schema({
  service: {
    type: [String],
    required: true,
  },
});

const GasStationSchema: Schema = new Schema<IGasStation>({
  id: Number,
  nom: {
    type: String,
    required: false,
  },
  marque: {
    type: String,
    required: false,
  },
  latitude: Number,
  longitude: Number,
  location: LocationSchema,
  cp: String,
  pop: String,
  adresse: String,
  ville: JSON,
  services: ServicesSchema,
  gnv: {
    type: Number,
    required: false,
  },
  sp95E10: {
    type: Number,
    required: false,
  },
  sp95: {
    type: Number,
    required: false,
  },
  sp98: {
    type: Number,
    required: false,
  },
  e85: {
    type: Number,
    required: false,
  },
  gazole: {
    type: Number,
    required: false,
  },
});

const GasStation = mongoose.model<IGasStation>("GasStation", GasStationSchema);

export default GasStation;