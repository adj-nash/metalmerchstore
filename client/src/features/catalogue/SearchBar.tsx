import { debounce, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/store/Store";
import { setSearchBy } from "./catalogueSlice";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const { searchBy } = useAppSelector((state) => state.catalogue);
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState(searchBy);

  useEffect(() => {
    setTerm(searchBy);
  }, [searchBy]);

  const debounceSearch = debounce((e) => {
    dispatch(setSearchBy(e.target.value));
  }, 500);

  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={term}
      onChange={(e) => {
        setTerm(e.target.value);
        debounceSearch(e);
      }}
    />
  );
}
