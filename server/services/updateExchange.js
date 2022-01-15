const axios = require('axios')

const Schema = require('../model/general.model')

async function takeProducts() {
  const currency = axios.get(`https://api.exmo.com/v1/ticker/`)
  const cur = await currency

  const { data } = cur

  const body = {
    USD: data.USD_RUB.sell_price,
    updateDate: new Date()
  }

  await Schema.findOneAndUpdate(
    { id: undefined },
    { $set: body },
    { upsert: false, useFindAndModify: false }
  )
  console.log('exchange rates are updated')
}

module.exports = takeProducts
