export const fireEvent = (element: HTMLSelectElement, event: string): void => {
  // dispatch for IE
  if (document.createEventObject) {
    const evt = document.createEventObject();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (element as any).fireEvent("on" + event, evt);
  }

  // dispatch for firefox + others
  else {
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true); // event type,bubbling,cancelable

    !element.dispatchEvent(evt);
  }
};
