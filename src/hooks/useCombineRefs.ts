import type { Ref } from "react";

function useCombineRefs<T extends HTMLElement>(...refs: Ref<T>[]) {
  return (element: T | null) =>
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") ref(element);
      else Object.defineProperty(ref, "current", { value: element });
    });
}

export default useCombineRefs;
