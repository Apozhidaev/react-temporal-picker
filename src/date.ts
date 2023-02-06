import {
  memo,
  useRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  InputHTMLAttributes,
  createElement,
} from "react";
import useEvent from "react-use-event-hook";
import {
  DatePicker as PlainPicker,
  DatePickerOptions as PlainPickerOptions,
} from "temporal-picker";

export type DatePickerInputElement = HTMLInputElement & {
  pickerInstance?: PlainPicker;
};

export type DatePickerOptions = Omit<
  PlainPickerOptions,
  "element" | "date" | "setup"
>;

export type DatePickerProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "readOnly" | "value" | "onSelect"
> & {
  options?: DatePickerOptions;
  date?: string;
  value?: string;
  onSetup?: (picker: PlainPicker) => void;
  onSelect?: (date: string) => void;
  onClear?: () => void;
};

const DatePicker = forwardRef(function DatePickerWrapper(
  props: DatePickerProps,
  ref: React.ForwardedRef<DatePickerInputElement>
) {
  const inputRef = useRef<DatePickerInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);
  const { date, options, onSelect, onClear, onSetup, ...inputProps } = props;
  const { value } = props;

  const handleSelect = useEvent((event) => {
    onSelect?.(event.detail.date);
  });
  const handleClear = useEvent(() => {
    onClear?.();
  });
  const handleSetup = useEvent((picker) => {
    onSetup?.(picker);
  });

  // update options
  useEffect(() => {
    const element = inputRef.current;
    if (!element) {
      return;
    }

    if (element.pickerInstance) {
      element.pickerInstance.destroy();
      if (value === undefined) {
        element.value = "";
      }
    }
    element.pickerInstance = new PlainPicker({
      ...options,
      date,
      element,
      setup: (picker) => {
        handleSetup(picker);
        picker.on("select", handleSelect);
        picker.on("clear", handleClear);
      },
    });
  }, [options]);

  // update date value
  useEffect(() => {
    const element = inputRef.current;
    if (!element || !element.pickerInstance) {
      return;
    }

    const picker = element.pickerInstance;

    if (!date) {
      if (picker.getDate()) {
        picker.clear();
      }
      return;
    }

    picker.setDate(date);
  }, [date]);

  return createElement("input", {
    ...inputProps,
    ref: inputRef,
    type: "text",
    ...(date !== undefined ? { "data-value": date } : {}),
  });
});

export default memo(DatePicker);
