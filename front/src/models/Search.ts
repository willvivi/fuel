import IGasStation from "../models/GasStation";

interface ISearch {
  city: string;
  address: string;
  postcode: string;
  location: number[];
  radius: number;
  results?: IGasStation[];
}

export const initialISearch: ISearch = {
  address: "",
  city: "",
  postcode: "",
  location: [],
  radius: 5,
};

export default ISearch;
