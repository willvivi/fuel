import mongoose, { Document, Schema } from "mongoose";

const Fuels: string[] = ["Gazole", "SP95", "E85", "GPLc", "E10", "SP98"];

interface IService {
  Title: string;
}

interface IFuel {
  title?: string;
  id: number;
  price: number;
}

export interface IGasStation extends Document {
  Address: string;
  City: string;
  Services: IService[];
  Fuels: IFuel[];
}

const GasStationSchema: Schema = new Schema({
  Address: String,
  City: String,
  Fuels: JSON,
  Services: JSON,
});

const GasStation = mongoose.model<IGasStation>("GasStation", GasStationSchema);

export default GasStation;
