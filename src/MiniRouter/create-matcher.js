import createRouteMap from "./create-route-map";
import { createRoute } from "./history/base";

export default function createMatcher(routes) {
  // eslint-disable-next-line no-unused-vars
  const { pathList, pathMap, nameMap } = createRouteMap(routes);

  function match(location) {
    const next = typeof location === "string" ? { path: location } : location;
    const { name, path } = next;
    if (name) {
      const record = nameMap[name];
      if (!record) {
        return createRoute(null, next);
      }
      return createRoute(record, next);
    } else if (path) {
      const record = pathMap[path];
      if (!record) {
        return createRoute(null, next);
      }
      return createRoute(record, next);
    }
  }

  return {
    match
  };
}
