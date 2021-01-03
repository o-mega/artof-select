export const classNames = (
  classes: (string | boolean | undefined | null)[]
): string => {
  return classes.filter((item) => !!item).join(" ");
};
