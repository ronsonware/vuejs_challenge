<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menu_visible = !menu_visible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Desafio</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menu_visible">
        <md-toolbar class="md-transparent" md-elevation="0">Navegação</md-toolbar>

        <md-list>
          <md-list-item href="#/empresas/">
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Empresas</span>
          </md-list-item>

          <md-list-item href="#/pessoas/">
            <md-icon>person</md-icon>
            <span class="md-list-item-text">Pessoas</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content>
        <div class="page-content">
            <router-view></router-view>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  data () {
    return {
      menu_visible: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-content {
    margin-top: 40px;
  }
</style>
