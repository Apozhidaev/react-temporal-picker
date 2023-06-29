import { defineCustomElements } from "temporal-picker";
import { PlainPicker } from "./plain";

defineCustomElements();

export * from "./plain";
export * from "./range";

export default PlainPicker;
