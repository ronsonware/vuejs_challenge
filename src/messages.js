export default {
  no_internet: 'Seu navegado não está conectado a internet.',
  //
  companies_get_error: 'Ocorreu um erro ao recuperar as empresas.',
  company_get_error: 'Ocorreu um erro ao recuperar a empresa.',
  company_persist_error: 'Ocorreu um erro ao persistir a Empresa.',
  company_delete_error: 'Ocorreu um erro ao remover a Empresa.',
  company_created: 'Empresa criada com sucesso.',
  company_updated: 'Empresa atualizada com sucesso.',
  company_deleted: 'Empresa removida com sucesso.',
  company_not_found (companyId) {
    return 'Empresa "' + companyId + '" não encontrada.'
  },
  company_get_error_with_id (companyId) {
    return 'Ocorreu um erro ao recuperar a empresa "' + companyId + '".'
  },
  //
  people_get_error: 'Ocorreu um erro ao recuperar as pessoas.',
  person_get_error: 'Ocorreu um erro ao recuperar a Pessoa.',
  person_persist_error: 'Ocorreu um erro ao persistir a Pessoa.',
  person_delete_error: 'Ocorreu um erro ao remover a Pessoa.',
  person_created: 'Pessoa criada com sucesso.',
  person_updated: 'Pessoa atualizada com sucesso.',
  person_deleted: 'Pessoa removida com sucesso.',
  person_not_found (personId) {
    return 'Pessoa "' + personId + '" não encontrada.'
  },
  person_get_error_with_id (personId) {
    return 'Ocorreu um erro ao recuperar a pessoa "' + personId + '".'
  }
}
