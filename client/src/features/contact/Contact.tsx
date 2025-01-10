import { Button, ButtonGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/Store";
import { decrement, increment } from "../../app/store/CounterReducer";

export default function Contact() {
  const { data } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <>
      <h1>Hello</h1>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => dispatch(increment(1))}>Increment</Button>
        <h1>{data}</h1>
        <Button onClick={() => dispatch(decrement(1))}>Decrement</Button>
      </ButtonGroup>
    </>
  );
}
