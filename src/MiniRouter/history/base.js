export function createRoute(record, location) {
  const matched = [];

  if (record) {
    while (record) {
      matched.unshift(record);
      record = record.parent;
    }
  }

  return {
    matched,
    ...location
  };
}

export class BaseHistory {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, { path: "/" });
  }

  transitionTo(location, onComplete) {
    const route = this.router.matcher.match(location);

    if (
      this.current.path === route.path &&
      route.matched.length === this.current.matched.length
    ) {
      return;
    }

    this.updateRoute(route);
    onComplete && onComplete(route);
  }

  listen(cb) {
    this.cb = cb;
  }

  updateRoute(route) {
    this.current = route;
    this.cb && this.cb(route);
  }
}
