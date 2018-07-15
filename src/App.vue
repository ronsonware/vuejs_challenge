<template>
  <nav-bar></nav-bar>
</template>

<script>
  import NavBar from './components/navbar/NavBar'
  export default {
    name: 'app',
    components: {
      'nav-bar': NavBar
    }
  }
</script>
