import React, { useState, useEffect } from "react";
import {
  Container,
  AddressFields,
  GeolocationFields,
  Separator,
} from "./SearchBar.style";
import ISearch, { initialISearch } from "../../models/Search";

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

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
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
      {search.location.length > 0 && (
        <span style={{ marginBottom: "20px" }}>
          Please reset location before using the address fields
        </span>
      )}
      <AddressFields>
        <input
          type="text"
          id="address"
          placeholder="Street (eg. Avenue Charles de Gaulle)"
          value={search.address}
          onChange={handleChange}
          disabled={search.location.length > 0}
        />
        <input
          type="text"
          id="postcode"
          placeholder="Postcode / Dep (eg. 75001 / 75)"
          value={search.postcode}
          onChange={handleChange}
          disabled={search.location.length > 0}
          alt="salut"
        />
        <input
          type="text"
          id="city"
          placeholder="City (eg. Bordeaux)"
          value={search.city}
          onChange={handleChange}
          disabled={search.location.length > 0}
        />
      </AddressFields>
      <Separator></Separator>
      {search.location.length > 0 && (
        <span style={{ marginTop: "20px" }}>
          Location fetched: {search.location[0]}, {search.location[1]}
        </span>
      )}
      <GeolocationFields>
        <input
          type="button"
          value="Locate me !"
          id="geolocation"
          onClick={handleClick}
        />
        <input
          type="number"
          placeholder="Radius (km)"
          id="radius"
          value={search.radius}
          onChange={handleChange}
        />
        <input type="button" value="Reset" id="reset" onClick={handleClick} />
      </GeolocationFields>
    </Container>
  );
};

export default SearchBar;
