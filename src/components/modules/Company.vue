<template>
  <div>
    <md-button href="#/empresas/novo" class="md-fab md-primary floating-button">
       <md-icon>add</md-icon>
     </md-button>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-50 spaced" v-for="company in companies">
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">{{ company.name }}</div>
              <div class="md-subhead">{{ company.address }}</div>
            </md-card-header>

            <md-card-actions>
              <md-button :href="'#/empresas/detalhe/' + company.objectId" class="md-primary">Detalhe</md-button>
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
    name: 'company-list-screen',
    data () {
      return {
        companies: [],
        headers: {
          'X-Parse-Application-Id': 'JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL',
          'X-Parse-REST-API-Key': 'eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG'
        }
      }
    },
    mounted () {
      this.getCompanies()
    },
    methods: {
      getCompanies () {
        if (navigator.onLine) {
          this.axios.get(config.api_url + 'classes/Company/', { headers: this.headers })
          .then(response => {
            this.companies = response.data.results
          })
          .catch(e => {
            utils.showToast(messages.companies_get_error)
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
