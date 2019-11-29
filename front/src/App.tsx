import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar.component";
import IGasStation from "./models/GasStation";
import { getGasStationsByAddress } from "./services/GasStationService";
import SearchResults from "./components/SearchComponents/SearchResults.component";
import { MainContainer, Title } from "./App.style";
import ISearch from "./models/Search";

const initialSearch: ISearch = {
  city: "",
  address: "",
  postcode: "",
  results: [],
};

const App: React.FC = () => {
  const [search, setSearch] = useState<ISearch>(initialSearch);
  let timeout: any = null;
  const interval: number = 500;
  const minChars: number = 1;

  const handleSearch = (search: ISearch) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(async () => {
      if (
        search &&
        (search.city.length > minChars ||
          search.postcode.length > minChars ||
          search.address.length > minChars)
      ) {
        getGasStationsByAddress(search).then((results: IGasStation[]) => {
          setSearch({ ...search, results: results });
        });
      } else {
        setSearch({ ...search, results: [] });
      }
    }, interval);
  };

  return (
    <MainContainer>
      <Title>
        <span role="img" aria-label="La pompe :)">
          ⛽
        </span>{" "}
        Fuel{" "}
        <span role="img" aria-label="La pompe :)">
          ⛽
        </span>
      </Title>
      <SearchBar onChange={handleSearch}></SearchBar>
      <SearchResults results={search.results} />
    </MainContainer>
  );
};

export default App;
