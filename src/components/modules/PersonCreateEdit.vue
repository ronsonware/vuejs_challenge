<template>
  <div>
    <div>
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Editar Pessoa</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field :class="errors.firstname ? 'md-invalid' : ''">
                <label>Primeiro Nome</label>
                <md-input name="firstname" id="firstname" autocomplete="given-firstname" v-model="fields.firstname" :disabled="sending" />
                <span class="md-error">Primeiro Nome inválido</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-50">
              <md-field :class="errors.lastname ? 'md-invalid' : ''">
                <label>Último Nome</label>
                <md-input name="lastname" id="lastname" autocomplete="given-lastname" v-model="fields.lastname" :disabled="sending" />
                <span class="md-error">Último Nome inválido</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-50">
              <md-field :class="errors.email ? 'md-invalid' : ''">
                <label>Email</label>
                <md-input name="email" id="email" autocomplete="given-email" v-model="fields.email" :disabled="sending" />
                <span class="md-error">Email inválido</span>
              </md-field>
            </div>


            <div class="md-layout-item md-size-50">
              <md-field>
                <label for="who_visited">Empresas a visitar</label>
                <md-select v-model="fields.want_visit" name="want_visit" id="want_visit" multiple>
                  <md-option v-for="company in companies" :key="company.objectId" :data="company" :value="company.objectId">
                    {{ company.name }}
                  </md-option>
                </md-select>
              </md-field>
            </div>

          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button @click="call()" class="md-primary" :disabled="sending">Salvar</md-button>
        </md-card-actions>
      </md-card>

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
        fields: {
          'firstname': null,
          'lastname': null,
          'email': null,
          'want_visit': []
        },
        errors: {
          'firstname': false,
          'lastname': false,
          'email': false
        },
        companies: [],
        sending: false,
        headers: {
          'X-Parse-Application-Id': 'JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL',
          'X-Parse-REST-API-Key': 'eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG'
        }
      }
    },
    mounted () {
      this.fields.objectId = this.$route.params.id
      if (this.fields.objectId) {
        this.getPerson()
      }
      this.getCompanies()
    },
    methods: {
      getPerson () {
        if (navigator.onLine) {
          this.axios.get(config.api_url + 'classes/People/' + this.fields.objectId, { headers: this.headers })
          .then(response => {
            this.fields = response.data
            for (let i = 0; i < this.fields.want_visit.length; i++) {
              for (let j = 0; j < this.companies.length; j++) {
                if (this.fields.want_visit === this.companies.objectId) {
                  this.companies.slice(j, 1)
                }
              }
            }
          })
          .catch(e => {
            utils.showToast(messages.person_get_error)
          })
        } else {
          utils.showToast(messages.no_internet)
        }
      },
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
      },
      call () {
        if (navigator.onLine) {
          let headers = {
            headers: this.headers
          }
          let body = {
            'firstname': this.fields.firstname,
            'lastname': this.fields.lastname,
            'email': this.fields.email,
            'want_visit': this.fields.want_visit
          }
          let post = config.api_url + 'classes/People/'
          let put = config.api_url + 'classes/People/' + this.fields.objectId

          // Call
          if (this.fields.objectId) {
            this.axios.put(put, body, headers).then(response => {
              utils.showToast(messages.person_updated)
              utils.redirect(this, '/pessoas/detalhe/' + this.fields.objectId)
            }).catch(e => {
              utils.showToast(messages.person_persist_error)
            })
          } else {
            this.axios.post(post, body, headers).then(response => {
              utils.showToast(messages.person_created)
              utils.redirect(this, '/pessoas/')
            }).catch(e => {
              utils.showToast(messages.person_persist_error)
            })
          }
        } else {
          utils.showToast(utils.strNoInternet)
        }
      },
      validate () {
        console.log('Validations')
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
  .phone-txt {
    margin-top: 5px;
    font-size: 20px;
  }
  .phone-button {
    margin-top: -8px;
  }
  .picture-button {
    margin-top: 25px;
  }
  .img-min {
    width: 100px;
  }
</style>
