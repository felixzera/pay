export default {
  authentication: {
    account: 'Účet',
    apiKey: 'Klíč API',
    enableAPIKey: 'Povolit klíč API',
    newAccountCreated:
      'Pro přístup k <a href="{{serverURL}}">{{serverURL}}</a> byl pro vás vytvořen nový účet. Klepněte na následující odkaz nebo zkopírujte URL do svého prohlížeče pro ověření vašeho emailu: <a href="{{verificationURL}}">{{verificationURL}}</a><br> Po ověření vašeho emailu se budete moci úspěšně přihlásit.',
    resetYourPassword: 'Resetujte své heslo',
    verified: 'Ověřeno',
    verifyYourEmail: 'Ověřte svůj email',
    youAreReceivingResetPassword:
      'Tento email obdržíte, protože jste (nebo někdo jiný) požádali o resetování hesla pro váš účet.',
    youDidNotRequestPassword:
      'Pokud jste o to nepožádali, ignorujte prosím tento e-mail a vaše heslo zůstane nezměněno.',
  },
  error: {
    deletingFile: 'Při mazání souboru došlo k chybě.',
    emailOrPasswordIncorrect: 'Zadaný email nebo heslo není správné.',
    followingFieldsInvalid_one: 'Následující pole je neplatné:',
    followingFieldsInvalid_other: 'Následující pole jsou neplatná:',
    noFilesUploaded: 'Nebyly nahrány žádné soubory.',
    notAllowedToPerformAction: 'Nemáte povolení provádět tuto akci.',
    problemUploadingFile: 'Při nahrávání souboru došlo k chybě.',
    unableToDeleteCount: 'Nelze smazat {{count}} z {{total}} {{label}}',
    unableToUpdateCount: 'Nelze aktualizovat {{count}} z {{total}} {{label}}.',
    unauthorized: 'Neautorizováno, pro zadání tohoto požadavku musíte být přihlášeni.',
    userLocked: 'Tento uživatel je uzamčen kvůli příliš mnoha neúspěšným pokusům o přihlášení.',
    valueMustBeUnique: 'Hodnota musí být jedinečná',
  },
  fields: {
    chooseBetweenCustomTextOrDocument:
      'Zvolte mezi vložením vlastního textového URL nebo odkazováním na jiný dokument.',
    chooseDocumentToLink: 'Vyberte dokument, na který se chcete odkázat',
    customURL: 'Vlastní URL',
    enterURL: 'Zadejte URL',
    internalLink: 'Interní odkaz',
    linkType: 'Typ odkazu',
    openInNewTab: 'Otevřít v nové záložce',
    textToDisplay: 'Text k zobrazení',
  },
  general: {
    createdAt: 'Vytvořeno v',
    deletedCountSuccessfully: 'Úspěšně smazáno {{count}} {{label}}.',
    deletedSuccessfully: 'Úspěšně odstraněno.',
    email: 'E-mail',
    notFound: 'Nenalezeno',
    successfullyCreated: '{{label}} úspěšně vytvořeno.',
    thisLanguage: 'Čeština',
    updatedAt: 'Aktualizováno v',
    updatedCountSuccessfully: 'Úspěšně aktualizováno {{count}} {{label}}.',
    updatedSuccessfully: 'Úspěšně aktualizováno.',
    user: 'Uživatel',
    users: 'Uživatelé',
    value: 'Hodnota',
  },
  upload: {
    fileName: 'Název souboru',
    fileSize: 'Velikost souboru',
    height: 'Výška',
    sizes: 'Velikosti',
    width: 'Šířka',
  },
  validation: {
    emailAddress: 'Zadejte prosím platnou e-mailovou adresu.',
    enterNumber: 'Zadejte prosím platné číslo.',
    greaterThanMax: '{{value}} je vyšší než maximálně povolená {{label}} {{max}}.',
    invalidInput: 'Toto pole má neplatný vstup.',
    invalidSelection: 'Toto pole má neplatný výběr.',
    invalidSelections: 'Toto pole má následující neplatné výběry:',
    lessThanMin: '{{value}} je nižší než minimálně povolená {{label}} {{min}}.',
    longerThanMin: 'Tato hodnota musí být delší než minimální délka {{minLength}} znaků.',
    notValidDate: '"{{value}}" není platné datum.',
    required: 'Toto pole je povinné.',
    requiresNoMoreThan: 'Toto pole vyžaduje ne více než {{count}} {{label}}.',
    requiresTwoNumbers: 'Toto pole vyžaduje dvě čísla.',
    shorterThanMax: 'Tato hodnota musí být kratší než maximální délka {{maxLength}} znaků.',
    trueOrFalse: 'Toto pole může být rovno pouze true nebo false.',
    validUploadID: 'Toto pole není platné ID pro odeslání.',
  },
  version: {
    autosavedSuccessfully: 'Úspěšně uloženo automaticky.',
    draft: 'Koncept',
    draftSavedSuccessfully: 'Koncept úspěšně uložen.',
    published: 'Publikováno',
    restoredSuccessfully: 'Úspěšně obnoveno.',
    status: 'Stav',
  },
}
