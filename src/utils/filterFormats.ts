import { groupBy, map, maxBy } from "lodash";

import { TFormat } from "../types/format";
import { TResolution } from "../types/resolution";

export const filterFormats = (inputArray: TFormat[]): TResolution[] => {
  const groupedByResolution = groupBy(
    inputArray,
    (format) => `${format.width}-${format.height}`,
  );
  return map(groupedByResolution, (resolutions) => {
    const format = maxBy(resolutions, "maxFps")!;
    const withHdr = resolutions.find((resolution) => resolution.hdr);
    return {
      ...format,
      supportHdr: {
        maxFps: withHdr ? withHdr.maxFps : 0,
      },
    };
  });
};
