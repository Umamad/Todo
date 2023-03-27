import { PriorityType } from "../redux/todo/todoSlice";
import { ISelectOption } from "../components/inputs/appSelect.input";

const prioryForAppSelect: ISelectOption[] = (
  Object.keys(PriorityType) as Array<keyof typeof PriorityType>
).map((key) => ({
  label: key,
  value: key,
}));

export default prioryForAppSelect;
