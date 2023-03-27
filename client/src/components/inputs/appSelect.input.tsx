import { useId, FC } from "react";
import {
  styled,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FormControlProps,
  SelectProps,
} from "@mui/material";

export type ISelectOption = {
  label: string;
  value: string | number;
};

interface IAppSelectInputProps {
  options: ISelectOption[];
  label?: string;
  formControlProps?: FormControlProps;
  selectProps?: SelectProps;
}

export const AppFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiInputBase-root svg": {
    color: "#FFF",
    transition: theme.transitions.create("color"),
  },

  "& .Mui-focused svg": {
    color: theme.palette.primary.main,
  },

  "& input": {
    color: "#FFF",
    fontSize: 16,
    caretColor: theme.palette.primary.main,
  },

  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.main,
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },

    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },

  "& .MuiFilledInput-root": {
    "& .MuiSelect-filled": {
      paddingTop: 22,
    },
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },

    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
}));

const AppSelectInput: FC<IAppSelectInputProps> = ({
  options,
  label,
  formControlProps,
  selectProps,
}) => {
  const id = useId();

  return (
    <AppFormControl {...formControlProps}>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <Select id={id} {...selectProps}>
        {options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </AppFormControl>
  );
};

export default AppSelectInput;
