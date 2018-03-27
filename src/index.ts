import Vue from "vue";
import HelloComponent from "./components/Hello.vue";

const v = new Vue({
    components: {
        HelloComponent,
    },
    data: { name: "World" },
    el: "#app",
    template: `
    <div>
        Name: <input v-model="name" type="text">
        <h1>Hello Component</h1>
        <hello-component :name="name" :initialEnthusiasm="5" />
    </div>
    `,
});
