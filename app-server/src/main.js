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
      components: require("./components/Home.vue")
    },
    {
      path: "/login",
      components: require("./components/Login.vue")
    },
    {
      path: "/about",
      name: "about",
      components: require("./components/About.vue")
    },
    {
      path: "/users",
      components: require("./components/users/Users.vue")
    },
    {
      path: "/users/:id",
      components: require("./components/profile/Profile.vue")
    },
    {
      path: "/collections",
      components: require("./components/collections/Collections_List.vue")
    },
    {
      path: "/memories",
      components: require("./components/memories/Memories.vue")
    },
    {
      path: "/memories2",
      components: require("./components/memories/Memories2.vue")
    },
    {
      path: "/memories/:id",
      components: require("./components/memories/Memory.vue")
    },
    {
      path: "/profile/memories",
      components: require("./components/memories/Memories_List_user.vue")
    },
    {
      path: "/profile/collections",
      components: require("./components/Collections_List_user.vue")
    },
    {
      path: "/new_memory",
      components: require("./components/forms/New_Memory.vue")
    },

  ]
});

new Vue({
  apolloProvider,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");