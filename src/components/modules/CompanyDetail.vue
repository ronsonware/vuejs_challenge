<template>
  <div>

    <md-button href="#/empresas/novo" class="md-fab md-primary floating-button">
       <md-icon>add</md-icon>
     </md-button>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100 spaced">
        <md-card>

          <md-card-header>
            <div class="md-title">{{ company.name }}</div>
            <div class="md-subhead">{{ company.address }}</div>
            <div class="md-subhead">
              <span v-for="phone in company.phones">
                {{ phone }}
              </span>
            </div>
          </md-card-header>

          <div class="md-layout-item md-size-100 md-layout md-gutter">
            <div class="md-layout-item md-size-25 space-left" v-for="picture in company.pictures">
              <md-card-media>
                <img :src="picture" alt="People">
              </md-card-media>
            </div>
          </div>

          <md-card-content>
            <span>Visitas</span>
            <md-list v-for="person in people_who_visited" :key="person.objectId" :data="person">
              <md-list-item :href="'#/pessoas/detalhe/' + person.objectId">
                {{ person.firstname }} {{ person.lastname }}
              </md-list-item>
            </md-list>
          </md-card-content>

          <md-card-actions>
            <md-button :href="'#/empresas/editar/' + company.objectId" class="md-primary">Editar</md-button>
            <md-button @click="delete_alert = true" class="md-accent">Remover</md-button>
          </md-card-actions>

        </md-card>

        <md-dialog-confirm
          :md-active.sync="delete_alert"
          md-title="Remover empresa?"
          :md-content="'Deseja realmente remover a empresa ' + company.name + '?'"
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
    name: 'company-detail-screen',
    data () {
      return {
        company: {},
        people_who_visited: [],
        delete_alert: false,
        headers: {
          'X-Parse-Application-Id': 'JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL',
          'X-Parse-REST-API-Key': 'eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG'
        }
      }
    },
    mounted () {
      this.company.objectId = this.$route.params.id
      this.getCompany()
    },
    methods: {
      getCompany () {
        if (navigator.onLine) {
          this.axios.get(config.api_url + 'classes/Company/' + this.company.objectId, { headers: this.headers })
          .then(response => {
            this.company = response.data
            for (let i = 0; i < this.company.who_visited.length; i++) {
              this.getPeople(this.company.who_visited[i])
            }
          })
          .catch(e => {
            utils.showToast(messages.person_get_error)
          })
        } else {
          utils.showToast(messages.no_internet)
        }
      },
      getPeople (personId) {
        if (navigator.onLine) {
          this.axios.get(config.api_url + 'classes/People/' + personId, { headers: this.headers })
          .then(response => {
            this.people_who_visited.push(response.data)
          })
          .catch(e => {
            if (e.response.status === 404) {
              utils.showToast(messages.person_not_found(personId))
            } else {
              utils.showToast(messages.person_get_error_with_id(personId))
            }
          })
        } else {
          utils.showToast(messages.no_internet)
        }
      },
      onConfirmDelete () {
        if (navigator.onLine) {
          this.axios.delete(config.api_url + 'classes/Company/' + this.company.objectId, { headers: this.headers })
          .then(response => {
            utils.showToast(messages.company_deleted)
            utils.redirect(this, '/empresas/')
          }).catch(e => {
            utils.showToast(messages.company_delete_error)
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
