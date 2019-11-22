import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar.component";
import IGasStation from "./models/GasStation";
import { getGasStationsByCity } from "./services/GasStationService";
import SearchResults from "./components/SearchComponents/SearchResults.component";
import { MainContainer, Header, Title } from "./App.style";

interface ISearchState {
  city: string;
  results: IGasStation[];
}

const initialSearch: ISearchState = {
  city: "",
  results: [],
};

const App: React.FC = () => {
  const [search, setSearch] = useState<ISearchState>(initialSearch);
  let timeout: any = null;
  const interval: number = 500;

  const handleSearch = (city: string) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(async () => {
      if (city && city.length > 2) {
        getGasStationsByCity(city).then((results: IGasStation[]) => {
          setSearch({ city: search.city, results });
        });
      } else {
        setSearch({ city: search.city, results: [] });
      }
    }, interval);
  };

  return (
    <MainContainer>
      <Title>⛽ Fuel ⛽</Title>
      <Header>
        <SearchBar onChange={handleSearch}></SearchBar>
      </Header>
      <SearchResults results={search.results} />
    </MainContainer>
  );
};

export default App;
