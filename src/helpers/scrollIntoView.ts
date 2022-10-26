export const scrollIntoView = (dropdown: HTMLElement): void => {
  const selected = dropdown.querySelectorAll<HTMLElement>(
    ".select__option--selected"
  );

  if (selected.length) {
    scrollToChild(dropdown, selected[0]);
  }
};

export function scrollToChild(parent: HTMLElement, child: HTMLElement): void {
  // Where is the parent on page
  const parentRect = parent.getBoundingClientRect();

  // What can you see?
  const parentViewableArea = {
    height: parent.clientHeight,
    width: parent.clientWidth,
  };

  // Where is the child
  const childRect =
    child.previousElementSibling?.getBoundingClientRect() ||
    child.getBoundingClientRect();

  // Is the child viewable?
  const isViewable =
    childRect.top >= parentRect.top &&
    childRect.top <= parentRect.top + parentViewableArea.height;

  // if you can't see the child try to scroll parent
  if (!isViewable) {
    // scroll by offset relative to parent
    parent.scrollTop = childRect.top + parent.scrollTop - parentRect.top;
  }
}
