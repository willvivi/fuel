import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar.component";
import IGasStation from "./models/GasStation";
import {
  getGasStationsByAddress,
  getGasStationsByCoordinates,
} from "./services/GasStationService";
import SearchResults from "./components/SearchResults/SearchResults.component";
import { MainContainer, Title } from "./App.style";
import ISearch, { initialISearch } from "./models/Search";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";

const App: React.FC = () => {
  const [search, setSearch] = useState<ISearch>(initialISearch);
  let timeout: any = null;
  const interval: number = 500;
  const minChars: number = 1;

  const handleSearch = (search: ISearch) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(async () => {
      if (search && search.location.length > 0) {
        getGasStationsByCoordinates(search).then((results: IGasStation[]) => {
          setSearch({ ...search, results: results });
        });
      } else if (
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
        <LocalGasStationIcon />
        &nbsp;Faire de l'essence&nbsp;
        <LocalGasStationIcon />
      </Title>
      <SearchBar onChange={handleSearch}></SearchBar>
      {search.results.length > 0 && <SearchResults results={search.results} />}
    </MainContainer>
  );
};

export default App;
