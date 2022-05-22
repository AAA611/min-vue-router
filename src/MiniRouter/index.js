import createMatcher from "./create-matcher";
import Html5History from "./history/html5";
import HashHistory from "./history/base";
import RouterLink from "./components/link";
import RouterView from "./components/view";

export let _Vue;
function install(Vue) {
  _Vue = Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        this._rootRouter = this;
        this._rootRouter._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        this._rootRouter = this.$parent && this.$parent._rootRouter;
      }
    }
  });

  // 注册组件
  Vue.component("router-link", RouterLink);
  Vue.component("router-view", RouterView);

  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._rootRouter._router;
    }
  });

  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._rootRouter._route;
    }
  });
}

class MINIRouter {
  constructor(config) {
    const { mode = "hash", routes = [] } = config;

    this.matcher = createMatcher(routes);
    this.mode = mode;

    switch (mode) {
      case "hash":
        this.history = new HashHistory(this);
        break;
      case "history":
        this.history = new Html5History(this);
        break;
      default:
        break;
    }
  }

  init(app) {
    this.app = app;
    const history = this.history;

    const setupListener = () => {
      history.setupListener();
    };

    history.transitionTo(history.getCurrentLocation(), setupListener);

    history.listen((route) => {
      app._route = route;
    });
  }

  push(location) {
    this.history.push(location);
  }

  replace(location) {
    this.history.replace(location);
  }
}

MINIRouter.install = install;

export default MINIRouter;
