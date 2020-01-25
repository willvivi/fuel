import React, { useState, useEffect } from "react";
import {
  Container,
  AddressFields,
  GeolocationFields,
  StyledTextField,
} from "./SearchBar.style";
import ISearch, {
  initialISearch,
  IToggles,
  initialIToggles,
} from "../../models/Search";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

interface SearchBarProps {
  onChange: (search: ISearch) => void;
  onChangeToggles: (toggles: IToggles) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const [search, setSearch] = useState<ISearch>(initialISearch);
  const [toggles, setToggles] = useState<IToggles>(initialIToggles);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.id) {
      case "address":
        setSearch({ ...search, location: [], address: e.target.value });
        break;
      case "postcode":
        setSearch({ ...search, location: [], postcode: e.target.value });
        break;
      case "city":
        setSearch({ ...search, location: [], city: e.target.value });
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
    setToggles({ ...toggles, [e.currentTarget.id]: e.currentTarget.checked });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    switch (e.currentTarget.id) {
      case "geolocation":
        navigator.geolocation.getCurrentPosition((position: Position) => {
          setSearch({
            ...initialISearch,
            radius: search.radius,
            location: [position.coords.latitude, position.coords.longitude],
          });
        });
        break;
      case "reset":
        setSearch(initialISearch);
        break;
      default:
        setSearch(initialISearch);
        break;
    }
  };

  useEffect(() => {
    props.onChange(search);
    props.onChangeToggles(toggles);
  }, [
    search.address,
    search.city,
    search.postcode,
    search.location,
    toggles.E85,
    toggles.GNV,
    toggles.Gazole,
    toggles.SP95,
    toggles.SP95E10,
    toggles.SP98,
  ]);

  return (
    <Container>
      <span>Recherche</span>
      <AddressFields>
        <StyledTextField
          type="text"
          id="postcode"
          label="Code Postal / Dpt"
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
      <Divider />
      <span style={{ marginTop: "10px" }}>Géolocalisation</span>
      <GeolocationFields>
        <Button variant="contained" id="geolocation" onClick={handleClick}>
          Localisez-moi !
        </Button>
        <StyledTextField
          type="number"
          label="Distance max. (km)"
          id="radius"
          value={search.radius}
          onChange={handleChange}
        />
        <Button
          color="secondary"
          variant="contained"
          id="reset"
          onClick={handleClick}
        >
          Réinitialiser
        </Button>{" "}
      </GeolocationFields>
      <Divider />
      <span style={{ marginTop: "10px" }}>Affichage</span>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={toggles.Gazole}
              onChange={handleToggle}
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
              id="E85"
              value="E85"
            />
          }
          label="E85"
        />
      </FormGroup>
    </Container>
  );
};

export default SearchBar;
