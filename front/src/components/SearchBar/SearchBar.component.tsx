import React, { useState, useEffect } from "react";
import { Container } from "./SearchBar.style";

interface SearchBarState {
  address: string;
  city: string;
  postcode: string;
}
interface SearchBarProps {
  onChange: (search: SearchBarState) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const initialSearchBarState: SearchBarState = {
    address: "",
    city: "",
    postcode: "",
  };

  const [search, setSearch] = useState<SearchBarState>(initialSearchBarState);

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
      default:
        props.onChange(search);
        break;
    }
  };

  useEffect(() => {
    props.onChange(search);
  }, [search.address, search.city, search.postcode]);

  return (
    <Container>
      <input
        type="text"
        id="address"
        placeholder="Street (eg. Avenue Charles de Gaulle)"
        onChange={handleChange}
      />
      <input
        type="text"
        id="postcode"
        placeholder="Postcode (eg. 75001)"
        onChange={handleChange}
      />
      <input
        type="text"
        id="city"
        placeholder="City (eg. Bordeaux)"
        onChange={handleChange}
      />
    </Container>
  );
};

export default SearchBar;
