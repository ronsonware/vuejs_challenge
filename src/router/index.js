import Vue from 'vue'
import Router from 'vue-router'
import CompanyComponent from '../components/modules/Company'
import CompanyDetailComponent from '../components/modules/CompanyDetail'
import CompanyCreateEditComponent from '../components/modules/CompanyCreateEdit'
import PersonComponent from '../components/modules/Person'
import PersonDetailComponent from '../components/modules/PersonDetail'
import PersonCreateEditComponent from '../components/modules/PersonCreateEdit'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home_redirect_screen',
      component: CompanyComponent
    },
    {
      path: '/empresas',
      name: 'company_list_screen',
      component: CompanyComponent
    },
    {
      path: '/empresas/detalhe/:id',
      name: 'company_detail_screen',
      component: CompanyDetailComponent
    },
    {
      path: '/empresas/novo',
      name: 'company_create_screen',
      component: CompanyCreateEditComponent
    },
    {
      path: '/empresas/editar/:id',
      name: 'company_edit_screen',
      component: CompanyCreateEditComponent
    },
    {
      path: '/pessoas',
      name: 'person_list_screen',
      component: PersonComponent
    },
    {
      path: '/pessoas/detalhe/:id',
      name: 'person_detail_screen',
      component: PersonDetailComponent
    },
    {
      path: '/pessoas/novo',
      name: 'person_create_screen',
      component: PersonCreateEditComponent
    },
    {
      path: '/pessoas/editar/:id',
      name: 'person_edit_screen',
      component: PersonCreateEditComponent
    }
  ]
})
