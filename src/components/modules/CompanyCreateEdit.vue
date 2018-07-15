<template>
  <div>
    <div>
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Editar Empresa</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field :class="errors.name ? 'md-invalid' : ''">
                <label>Nome</label>
                <md-input name="name" id="name" autocomplete="given-name" v-model="fields.name" :disabled="sending" />
                <span class="md-error">Nome inválido</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-50">
              <md-field :class="errors.address ? 'md-invalid' : ''">
                <label>Endereço</label>
                <md-input name="adress" id="adress" autocomplete="given-adress" v-model="fields.address" :disabled="sending" />
                <span class="md-error">Endereço inválido</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-20">
              <md-field>
                <label>Adicionar Telefone</label>
                <md-input name="phones" id="phones" autocomplete="given-phones" v-model="selected_phone" v-on:keyup.enter="addPhone()" :disabled="sending" />
              </md-field>
            </div>
            <div class="md-layout md-gutter md-layout-item md-size-80">
              <div v-for="phone in fields.phones" class="md-layout-item md-size-25">
                <span class="phone-txt">{{ phone }}</span>
                <md-button class="md-icon-button phone-button" @click="removePhone(phone)">
                  <md-icon>delete</md-icon>
                </md-button>
              </div>
            </div>

            <div class="md-layout-item md-size-20">
              <md-field>
                <label>Adicionar Imagens (link)</label>
                <md-input name="pictures" id="pictures" autocomplete="given-pictures" v-model="selected_picture" v-on:keyup.enter="addPicture()" :disabled="sending" />
              </md-field>
            </div>
            <div class="md-layout md-gutter md-layout-item md-size-80">
              <div v-for="picture in fields.pictures" class="md-layout-item md-size-20">
                <img :src="picture" class="img-min">
                <md-button class="md-icon-button picture-button" @click="removePicture(picture)">
                  <md-icon>delete</md-icon>
                </md-button>
              </div>
            </div>

            <div class="md-layout-item md-size-50">
              <md-field>
                <label for="who_visited">Visitantes</label>
                <md-select v-model="fields.who_visited" name="who_visited" id="who_visited" multiple>
                  <md-option v-for="person in people" :key="person.objectId" :data="person" :value="person.objectId">
                    {{ person.firstname }} {{ person.lastname }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </md-card-content>

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
          'name': null,
          'address': null,
          'phones': [],
          'pictures': [],
          'who_visited': []
        },
        errors: {
          'name': false,
          'address': false
        },
        people: [],
        selected_phone: '',
        selected_picture: '',
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
        this.getCompany()
      }
      this.getPeople()
    },
    methods: {
      getCompany () {
        if (navigator.onLine) {
          this.axios.get(config.api_url + 'classes/Company/' + this.fields.objectId, { headers: this.headers })
          .then(response => {
            this.fields = response.data
            for (let i = 0; i < this.fields.who_visited.length; i++) {
              for (let j = 0; j < this.people.length; j++) {
                if (this.fields.who_visited === this.people.objectId) {
                  this.people.slice(j, 1)
                }
              }
            }
          })
          .catch(e => {
            utils.showToast(messages.company_get_error)
          })
        } else {
          utils.showToast(messages.no_internet)
        }
      },
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
      },
      call () {
        if (navigator.onLine) {
          let headers = {
            headers: this.headers
          }
          let body = {
            'name': this.fields.name,
            'address': this.fields.address,
            'phones': this.fields.phones,
            'pictures': this.fields.pictures,
            'who_visited': this.fields.who_visited
          }
          let post = config.api_url + 'classes/Company/'
          let put = config.api_url + 'classes/Company/' + this.fields.objectId

          // Call
          if (this.fields.objectId) {
            this.axios.put(put, body, headers).then(response => {
              utils.showToast(messages.company_updated)
              utils.redirect(this, '/empresas/detalhe/' + this.fields.objectId)
            }).catch(e => {
              utils.showToast(messages.company_persist_error)
            })
          } else {
            this.axios.post(post, body, headers).then(response => {
              utils.showToast(messages.company_created)
              utils.redirect(this, '/empresas/')
            }).catch(e => {
              utils.showToast(messages.company_persist_error)
            })
          }
        } else {
          utils.showToast(utils.strNoInternet)
        }
      },
      addPhone () {
        this.fields.phones.push(this.selected_phone)
        this.selected_phone = ''
      },
      removePhone (phone) {
        for (let i = 0; i < this.fields.phones.length; i++) {
          if (phone === this.fields.phones[i]) {
            this.fields.phones.splice(i, 1)
          }
        }
      },
      addPicture () {
        this.fields.pictures.push(this.selected_picture)
        this.selected_picture = ''
      },
      removePicture (picture) {
        for (let i = 0; i < this.fields.pictures.length; i++) {
          if (picture === this.fields.pictures[i]) {
            this.fields.pictures.splice(i, 1)
          }
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
