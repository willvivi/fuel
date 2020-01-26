import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar.component";
import IGasStation from "./models/GasStation";
import {
  getGasStationsByAddress,
  getGasStationsByCoordinates,
} from "./services/GasStationService";
import SearchResults from "./components/SearchResults/SearchResults.component";
import { MainContainer } from "./App.style";
import ISearch, {
  initialISearch,
  IToggles,
  initialIToggles,
} from "./models/Search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
// import MenuIcon from "@material-ui/icons/Menu";

const App: React.FC = () => {
  const [search, setSearch] = useState<ISearch>(initialISearch);
  const [toggles, setToggles] = useState<IToggles>(initialIToggles);
  let timeout: any = null;
  const interval: number = 500;
  const minChars: number = 1;

  const handleToggles = (toggles: IToggles) => {
    setToggles({ ...toggles });
  };

  const handleSearch = (search: ISearch) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (search && search.location.length > 0) {
      getGasStationsByCoordinates(search).then((results: IGasStation[]) => {
        setSearch({ ...search, results: results });
      });
    } else {
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
    }
  };

  return (
    <MainContainer>
      <AppBar style={{ marginBottom: "15px" }} position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <LocalGasStationIcon />
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6">Faire de l'Essence</Typography>
        </Toolbar>
      </AppBar>
      <SearchBar
        onChange={handleSearch}
        onChangeToggles={handleToggles}
      ></SearchBar>
      {search.results.length > 0 && (
        <SearchResults toggles={toggles} results={search.results} />
      )}
    </MainContainer>
  );
};

export default App;
