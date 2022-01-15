import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from '../head'
import Month from './month'
import { getAccounts } from '../../redux/reducers/accounts'

const Home = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { list } = useSelector((state) => state.accounts)
  const months = useSelector((state) => state.months.list)
  useEffect(() => {
    dispatch(getAccounts(user.id))
  }, [dispatch])

  return (
    <div>
      <Head title="Dashboard" />
      <Month accounts={list} months={months} />
    </div>
  )
}

Home.propTypes = {}

export default Home
