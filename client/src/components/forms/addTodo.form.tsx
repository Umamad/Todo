import { Button, Grid } from "@mui/material";

import useAddTodoFormik from "../../hooks/formik/useAddTodoFormik";

import AddTodoFormContainer from "../containers/addTodoForm.container";
import AppInput from "../inputs/app.input";
import AppSelectInput from "../inputs/appSelect.input";

import prioryForAppSelect from "../../utils/prioryForAppSelect";

const AddTodoForm = () => {
  const formik = useAddTodoFormik();

  return (
    <AddTodoFormContainer>
      <Grid item xs={12} sm={5.9}>
        <AppInput
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={!!formik.errors.title}
          variant="filled"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={5.9}>
        <AppSelectInput
          label="Priority"
          options={prioryForAppSelect}
          formControlProps={{
            variant: "filled",
            fullWidth: true,
            error: !!formik.errors.priority
          }}
          selectProps={{
            value: formik.values.priority,
            name: "priority",
            onChange: formik.handleChange,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <AppInput
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          variant="filled"
          fullWidth
        />
      </Grid>
      <Button
        onClick={() => formik.handleSubmit()}
        fullWidth
        variant="contained"
        size="large"
      >
        Add todo
      </Button>
    </AddTodoFormContainer>
  );
};

export default AddTodoForm;
