import React from "react";

interface SearchBarProps {
  onChange: (ville: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <input type="text" placeholder="Type city here" onChange={handleChange} />
  );
};

export default SearchBar;
