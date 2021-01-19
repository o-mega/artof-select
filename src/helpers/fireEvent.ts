export const fireEvent = (element: HTMLElement, event: string): void => {
  // dispatch for IE

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ieDispatch = (document as any).createEventObject;

  if (ieDispatch) {
    const evt = ieDispatch();
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
