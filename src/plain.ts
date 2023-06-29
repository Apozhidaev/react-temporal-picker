import {
  memo,
  useRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  createElement,
} from "react";
import useEvent from "react-use-event-hook";
import { PickerProps } from "./types";

export type PlainPickerProps = PickerProps & {
  value?: string;
  onChange?: (value?: string) => void;
};

export const PlainPicker = memo(
  forwardRef(function PlainPicker(
    props: PlainPickerProps,
    ref: React.ForwardedRef<HTMLTemporalPickerElement>
  ) {
    const inputRef = useRef<HTMLTemporalPickerElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const {
      picker,
      onChange,
      autoApply,
      monthSelect,
      resetButton,
      yearSelect,
      testId,
      ...inputProps
    } = props;

    const handleValueChange = useEvent((event) => {
      onChange?.(event.detail.value);
    });

    useEffect(() => {
      const element = inputRef.current;
      if (!element) {
        return;
      }

      element.addEventListener("valueChange", handleValueChange);
      return () => {
        element.removeEventListener("valueChange", handleValueChange);
      };
    }, []);

    return createElement("temporal-picker", {
      ...inputProps,
      "auto-apply": autoApply,
      "reset-button": resetButton,
      "month-select": monthSelect,
      "year-select": yearSelect,
      "data-testid": testId,
      type: "plain",
      plain: picker,
      ref: inputRef,
    });
  })
);
