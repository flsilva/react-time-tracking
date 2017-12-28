export type ArrayReducer<Acc, Value> = (
  acc: Acc,
  value: Value,
  currentIndex: number,
  array: Array<Value>,
) => Acc;
