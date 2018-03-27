<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <md-button class="md-raised" @click="decrement">-</md-button>
        <md-button class="md-raised" @click="increment">+</md-button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ["name", "initialEnthusiasm"],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm
        };
    },
    methods: {
        increment() {
            this.enthusiasm++;
        },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        }
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join("!");
        }
    }
});
</script>

<style>
.greeting {
  font-size: 20px;
}
</style>