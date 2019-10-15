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

interface IGeoJSON {
  type: string[];
  coordinates: number[];
}

export interface IGasStation extends Document {
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

const FuelSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  maj: {
    type: Date,
    required: true,
  },
  valeur: {
    type: Number,
    required: true,
  },
});

const GasStationSchema: Schema = new Schema({
  id: Number,
  nom: {
    type: String,
    required: false
  },
  marque: {
    type: String,
    required: false
  },
  latitude: Number,
  longitude: Number,
  location: LocationSchema,
  cp: String,
  pop: String,
  adresse: String,
  ville: JSON, // TODO Solve why it has to be a JSON ?
  services: ServicesSchema,
  prix: [FuelSchema],
});

const GasStation = mongoose.model<IGasStation>("GasStation", GasStationSchema);

export default GasStation;
