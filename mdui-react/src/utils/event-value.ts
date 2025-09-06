export function getValue<T>(evt: Event) {
  const target = evt.target;
  if (target == null) return undefined;

  const entries = Object.entries(target);

  return entries.find((v) => v[0] == "value" || v[0] == "Value")?.[1] as
    | T
    | undefined;
}
