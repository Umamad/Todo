import { useMemo } from "react";
import { useFormik } from "formik";

import { useAppSelector, useAppDispatch } from "../useAppRedux";

import { ITodo, PriorityType } from "../../redux/todo/todoSlice";
import { addEditTodo } from "../../redux/todo/todoActions";

export default function useAddTodoFormik() {
  const { focusedData } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  let initialValues: ITodo = useMemo(
    () =>
      focusedData
        ? focusedData.addEditFormInitialData
        : {
            title: "",
            description: "",
            is_done: false,
            priority: PriorityType.medium,
          },
    [focusedData]
  );

  return useFormik({
    initialValues,
    enableReinitialize: true,
    validate(values) {
      let errors: any = {};

      if (!values.title) errors["title"] = "required";
      if (!values.priority) errors["priority"] = "required";

      return errors;
    },
    async onSubmit(values, formikHelpers) {
      const res = await dispatch(addEditTodo(values));
      
      if (res.meta.requestStatus === "fulfilled") {
        formikHelpers.resetForm();
      }
    },
  });
}
