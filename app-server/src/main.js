import Vue from "vue";
import VueApollo from "vue-apollo";
import VueRouter from "vue-router";

import apolloClient from "./vue-apollo";

import App from "./App.vue";
import vuetify from './plugins/vuetify';

Vue.use(VueApollo);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      components: require("./views/Home.vue")
    },
    {
      path: "/login",
      components: require("./views/Login.vue")
    },
    {
      path: "/about",
      components: require("./views/About.vue")
    },
    {
      path: "/profile",
      components: require("./views/Profile.vue")
    },
    {
      path: "/users",
      components: require("./views/Users.vue")
    },
    {
      path: "/users/:id",
      components: require("./views/User.vue")
    },
    {
      path: "/memories",
      components: require("./views/Memories.vue")
    },
    {
      path: "/memories/:id",
      components: require("./views/Memory.vue")
    }

  ]
});

new Vue({
  apolloProvider,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");