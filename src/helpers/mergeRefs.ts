export function mergeRefs<T = unknown>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
