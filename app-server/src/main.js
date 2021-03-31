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
      components: require("./App.vue")
    },
    
    {
      path: "/users/:id",
      components: require("./views/User.vue")
    },
    {
      path: "/memories/:id",
      components: require("./views/Memory.vue")
    },
    {
      path: "/profile/memories",
      components: require("./components/Memories_List_user.vue")
    },
    {
      path: "/profile/collections",
      components: require("./components/Collections_List_user.vue")
    }

  ]
});

new Vue({
  apolloProvider,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");