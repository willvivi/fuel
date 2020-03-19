import mongoose, { Document, Schema } from "mongoose";

interface IServices {
  service: string[];
}

export interface ILastUpdateFuels {
  gnv: string;
  sp95E10: string;
  sp95: string;
  sp98: string;
  e85: string;
  gazole: string;
}

export interface IFuels {
  gnv: number;
  sp95E10: number;
  sp95: number;
  sp98: number;
  e85: number;
  gazole: number;
  lastUpdate: ILastUpdateFuels;
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

const LastUpdateFuelsSchema = new mongoose.Schema({
  gnv: {
    type: Date,
    required: false,
  },
  sp95E10: {
    type: Date,
    required: false,
  },
  sp95: {
    type: Date,
    required: false,
  },
  sp98: {
    type: Date,
    required: false,
  },
  e85: {
    type: Date,
    required: false,
  },
  gazole: {
    type: Date,
    required: false,
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
  lastUpdate: LastUpdateFuelsSchema,
});

GasStationSchema.index({ location: "2dsphere" });

const GasStation = mongoose.model<IGasStation>("GasStation", GasStationSchema);

export default GasStation;
