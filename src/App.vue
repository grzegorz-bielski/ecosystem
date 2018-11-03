<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/blocks">Blocks</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    width: 100%;
    height: 100%;
}

body,
html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #000;
}
</style>
