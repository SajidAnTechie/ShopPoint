import React from "react";
import {
  Select,
  InputLabel,
  FormControl,
  makeStyles,
  MenuItem,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Print = ({ printAs }) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Print</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        onChange={(e) => printAs(e)}
        label="Print"
        autoWidth
      >
        <MenuItem value="pdf">Print as pdf</MenuItem>
        <MenuItem value="excel">Print as excel</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Print;
