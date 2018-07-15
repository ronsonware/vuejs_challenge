<template>
  <div>
    <md-button href="#/pessoas/novo" class="md-fab md-primary floating-button">
       <md-icon>add</md-icon>
     </md-button>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100 spaced">
        <md-card>
          <md-card-header>
            <div class="md-title">{{ person.firstname }} {{ person.lastname }}</div>
            <div class="md-subhead">{{ person.email }}</div>
          </md-card-header>

          <md-card-content>
            <span>Empresas a visitar</span>
            <md-list v-for="company in company_want_visit" :key="company.objectId" :data="company">
              <md-list-item :href="'#/empresas/detalhe/' + company.objectId">
                {{ company.name }}
              </md-list-item>
            </md-list>
          </md-card-content>

          <md-card-actions>
            <md-button :href="'#/pessoas/editar/' + person.objectId" class="md-primary">Editar</md-button>
            <md-button @click="delete_alert = true" class="md-accent">Remover</md-button>
          </md-card-actions>
        </md-card>
        <md-dialog-confirm
          :md-active.sync="delete_alert"
          md-title="Remover pessoa?"
          :md-content="'Deseja realmente remover a pessoa ' + person.firstname + ' ' + person.lastname + '?'"
          md-confirm-text="Sim"
          md-cancel-text="Não"
          @md-confirm="onConfirmDelete"
          />
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../config'
  import utils from '../../utils'
  import messages from '../../messages'
  export default {
    name: 'person-detail-screen',
    data () {
      return {
        person: {},
        company_want_visit: [],
        delete_alert: false,
        headers: {
          'X-Parse-Application-Id': 'JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL',
          'X-Parse-REST-API-Key': 'eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG'
        }
      }
    },
    mounted () {
      this.person.objectId = this.$route.params.id
      this.getPerson()
    },
    methods: {
      getPerson () {
        if (navigator.onLine) {
          this.axios.get(config.api_url + 'classes/People/' + this.person.objectId, { headers: this.headers })
          .then(response => {
            this.person = response.data
            for (let i = 0; i < this.person.want_visit.length; i++) {
              this.getCompany(this.person.want_visit[i])
            }
          })
          .catch(e => {
            utils.showToast(messages.company_get_error)
          })
        } else {
          utils.showToast(messages.no_internet)
        }
      },
      getCompany (companyId) {
        if (navigator.onLine) {
          this.axios.get(config.api_url + 'classes/Company/' + companyId, { headers: this.headers })
          .then(response => {
            this.company_want_visit.push(response.data)
          })
          .catch(e => {
            if (e.response.status === 404) {
              utils.showToast(messages.company_not_found(companyId))
            } else {
              utils.showToast(messages.company_get_error_with_id(companyId))
            }
          })
        } else {
          utils.showToast(messages.no_internet)
        }
      },
      onConfirmDelete () {
        if (navigator.onLine) {
          this.axios.delete(config.api_url + 'classes/People/' + this.person.objectId, { headers: this.headers })
          .then(response => {
            utils.showToast(messages.person_deleted)
            utils.redirect(this, '/pessoas/')
          }).catch(e => {
            utils.showToast(messages.person_delete_error)
          })
        } else {
          utils.showToast(messages.no_internet)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .floating-button {
    position: absolute;
    margin-top: -6%;
    margin-left: 85%;
  }
  .space-left {
    margin-left: 8px;
  }
</style>
