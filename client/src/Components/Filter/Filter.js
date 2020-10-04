import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../style.css";

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

function Filtetr({
  sort,
  handleSort,
  setCategory,
  setPriceRange,
  setLtORgt,
  ltORgt,
  handlePriceRange,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          <h6>Sort By</h6>
          <FormControlLabel
            control={
              <Checkbox
                checked={sort.includes("name") ? true : false}
                value="name"
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Name"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sort.includes("price") ? true : false}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                value="price"
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Price"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sort.includes("averageRating") ? true : false}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                value="averageRating"
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Rating"
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="Shirt">T-shirt</MenuItem>
              <MenuItem value="Pants">Pant</MenuItem>
              <MenuItem value="Vest">Vest</MenuItem>
            </Select>
          </FormControl>
          <div className="mt-4 mb-4">
            <TextField
              autoComplete="priceRange"
              name="priceRange"
              variant="outlined"
              type="text"
              required
              id="priceRange"
              placeholder="Price Range"
              label="Price Range"
              onChange={(e) => setPriceRange(e.target.value)}
            />{" "}
            <FormControlLabel
              control={
                <Checkbox
                  checked={ltORgt === "lt" ? true : false}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  value="lt"
                  onChange={(e) => setLtORgt(e.target.value)}
                />
              }
              label="Less than"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ltORgt === "gt" ? true : false}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  value="gt"
                  onChange={(e) => setLtORgt(e.target.value)}
                />
              }
              label="Greater than"
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePriceRange}
            >
              Filter
            </Button>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
export default Filtetr;
