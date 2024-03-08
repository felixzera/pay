export default {
  authentication: {
    account: '帳戶',
    apiKey: 'API金鑰',
    enableAPIKey: '啟用API金鑰',
    newAccountCreated:
      '剛剛為您建立了一個可以存取 <a href="{{serverURL}}">{{serverURL}}</a> 的新帳戶。請點擊以下連結或在瀏覽器中貼上以下網址以驗證您的電子郵件：<a href="{{verificationURL}}">{{verificationURL}}</a><br> 驗證您的電子郵件後，您將能夠成功登入。',
    resetYourPassword: '重設您的密碼',
    verified: '已驗證',
    verifyYourEmail: '驗證您的電子郵件',
    youAreReceivingResetPassword:
      '您收到此郵件是因為您（或其他人）已請求重設您帳戶的密碼。請點擊以下連結，或將其貼上到您的瀏覽器中以完成該過程：',
    youDidNotRequestPassword: '如果您沒有要求這樣做，請忽略這封郵件，您的密碼將保持不變。',
  },
  error: {
    deletingFile: '刪除文件時出現了錯誤。',
    emailOrPasswordIncorrect: '提供的電子郵件或密碼不正確。',
    followingFieldsInvalid_one: '下面的字串是無效的：',
    followingFieldsInvalid_other: '以下字串是無效的：',
    noFilesUploaded: '沒有上傳文件。',
    notAllowedToPerformAction: '您不被允許執行此操作。',
    problemUploadingFile: '上傳文件時出現了問題。',
    unableToDeleteCount: '無法從 {{total}} 個中刪除 {{count}} 個 {{label}}。',
    unableToUpdateCount: '無法從 {{total}} 個中更新 {{count}} 個 {{label}}。',
    unauthorized: '未經授權，您必須登錄才能提出這個請求。',
    userLocked: '該使用者由於有太多次失敗的登錄嘗試而被鎖定。',
    valueMustBeUnique: '數值必須是唯一的',
  },
  fields: {
    chooseBetweenCustomTextOrDocument: '選擇自定義文件或連結到另一個文件。',
    chooseDocumentToLink: '選擇要連結的文件',
    customURL: '自定義連結',
    enterURL: '輸入連結',
    internalLink: '內部連結',
    linkType: '連結類型',
    openInNewTab: '在新標籤中打開',
    textToDisplay: '要顯示的文字',
  },
  general: {
    createdAt: '建立於',
    deletedCountSuccessfully: '已成功刪除 {{count}} 個 {{label}}。',
    deletedSuccessfully: '已成功刪除。',
    email: '電子郵件',
    notFound: '未找到',
    successfullyCreated: '成功建立{{label}}',
    thisLanguage: '中文 (繁體)',
    updatedAt: '更新於',
    updatedCountSuccessfully: '已成功更新 {{count}} 個 {{label}}。',
    updatedSuccessfully: '更新成功。',
    user: '使用者',
    users: '使用者',
    value: '值',
  },
  upload: {
    fileName: '檔案名稱',
    fileSize: '檔案大小',
    height: '高度',
    sizes: '尺寸',
    width: '寬度',
  },
  validation: {
    emailAddress: '請輸入一個有效的電子郵件地址。',
    enterNumber: '請輸入一個有效的數字。',
    greaterThanMax: '{{value}}超過了允許的最大{{label}}，該最大值為{{max}}。',
    invalidInput: '這個字串有一個無效的輸入。',
    invalidSelection: '這個字串有一個無效的選擇。',
    invalidSelections: '這個字串有以下無效的選擇：',
    lessThanMin: '{{value}}小於允許的最小{{label}}，該最小值為{{min}}。',
    longerThanMin: '該值必須大於{{minLength}}字串的最小長度',
    notValidDate: '"{{value}}"不是一個有效的日期。',
    required: '該字串為必填項目。',
    requiresNoMoreThan: '該字串要求不超過 {{count}} 個 {{label}。',
    requiresTwoNumbers: '該字串需要兩個數字。',
    shorterThanMax: '該值長度必須小於{{maxLength}}個字元',
    trueOrFalse: '該字串只能等於是或否。',
    validUploadID: '該字串不是有效的上傳ID。',
  },
  version: {
    autosavedSuccessfully: '自動儲存成功。',
    draft: '草稿',
    draftSavedSuccessfully: '草稿儲存成功。',
    published: '已發佈',
    restoredSuccessfully: '回復成功。',
    status: '狀態',
  },
}
