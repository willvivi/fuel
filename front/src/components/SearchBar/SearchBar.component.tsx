import React, { useState, useEffect } from "react";
import {
  Container,
  AddressFields,
  GeolocationFields,
  StyledTextField,
  SettingsFields,
} from "./SearchBar.style";
import ISearch, {
  initialISearch,
  IToggles,
  initialIToggles,
} from "../../models/Search";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { VariantType, useSnackbar } from "notistack";

import MyLocation from "@mui/icons-material/MyLocation";
import Search from "@mui/icons-material/Search";
import LocalGasStation from "@mui/icons-material/LocalGasStation";

import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography } from "@mui/material";

interface SearchBarProps {
  onChange: (search: ISearch) => void;
  onChangeToggles: (toggles: IToggles) => void;
}

const useStyles = makeStyles({
  root: {
    padding: "10px",
  },
});

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const [search, setSearch] = useState<ISearch>(initialISearch);
  const [toggles, setToggles] = useState<IToggles>(initialIToggles);
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleVariantSnackBar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.id) {
      case "address":
        setSearch({ ...search, location: [], address: e.target.value });
        setToggles({ ...toggles, distance: false });
        break;
      case "postcode":
        setSearch({ ...search, location: [], postcode: e.target.value });
        setToggles({ ...toggles, distance: false });
        break;
      case "city":
        setSearch({ ...search, location: [], city: e.target.value });
        setToggles({ ...toggles, distance: false });
        break;
      case "radius":
        setSearch({
          ...search,
          location: [],
          radius: parseInt(e.target.value, 10),
        });
        break;
      default:
        setSearch(initialISearch);
        break;
    }
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggles({
      ...toggles,
      [e.currentTarget.id]: e.currentTarget.checked,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    switch (e.currentTarget.id) {
      case "geolocation":
        handleVariantSnackBar("Récupération de votre position...", "warning");
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            setSearch({
              ...initialISearch,
              radius: search.radius,
              location: [position.coords.latitude, position.coords.longitude],
            });
            setToggles({ ...toggles, distance: true });
          },
          (error: GeolocationPositionError) => {
            switch (error.code) {
              case 1:
                handleVariantSnackBar(
                  "Vous n'avez pas autorisé la géolocalisation sur votre périphérique",
                  "error"
                );
                break;
              default:
                handleVariantSnackBar(
                  "Erreur inattendue survenue lors de la géolocalisation",
                  "error"
                );
                break;
            }
          }
        );
        break;
      case "reset":
        setSearch(initialISearch);
        setToggles(initialIToggles);
        break;
      default:
        setSearch(initialISearch);
        break;
    }
  };

  const handleTabs = (_: React.ChangeEvent<{}>, newTab: number) => {
    setCurrentTab(newTab);
  };

  useEffect(() => {
    props.onChange(search);
  }, [search.address, search.city, search.postcode, search.location]);

  useEffect(() => {
    props.onChangeToggles(toggles);
  }, [
    toggles.E85,
    toggles.GNV,
    toggles.Gazole,
    toggles.SP95,
    toggles.SP95E10,
    toggles.SP98,
    toggles.distance,
  ]);

  return (
    <Container>
      <Paper className={classes.root}>
        <Tabs
          value={currentTab}
          onChange={handleTabs}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<Search />} label="Recherche" />
          <Tab icon={<MyLocation />} label="Autour" />
          <Tab icon={<LocalGasStation />} label="Carburants" />
        </Tabs>
        {currentTab === 0 && (
          <AddressFields>
            <StyledTextField
              type="text"
              id="postcode"
              label="Département ou CP"
              value={search.postcode}
              onChange={handleChange}
            />
            <StyledTextField
              type="text"
              id="city"
              label="Ville"
              value={search.city}
              onChange={handleChange}
            />
          </AddressFields>
        )}
        {currentTab === 1 && (
          <GeolocationFields>
            <StyledTextField
              type="number"
              label="Distance max. (km)"
              id="radius"
              value={search.radius}
              onChange={handleChange}
            />{" "}
            <Button
              color="primary"
              variant="contained"
              id="geolocation"
              onClick={handleClick}
              size="medium"
            >
              Localisez-moi !
            </Button>
          </GeolocationFields>
        )}
        {currentTab === 2 && (
          <SettingsFields>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={toggles.Gazole}
                    onChange={handleToggle}
                    color="default"
                    style={{ color: "#e8e52e" }}
                    id="Gazole"
                    value="Gazole"
                  />
                }
                label="Gazole"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={toggles.SP95E10}
                    onChange={handleToggle}
                    color="default"
                    style={{ color: "#5cb94b" }}
                    id="SP95E10"
                    value="SP95E10"
                  />
                }
                label="SP95-E10"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={toggles.SP95}
                    color="default"
                    style={{ color: "#214a24" }}
                    onChange={handleToggle}
                    id="SP95"
                    value="SP95"
                  />
                }
                label="SP95"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={toggles.SP98}
                    color="default"
                    style={{ color: "#214a24" }}
                    onChange={handleToggle}
                    id="SP98"
                    value="SP98"
                  />
                }
                label="SP98"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={toggles.GNV}
                    onChange={handleToggle}
                    color="default"
                    style={{ color: "#206a94" }}
                    id="GNV"
                    value="GNV"
                  />
                }
                label="GPL"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={toggles.E85}
                    onChange={handleToggle}
                    color="default"
                    style={{ color: "#4fc0d4" }}
                    id="E85"
                    value="E85"
                  />
                }
                label="Superéthanol E85"
              />
            </FormGroup>
            <Button
              size="large"
              variant="contained"
              id="reset"
              onClick={handleClick}
            >
              Réinitialiser l'application
            </Button>
          </SettingsFields>
        )}
        <Typography variant="caption" display="block" marginTop={"20px"} textAlign={"center"}>Données fournies par <a target={"_blank"} href="https://www.prix-carburants.gouv.fr/">prix-carburants.gouv.fr</a>. Dernière mise à jour : {new Date(Date.now() - (60 * 60 * 1000)).getHours() + 1}h.</Typography>
      </Paper>
    </Container>
  );
};

export default SearchBar;
