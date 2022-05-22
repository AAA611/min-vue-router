import { BaseHistory } from "./base.js";

export default class HTML5History extends BaseHistory {
  constructor(router) {
    super(router);
  }

  setupListener() {
    window.addEventListener("popstate", () => {
      this.transitionTo(window.location.pathname);
    });
  }

  push(location) {
    this.transitionTo(location, (route) => {
      window.history.pushState({}, null, route.path);
    });
  }

  replace(location) {
    this.transitionTo(location, (route) => {
      window.history.replaceState({}, null, route.path);
    });
  }

  getCurrentLocation() {
    return window.location.pathname;
  }
}
