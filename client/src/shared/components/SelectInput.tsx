import { TextField  } from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";


type Props<T extends FieldValues> = {
    name: keyof T,
    Items: string[]
} & UseControllerProps<T> & SelectInputProps;

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
   
const {fieldState, field} = useController({...props});

  return (

  )
}