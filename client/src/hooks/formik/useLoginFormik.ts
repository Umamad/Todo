import { useCallback, FormEvent } from "react";
import { useFormik } from "formik";

import { useAppDispatch, useAppSelector } from "../useAppRedux";

import { userLogin, IUserLoginCredentials } from "../../redux/user/userActions";

export default function useLoginFormik() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

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
    validateOnMount: false,
    async onSubmit(values) {
      await dispatch(userLogin(values));
    },
  });

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    formik,
    handleSubmit,
    loading,
  };
}
