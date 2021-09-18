/**
 * A function that emits a side effect and does not return anything.
 */
export type Procedure = (...args: any[]) => void;

export type Options = {
  isImmediate: boolean;
};

export function debounce(
  func,
  waitMilliseconds = 50,
  options: Options = {
    isImmediate: false,
  }
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this, ...args: Parameters<F>) {
    const that = this;

    const doLater = function () {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(that, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(that, args);
    }
  };
}
