<template>
  <div>
    <md-button href="#/pessoas/novo" class="md-fab md-primary floating-button">
       <md-icon>add</md-icon>
     </md-button>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-50 spaced" v-for="person in people">
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">{{ person.firstname }} {{ person.lastname }}</div>
              <div class="md-subhead">{{ person.email }}</div>
            </md-card-header>

            <md-card-actions>
              <md-button :href="'#/pessoas/detalhe/' + person.objectId" class="md-primary">Detalhe</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../config'
  import utils from '../../utils'
  import messages from '../../messages'
  export default {
    name: 'person-list-screen',
    data () {
      return {
        people: [],
        headers: {
          'X-Parse-Application-Id': 'JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL',
          'X-Parse-REST-API-Key': 'eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG'
        }
      }
    },
    mounted () {
      this.getPeople()
    },
    methods: {
      getPeople () {
        if (navigator.onLine) {
          this.axios.get(config.api_url + 'classes/People/', { headers: this.headers })
          .then(response => {
            this.people = response.data.results
          })
          .catch(e => {
            utils.showToast(messages.people_get_error)
          })
        } else {
          utils.showToast(messages.no_internet)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .spaced {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .floating-button {
    position: absolute;
    margin-top: -6%;
    margin-left: 85%;
  }
</style>
