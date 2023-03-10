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
  RangePicker as PlainPicker,
  RangePickerOptions as PlainPickerOptions,
} from "temporal-picker";

export type RangePickerInputElement = HTMLInputElement & {
  pickerInstance?: PlainPicker;
};

export type RangePickerOptions = Omit<PlainPickerOptions, "element" | "setup">;

export type RangePickerProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "readOnly" | "value" | "onSelect"
> & {
  options?: RangePickerOptions;
  startDate?: string;
  endDate?: string;
  value?: string;
  onSetup?: (picker: PlainPicker) => void;
  onSelect?: (start: string, end: string) => void;
  onClear?: () => void;
};

const RangePicker = forwardRef(function RangePickerWrapper(
  props: RangePickerProps,
  ref: React.ForwardedRef<RangePickerInputElement>
) {
  const inputRef = useRef<RangePickerInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);
  const {
    startDate,
    endDate,
    options,
    onSelect,
    onClear,
    onSetup,
    ...inputProps
  } = props;
  const { value } = props;

  const handleSelect = useEvent((event) => {
    const { start, end } = event.detail;
    onSelect?.(start, end);
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
      element,
      startDate,
      endDate,
      setup: (picker) => {
        handleSetup(picker);
        picker.on("select", handleSelect);
        picker.on("clear", handleClear);
      },
    });
  }, [options]);

  // update startDate and endDate values
  useEffect(() => {
    const element = inputRef.current;
    if (!element || !element.pickerInstance) {
      return;
    }
    const picker = element.pickerInstance;

    if (options?.strict) {
      if (startDate && endDate) {
        picker.setDateRange(startDate, endDate);
      }
    } else {
      picker.setDateRange(startDate || '', endDate || '');
    }
  }, [startDate, endDate]);

  return createElement("input", {
    ...inputProps,
    ref: inputRef,
    type: "text",
    ...(startDate !== undefined ? { "data-start": startDate } : {}),
    ...(endDate !== undefined ? { "data-end": endDate } : {}),
  });
});

export default memo(RangePicker);
