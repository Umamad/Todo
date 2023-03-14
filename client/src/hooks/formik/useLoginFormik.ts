import { useCallback, FormEvent } from "react";
import { useFormik } from "formik";

import { useAppDispatch } from "../useAppRedux";

import { userLogin, IUserLoginCredentials } from "../../redux/user/userActions";

export default function useLoginFormik() {
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values: IUserLoginCredentials) => {
    const { email, password } = values;
    let errors: any = {};

    if (!email) errors.email = "required";
    if (!password) errors.password = "required";

    return errors;
  };

  const formik = useFormik<IUserLoginCredentials>({
    initialValues,
    validate,
    validateOnMount: true,
    async onSubmit(values, formikHelpers) {
      const result = await dispatch(userLogin(values))
      console.log(values);
      console.log(result);
    },
  });

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  }, []);

  return {
    formik,
    handleSubmit,
  };
}