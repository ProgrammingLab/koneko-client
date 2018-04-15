<template>
  <nav class="navbar is-white has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand navbar-start">
        <router-link class="navbar-item brand-text" to="/">
          Koneko
        </router-link>
      </div>
      <div class="navbar-end">
        <div id="navMenu" class="navbar-menu">
          <div class="navbar-start">
            <router-link class="navbar-item" to="#">
              Contests
            </router-link>
            <router-link class="navbar-item" to="#">
              Problems
            </router-link>
            <router-link class="navbar-item" to="#">
              icon?
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
};
</script>
