export default {
  authentication: {
    account: 'Konto',
    apiKey: 'API Nyckel',
    enableAPIKey: 'Aktivera API nyckel',
    loggedInChangePassword:
      'För att ändra ditt lösenord, gå till ditt <0>konto</0> och redigera ditt lösenord där.',
    newAccountCreated:
      'Ett nytt konto har precis skapats som du kan komma åt <a href="{{serverURL}}">{{serverURL}}</a> Klicka på följande länk eller klistra in webbadressen nedan i din webbläsare för att verifiera din e-post: <a href="{{verificationURL}}">{{verificationURL}}</a><br> Efter att ha verifierat din e-post kommer du att kunna logga in framgångsrikt.',
    resetYourPassword: 'Återställ Ditt Lösenord',
    verified: 'Verifierad',
    verifyYourEmail: 'Verifiera din epost',
    youAreReceivingResetPassword:
      'Du får detta för att du (eller någon annan) har begärt återställning av lösenordet för ditt konto. Klicka på följande länk eller klistra in den i din webbläsare för att slutföra processen:',
    youDidNotRequestPassword:
      'Om du inte begärde detta, ignorera detta e-postmeddelande och ditt lösenord kommer att förbli oförändrat.',
  },
  error: {
    deletingFile: 'Det gick inte att ta bort filen.',
    emailOrPasswordIncorrect: 'E-postadressen eller lösenordet som angivits är felaktigt.',
    followingFieldsInvalid_one: 'Följande fält är ogiltigt:',
    followingFieldsInvalid_other: 'Följande fält är ogiltiga:',
    noFilesUploaded: 'Inga filer laddades upp.',
    notAllowedToPerformAction: 'Du får inte utföra denna åtgärd.',
    problemUploadingFile: 'Det uppstod ett problem när filen laddades upp.',
    unableToDeleteCount: 'Det gick inte att ta bort {{count}} av {{total}} {{label}}.',
    unableToUpdateCount: 'Det gick inte att uppdatera {{count}} av {{total}} {{label}}.',
    unauthorized: 'Obehörig, du måste vara inloggad för att göra denna begäran.',
    userLocked: 'Den här användaren är låst på grund av för många misslyckade inloggningsförsök.',
    valueMustBeUnique: 'Värdet måste vara unikt',
  },
  fields: {
    chooseBetweenCustomTextOrDocument:
      'Välj mellan att ange en anpassad text-URL eller länka till ett annat dokument.',
    chooseDocumentToLink: 'Välj ett dokument att länka till',
    customURL: 'Anpassad URL',
    enterURL: 'Ange en URL',
    internalLink: 'Intern länk',
    linkType: 'Länktyp',
    openInNewTab: 'Öppna i ny flik',
    textToDisplay: 'Text att visa',
  },
  general: {
    copy: 'Kopiera',
    createdAt: 'Skapad Vid',
    deletedCountSuccessfully: 'Raderade {{count}} {{label}} framgångsrikt.',
    deletedSuccessfully: 'Togs bort framgångsrikt.',
    email: 'E-post',
    notFound: 'Hittades inte',
    row: 'Rad',
    rows: 'Rader',
    successfullyCreated: '{{label}} skapades framgångsrikt.',
    successfullyDuplicated: '{{label}} duplicerades framgångsrikt.',
    thisLanguage: 'Svenska',
    updatedAt: 'Uppdaterades Vid',
    updatedCountSuccessfully: 'Uppdaterade {{count}} {{label}} framgångsrikt.',
    updatedSuccessfully: 'Uppdaterades framgångsrikt.',
    user: 'Användare',
    users: 'Användare',
    value: 'Värde',
  },
  upload: {
    fileName: 'Filnamn',
    fileSize: 'Filstorlek',
    height: 'Höjd',
    sizes: 'Storlekar',
    width: 'Bredd',
  },
  validation: {
    emailAddress: 'Vänligen ange en giltig e-postadress.',
    enterNumber: 'Vänligen skriv in ett giltigt nummer.',
    greaterThanMax: '{{value}} är större än den maximalt tillåtna {{label}} av {{max}}.',
    invalidInput: 'Det här fältet har en ogiltig inmatning.',
    invalidSelection: 'Det här fältet har ett ogiltigt urval.',
    invalidSelections: 'Det här fältet har följande ogiltiga val:',
    lessThanMin: '{{value}} är mindre än den minst tillåtna {{label}} av {{min}}.',
    longerThanMin: 'Detta värde måste vara längre än minimilängden på {{minLength}} tecken.',
    notValidDate: '"{{value}}" är inte ett giltigt datum.',
    required: 'Detta fält är obligatoriskt.',
    requiresAtLeast: 'Detta fält kräver minst {{count}} {{label}}.',
    requiresNoMoreThan: 'Detta fält kräver inte mer än {{count}} {{label}}.',
    requiresTwoNumbers: 'Detta fält kräver två nummer.',
    shorterThanMax: 'Detta värde måste vara kortare än maxlängden på {{maxLength}} tecken.',
    trueOrFalse: 'Detta fält kan bara vara lika med sant eller falskt.',
    validUploadID: 'Det här fältet är inte ett giltigt uppladdnings-ID',
  },
  version: {
    autosavedSuccessfully: 'Autosparades framgångsrikt.',
    draft: 'Utkast',
    draftSavedSuccessfully: 'Utkastet sparades framgångsrikt.',
    published: 'Publicerad',
    restoredSuccessfully: 'Återställd framgångsrikt.',
    status: 'Status',
  },
}
