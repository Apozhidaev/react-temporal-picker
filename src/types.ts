/// <reference types="temporal-picker/dist/types" />

export type PickerProps = {
  picker?: "date" | "time" | "datetime" | "month";
  disabled?: boolean;
  readonly?: boolean;
  max?: string;
  min?: string;
  native?: boolean;
  placement?: "bottom-start" | "bottom-end";
  autoApply?: boolean;
  resetButton?: boolean;
  monthSelect?: boolean;
  yearSelect?: boolean;
  className?: string;
  testId?: string;
};
