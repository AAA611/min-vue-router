export default function createRouteMap(
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap,
  parentRoute
) {
  const pathList = oldPathList || [];

  const pathMap = oldPathMap || Object.create(null);
  const nameMap = oldNameMap || Object.create(null);

  routes.forEach((route) => {
    addRouteRecord(pathList, pathMap, nameMap, route, parentRoute);
  });

  return {
    pathList,
    pathMap,
    nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent) {
  const { path, name, component, props, meta } = route;

  const normalizedPath = n(path, parent);

  const record = {
    name,
    path: normalizedPath,
    component,
    props,
    meta,
    parent
  };

  if (route.children) {
    route.children.forEach((child) => {
      addRouteRecord(pathList, pathMap, nameMap, child, record);
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    }
  }
}

function n(path, parent) {
  if (!parent) {
    return path;
  }

  if (path.startsWith("/")) {
    return path;
  }

  if (parent.path.endsWith("/")) {
    return `${parent.path}${path}`;
  } else {
    return `${parent.path}/${path}`;
  }
}
