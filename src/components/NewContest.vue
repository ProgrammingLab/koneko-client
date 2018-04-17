<template>
  <section class="section">
    <div class="container">
      <h1 class="title">New Contest</h1>
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Title">
        </div>
      </div>
      <div class="field">
        <label class="label">Time</label>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field is-grouped">
              <div class="control">
                <input class="input" type="datetime-local" placeholder="Starts at">
              </div>
              <div class="control">
                〜
              </div>
              <div class="control">
                <input class="input" type="datetime-local" placeholder="Ends at">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="Description" rows="10"/>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'NewContest',
  data() {
    const contest = {
      title: null,
      description: null,
      startAt: null,
      endAt: null,
      writers: [],
    };
    return {
      contest,
    };
  },
};
</script>
