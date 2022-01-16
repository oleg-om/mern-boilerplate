const axios = require('axios')

const Schema = require('../model/general.model')

async function takeProducts() {
  const currency = axios.get(process.env.CURRENCY_API)
  const cur = await currency

  const { data } = cur
  const body = {
    USD: data.Valute.USD.Value,
    EUR: data.Valute.EUR.Value,
    updateDate: new Date()
  }

  await Schema.findOneAndUpdate(
    { id: undefined },
    { $set: body },
    { upsert: false, useFindAndModify: false }
  )
  console.log(
    `exchange rates are updated, USD: ${data.Valute.USD.Value}, EUR: ${data.Valute.EUR.Value}`
  )
}

module.exports = takeProducts
