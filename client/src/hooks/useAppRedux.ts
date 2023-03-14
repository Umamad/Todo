import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

import { AppDispatch, RootState } from "../redux/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
