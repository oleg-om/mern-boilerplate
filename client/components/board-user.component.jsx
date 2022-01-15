import { useState, useEffect } from 'react'

import UserService from '../services/user.service'
import EventBus from '../common/EventBus'

const BoardUser = () => {
  const [content, setContent] = useState('')
  console.log(content)
  useEffect(() => {
    UserService.getUserBoard().then(
      () => {},
      (error) => {
        const contentError =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        setContent(contentError)

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout')
        }
      }
    )
  }, [])

  return () => {}
}

export default BoardUser
