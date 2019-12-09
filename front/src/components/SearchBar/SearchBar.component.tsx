import React, { useState, useEffect } from "react";
import {
  Container,
  AddressFields,
  GeolocationFields,
  StyledTextField,
} from "./SearchBar.style";
import ISearch, { initialISearch } from "../../models/Search";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

interface SearchBarProps {
  onChange: (search: ISearch) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const [search, setSearch] = useState<ISearch>(initialISearch);

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    switch (e.currentTarget.id) {
      case "geolocation":
        navigator.geolocation.getCurrentPosition((position: Position) => {
          setSearch({
            ...initialISearch,
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
  }, [search.address, search.city, search.postcode, search.location]);

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
    </Container>
  );
};

export default SearchBar;
