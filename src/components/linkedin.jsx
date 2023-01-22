import React, { useMemo } from "react";

export function Linkedin({ data }) {
  const users = useMemo(() => {
    if (!d) {
      return null;
    }

    const d = data.webData;
  }, [data.webData]);
  return <div>Linkedin</div>;
}
