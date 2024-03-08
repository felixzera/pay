export default {
  authentication: {
    account: 'Conta',
    apiKey: 'Chave da API',
    enableAPIKey: 'Habilitar Chave API',
    newAccountCreated:
      'Uma nova conta acaba de ser criada para que você possa acessar <a href="{{serverURL}}">{{serverURL}}</a> Por favor, clique no link a seguir ou cole a URL abaixo no seu navegador para verificar seu email: <a href="{{verificationURL}}">{{verificationURL}}</a><br> Após a verificação de email, você será capaz de fazer o login.',
    resetYourPassword: 'Redefinir Sua Senha',
    verified: 'Verificado',
    verifyYourEmail: 'Verifique seu email',
    youAreReceivingResetPassword:
      'Você está recebendo essa mensagem porque você (ou outra pessoa) requisitou a redefinição de senha da sua conta. Por favor, clique no link a seguir ou cole no seu navegador para completar o processo:',
    youDidNotRequestPassword:
      'Se você não fez essa requisição, por favor ignore esse email e sua senha permanecerá igual.',
  },
  error: {
    deletingFile: 'Ocorreu um erro ao excluir o arquivo.',
    emailOrPasswordIncorrect: 'O email ou senha fornecido está incorreto.',
    followingFieldsInvalid_one: 'O campo a seguir está inválido:',
    followingFieldsInvalid_other: 'Os campos a seguir estão inválidos:',
    noFilesUploaded: 'Nenhum arquivo foi carregado.',
    notAllowedToPerformAction: 'Você não tem permissão para realizar essa ação.',
    problemUploadingFile: 'Ocorreu um problema ao carregar o arquivo.',
    unableToDeleteCount: 'Não é possível excluir {{count}} de {{total}} {{label}}.',
    unableToUpdateCount: 'Não foi possível atualizar {{count}} de {{total}} {{label}}.',
    unauthorized: 'Não autorizado. Você deve estar logado para fazer essa requisição',
    userLocked: 'Esse usuário está bloqueado devido a muitas tentativas de login malsucedidas.',
    valueMustBeUnique: 'Valor deve ser único',
  },
  fields: {
    chooseBetweenCustomTextOrDocument:
      'Escolha entre inserir um URL de texto personalizado ou vincular a outro documento.',
    chooseDocumentToLink: 'Escolha um documento para vincular',
    customURL: 'URL personalizado',
    enterURL: 'Insira um URL',
    internalLink: 'Link Interno',
    linkType: 'Tipo de link',
    openInNewTab: 'Abrir em nova aba',
    textToDisplay: 'Texto a ser exibido',
  },
  general: {
    createdAt: 'Criado Em',
    deletedCountSuccessfully: 'Excluído {{count}} {{label}} com sucesso.',
    deletedSuccessfully: 'Apagado com sucesso.',
    email: 'Email',
    notFound: 'Não Encontrado',
    successfullyCreated: '{{label}} criado com sucesso.',
    thisLanguage: 'Português',
    updatedAt: 'Atualizado Em',
    updatedCountSuccessfully: 'Atualizado {{count}} {{label}} com sucesso.',
    updatedSuccessfully: 'Atualizado com sucesso.',
    user: 'usuário',
    users: 'usuários',
    value: 'Valor',
  },
  upload: {
    fileName: 'Nome do Arquivo',
    fileSize: 'Tamanho do Arquivo',
    height: 'Altura',
    sizes: 'Tamanhos',
    width: 'Largura',
  },
  validation: {
    emailAddress: 'Por favor, insira um endereço de email válido.',
    enterNumber: 'Por favor, insira um número válido.',
    greaterThanMax: '{{value}} é maior que o máximo permitido de {{label}} que é {{max}}.',
    invalidInput: 'Esse campo tem um conteúdo inválido.',
    invalidSelection: 'Esse campo tem uma seleção inválida.',
    invalidSelections: "'Esse campo tem as seguintes seleções inválidas:'",
    lessThanMin: '{{value}} é menor que o mínimo permitido de {{label}} que é {{min}}.',
    longerThanMin: 'Esse valor deve ser maior do que o mínimo de {{minLength}} characters.',
    notValidDate: '"{{value}}" não é uma data válida.',
    required: 'Esse campo é obrigatório.',
    requiresNoMoreThan: 'Esse campo requer pelo menos {{count}} {{label}}.',
    requiresTwoNumbers: 'Esse campo requer dois números.',
    shorterThanMax: 'Esse valor deve ser menor do que o máximo de {{maxLength}} caracteres.',
    trueOrFalse: 'Esse campo pode ser apenas verdadeiro (true) ou falso (false)',
    validUploadID: "'Esse campo não é um ID de upload válido.'",
  },
  version: {
    autosavedSuccessfully: 'Salvamento automático com sucesso.',
    draft: 'Rascunho',
    draftSavedSuccessfully: 'Rascunho salvo com sucesso.',
    published: 'Publicado',
    restoredSuccessfully: 'Restaurado com sucesso.',
    status: 'Status',
  },
}
