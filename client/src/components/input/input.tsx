import { IMaskInput } from "react-imask";
import { InputBase } from "@mantine/core";

type InputProps = {
  label?: string;
  placeholder?: string;
  withAsterisk?: boolean;
  mask?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input(props: InputProps) {
  return <InputBase component={IMaskInput} {...props} />;
}
