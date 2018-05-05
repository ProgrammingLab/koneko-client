<template>
  <form>
   <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input required class="input" type="text" placeholder="Title" v-model="problem.title">
      </div>
    </div>
    <div class="field">
      <label class="label">Time Limit</label>
      <div class="field has-addons">
        <div class="control">
          <input
            required
            class="input"
            type="number"
            placeholder="Time Limit"
            max="60"
            min="1"
            step="1"
            v-model="timeLimit"
            />
        </div>
        <p class="control">
          <a class="button is-static">
            sec
          </a>
        </p>
      </div>
    </div>
    <div class="field">
      <label class="label">Memory Limit</label>
      <div class="field has-addons">
        <div class="control">
          <input
            required
            class="input"
            type="number"
            placeholder="Memory Limit"
            max="512"
            min="64"
            step="1"
            v-model="problem.memoryLimit"
            />
        </div>
        <p class="control">
          <a class="button is-static">
            MiB
          </a>
        </p>
      </div>
    </div>
    <div class="field">
      <label class="label">Statement</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Statement"
          rows="10"
          v-model="problem.body"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Input</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Input"
          rows="5"
          v-model="problem.inputFormat"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Output</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Output"
          rows="5"
          v-model="problem.outputFormat"
        />
      </div>
    </div>
    <div c>
      <div class="field" v-for="(sample, index) in problem.samples" :key="index">
        <hr>
        <label class="label">
          Sample #{{ index + 1 }}
          <button class="button is-small is-danger">Delete</button>
        </label>
        <div class="field">
          <label class="label">Input</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Sample Input"
              rows="5"
              v-model="sample.input"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Output</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Sample Output"
              rows="5"
              v-model="sample.output"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Sample Description"
              rows="5"
              v-model="sample.description"
            />
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary">Add new sample</button>
        </div>
      </div>
      <hr>
    </div>
    <div class="field">
      <div class="control">
        <button type="submit" class="button is-link" :disabled="sending">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
const oneSec = 1000000000;

export default {
  name: 'EditProblemBody',
  props: [
    'problem',
  ],
  computed: {
    timeLimit: {
      get() {
        return this.problem.timeLimit / oneSec;
      },
      set(val) {
        this.problem.timeLimit = val * oneSec;
      },
    },
  },
};
</script>
