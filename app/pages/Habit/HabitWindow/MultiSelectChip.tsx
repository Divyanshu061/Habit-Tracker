import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useGlobalProvide } from "@/app/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  selectedArea: readonly string[],
  theme: Theme
) {
  return {
    fontWeight: selectedArea.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChip({
  onChange,
}: {
  onChange: (selectedItem: any) => void;
}) {
  const theme = useTheme();
  const { allAreaObject } = useGlobalProvide();
  const { allArea } = allAreaObject;
  const [selectedArea, setSelectArea] = React.useState<string[]>([]);
  const [selectAreaItem, setSelectAreaItem] = React.useState<any>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedArea>) => {
    const {
      target: { value },
    } = event;
    setSelectArea(typeof value === "string" ? value.split(",") : value);
  };

  const filterArea = allArea.filter((area) => area.name != "All");

  React.useEffect(() => {
    const selectObj = selectedArea.map((selectArea) => {
      return allArea.find((area) => area.name === selectArea);
    });
    setSelectAreaItem(selectObj);
  }, [selectedArea]);

  React.useEffect(() => {
    onChange(selectAreaItem);
  }, [selectAreaItem]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Choose Area</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedArea}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Choose area ...." />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filterArea.map((area) => (
            <MenuItem
              key={area.id}
              value={area.name}
              style={getStyles(area.name, selectedArea, theme)}
            >
              <FontAwesomeIcon icon={area.icon} />
              {area.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
