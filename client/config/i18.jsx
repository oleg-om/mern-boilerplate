import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          RUB: 'RUB',
          USD: 'USD',
          EUR: 'EUR',
          bank: 'Bank',
          cash: 'Cash',
          Previous: 'Previous',
          Next: 'Next',
          Accounts: 'Accounts',
          Account: 'Account',
          Dashboard: 'Dashboard',
          Categories: 'Categories',
          'List is empty': 'List is empty',
          Loading: 'Loading',
          'Add new account': 'Add new account',
          'Are you shure?': 'Are you shure?',
          'will be deleted': 'will be deleted',
          Submit: 'Submit',
          Cancel: 'Cancel',
          'Account name': 'Account name',
          'Account currency': 'Account currency',
          'Choose currency': 'Choose currency',
          'Account type': 'Account type',
          'Choose type': 'Choose type',
          'Add account': 'Add account',
          'Edit account': 'Edit account'
        }
      },
      ru: {
        translations: {
          RUB: 'Рубль',
          USD: 'Доллар',
          EUR: 'Евро',
          bank: 'Банк',
          cash: 'Наличные',
          Previous: 'Назад',
          Next: 'Дальше',
          Accounts: 'Счета',
          Account: 'Счет',
          Dashboard: 'Панель управления',
          Categories: 'Категории',
          'List is empty': 'Список пуст',
          Loading: 'Загрузка',
          'Add new account': 'Добавить новый счет',
          'Are you shure?': 'Вы уверены?',
          'will be deleted': 'будет удален',
          Submit: 'Подтвердить',
          Cancel: 'Отмена',
          'Account name': 'Название счета',
          'Account currency': 'Валюта',
          'Choose currency': 'Выберите валюту',
          'Account type': 'Тип счета',
          'Choose type': 'Выбери тип',
          'Add account': 'Добавить счет',
          'Edit account': 'Редактировать счет'
        }
      }
    },
    fallbackLng: 'en',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  })

export default i18n
