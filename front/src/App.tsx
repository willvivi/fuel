import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar.component";
import IGasStation from "./models/GasStation";
import {
  getGasStationsByAddress,
  getGasStationsByCoordinates,
} from "./services/GasStationService";
import SearchResults from "./components/SearchResults/SearchResults.component";
import { MainContainer } from "./App.style";
import ISearch, { IToggles, initialIToggles } from "./models/Search";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { VariantType, useSnackbar } from "notistack";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const App: React.FC = () => {
  const [results, setResults] = useState<IGasStation[]>([]);
  const [toggles, setToggles] = useState<IToggles>(initialIToggles);
  const [timeoutObj, setTimeoutObj] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();

  let timeout: any = null;
  const interval: number = 500;
  const minChars: number = 1;

  const theme = createTheme();

  const handleVariantSnackBar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    handleVariantSnackBar("Bienvenue sur Faire de l'Essence !", "info");
  }, []);

  const handleToggles = (toggles: IToggles) => {
    setToggles({ ...toggles });
  };

  const handleSearch = (search: ISearch) => {
    if (timeoutObj > 0) {
      clearTimeout(timeoutObj);
    }
    if (search && search.location.length > 0) {
      getGasStationsByCoordinates(search)
        .then((results: IGasStation[]) => {
          handleVariantSnackBar("Résultats mis à jour", "success");
          setResults(results);
        })
        .catch(() => {
          handleVariantSnackBar(
            "Erreur inattendue lors du chargement des résultats",
            "error"
          );
        });
    } else {
      timeout = setTimeout(async () => {
        if (
          search &&
          (search.city.length > minChars ||
            search.postcode.length > minChars ||
            search.address.length > minChars)
        ) {
          handleVariantSnackBar("Chargement...", "warning");

          getGasStationsByAddress(search)
            .then((results: IGasStation[]) => {
              handleVariantSnackBar("Résultats mis à jour", "success");
              setResults(results);
            })
            .catch(() => {
              handleVariantSnackBar(
                "Erreur inattendue lors du chargement des résultats",
                "error"
              );
            });
        } else {
          setResults([]);
        }
      }, interval);
      setTimeoutObj(timeout);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <AppBar style={{ marginBottom: "15px" }} position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <LocalGasStationIcon />
            </IconButton>
            <Typography variant="h6">Faire de l'Essence</Typography>
          </Toolbar>
        </AppBar>
        <SearchBar
          onChange={handleSearch}
          onChangeToggles={handleToggles}
        ></SearchBar>
        {results.length > 0 && (
          <SearchResults toggles={toggles} results={results} />
        )}
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
