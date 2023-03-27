import { Button, Grid } from "@mui/material";

import AddTodoFormContainer from "../containers/addTodoForm.container";
import AppInput from "../inputs/app.input";
import AppSelectInput from "../inputs/appSelect.input";

import prioryForAppSelect from "../../utils/prioryForAppSelect";

const AddTodoForm = () => {
  return (
    <AddTodoFormContainer>
      <Grid item xs={12} sm={5.9}>
        <AppInput label="name" variant="filled" fullWidth />
      </Grid>
      <Grid item xs={12} sm={5.9}>
        <AppSelectInput
          options={prioryForAppSelect}
          label="priority"
          formControlProps={{
            variant: "filled",
            fullWidth: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <AppInput label="description" variant="filled" fullWidth />
      </Grid>
      <Button fullWidth variant="contained" size="large">
        Add todo
      </Button>
    </AddTodoFormContainer>
  );
};

export default AddTodoForm;
