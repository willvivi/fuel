import IGasStation from "../models/GasStation";

interface ISearch {
  city: string;
  address: string;
  postcode: string;
  results?: IGasStation[];
}

export default ISearch;
