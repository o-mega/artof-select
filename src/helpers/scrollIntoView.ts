export const scrollIntoView = (dropdown: HTMLDivElement): void => {
  const selected = dropdown.querySelectorAll(".artof_select-option--selected");

  if (selected.length) {
    selected[0].scrollIntoView({
      block: "center",
      behavior: "auto",
      inline: "start",
    });
  }
};
