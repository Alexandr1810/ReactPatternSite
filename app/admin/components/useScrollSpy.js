import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds, offset = 120) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      let current = null;

      for (let id of sectionIds) {
        const el = document.getElementById(id.id);
        if (!el) continue;
        //console.log(id.id)

        const rect = el.getBoundingClientRect();
        //console.log(rect.top, offset)
        //console.log(rect.top <= offset)

        if (rect.top <= offset) {
          current = id.id;
        } else {
          break;
        }
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // сразу при монтировании

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
