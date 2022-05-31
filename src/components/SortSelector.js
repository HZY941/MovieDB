import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

export default function SortSelector({ onChange }) {
  return (
    <FormControl onChange={onChange}>
      <InputLabel variant="standard" htmlFor="sort-selector">
        Category
      </InputLabel>
      <NativeSelect
        defaultValue={"Now Playing"}
        onChange={onChange}
        inputProps={{
          name: "sortType",
          id: "sort-selector",
        }}
      >
        <option value={"now_playing"}>Now Playing</option>
        <option value={"popular"}>Popular</option>
        <option value={"top_rated"}>Top Rated</option>
        <option value={"upcoming"}>Upcoming</option>
      </NativeSelect>
    </FormControl>
  );
}
