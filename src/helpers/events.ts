export const focusNext = (): void => {
  if (document.activeElement) {
    const focussable = Array.prototype.filter.call(
      document.querySelectorAll<HTMLElement>('[tabindex]:not([tabindex="-1"])'),
      (element) => {
        //check for visibility while always include the current activeElement
        return (
          element.offsetWidth > 0 ||
          element.offsetHeight > 0 ||
          element === document.activeElement
        );
      }
    );

    const currentIndex = focussable.indexOf(document.activeElement);

    if (currentIndex > -1) {
      const next = focussable[currentIndex + 1] || focussable[0];
      next.focus();
    }
  }
};

export const focusPrev = (): void => {
  if (document.activeElement) {
    const focussable = Array.prototype.filter.call(
      document.querySelectorAll<HTMLElement>('[tabindex]:not([tabindex="-1"])'),
      (element) => {
        //check for visibility while always include the current activeElement
        return (
          element.offsetWidth > 0 ||
          element.offsetHeight > 0 ||
          element === document.activeElement
        );
      }
    );

    const currentIndex = focussable.indexOf(document.activeElement);

    if (currentIndex > -1) {
      const prev = focussable[currentIndex - 1] || focussable[0];
      prev.focus();
    }
  }
};
