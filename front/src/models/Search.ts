export interface IToggles {
  SP95: boolean;
  SP95E10: boolean;
  Gazole: boolean;
  SP98: boolean;
  GNV: boolean;
  E85: boolean;
  distance: boolean;
}
interface ISearch {
  city: string;
  address: string;
  postcode: string;
  location: number[];
  radius: number;
}

export const initialISearch: ISearch = {
  address: "",
  city: "",
  postcode: "",
  location: [],
  radius: 5,
};

export const initialIToggles: IToggles = {
  Gazole: true,
  SP95E10: true,
  SP95: false,
  SP98: false,
  GNV: false,
  E85: false,
  distance: true,
};

export default ISearch;
