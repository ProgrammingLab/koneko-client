import Vue from "vue";
import VueMaterial from "vue-material";
import HelloComponent from "./components/Hello.vue";

Vue.use(VueMaterial);

const v = new Vue({
    components: {
        HelloComponent,
    },
    el: "#app",
    template: `<hello-component :name="name" :initialEnthusiasm="5" />`,
});
