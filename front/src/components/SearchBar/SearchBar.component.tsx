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
        setSearch({ ...search, address: e.target.value });
        break;
      case "postcode":
        setSearch({ ...search, postcode: e.target.value });
        break;
      case "city":
        setSearch({ ...search, city: e.target.value });
        break;
      case "radius":
        setSearch({ ...search, radius: parseInt(e.target.value, 10) });
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
            ...search,
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
      <AddressFields>
        <StyledTextField
          type="text"
          id="address"
          label="Street"
          value={search.address}
          onChange={handleChange}
          disabled={search.location.length > 0}
        />
        <StyledTextField
          type="text"
          id="postcode"
          label="Postcode / Dep"
          value={search.postcode}
          onChange={handleChange}
          disabled={search.location.length > 0}
        />
        <StyledTextField
          type="text"
          id="city"
          label="City"
          value={search.city}
          onChange={handleChange}
          disabled={search.location.length > 0}
        />
      </AddressFields>
      <Divider />
      <GeolocationFields>
        <Button variant="contained" id="geolocation" onClick={handleClick}>
          Locate Me !
        </Button>
        <StyledTextField
          type="number"
          label="Radius (km)"
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
          Reset
        </Button>{" "}
      </GeolocationFields>
    </Container>
  );
};

export default SearchBar;
