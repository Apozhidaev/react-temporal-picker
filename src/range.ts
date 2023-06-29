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

export type PresetItem = {
  label: string;
  start?: string;
  end?: string;
};

export type RangePickerProps = PickerProps & {
  start?: string;
  end?: string;
  onChange?: (start?: string, end?: string) => void;
  presets?: PresetItem[];
};

export const RangePicker = memo(
  forwardRef(function RangePickerWrapper(
    props: RangePickerProps,
    ref: React.ForwardedRef<HTMLTemporalPickerElement>
  ) {
    const inputRef = useRef<HTMLTemporalPickerElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);
    const {
      picker,
      presets,
      onChange,
      autoApply,
      monthSelect,
      resetButton,
      yearSelect,
      testId,
      ...inputProps
    } = props;

    const handleRangeChange = useEvent((event) => {
      const { start, end } = event.detail;
      onChange?.(start, end);
    });

    useEffect(() => {
      const element = inputRef.current;
      if (!element) {
        return;
      }

      element.addEventListener("rangeChange", handleRangeChange);
      return () => {
        element.removeEventListener("rangeChange", handleRangeChange);
      };
    }, []);

    return createElement(
      "temporal-picker",
      {
        ...inputProps,
        "auto-apply": autoApply,
        "reset-button": resetButton,
        "month-select": monthSelect,
        "year-select": yearSelect,
        "data-testid": testId,
        type: "range",
        plain: picker,
        ref: inputRef,
      },
      ...(presets || []).map((preset) =>
        createElement("temporal-preset", { ...preset, key: preset.label })
      )
    );
  })
);
