import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount
} from '../redux/reducers/accounts'

const AddAccount = ({ func, state, onChange, onCancel }) => {
  return (
    <form>
      <h3>{state.type === 'add' ? 'Add account' : 'Edit account'}</h3>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Account name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={state.name}
          onChange={onChange}
          name="name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Account currency
        </label>
        <select
          className="form-control"
          id="exampleInputPassword1"
          value={state.currency}
          onChange={onChange}
          name="currency"
        >
          {' '}
          <option value="" disabled>
            Choose currency
          </option>
          {['RUB', 'USD', 'EUR'].map((it) => {
            return (
              <option value={it} key={it}>
                {it}
              </option>
            )
          })}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Account type
        </label>
        <select
          className="form-control"
          id="exampleInputPassword1"
          value={state.type}
          onChange={onChange}
          name="type"
        >
          <option value="" disabled>
            Choose type
          </option>
          {['bank', 'cash'].map((it) => {
            return (
              <option value={it} key={it}>
                {it}
              </option>
            )
          })}
        </select>
      </div>

      <button type="submit" className="btn btn-primary" onClick={func}>
        Submit
      </button>
      <button type="submit" className="btn btn-primary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}

const Accounts = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { list } = useSelector((state) => state.accounts)
  useEffect(() => {
    dispatch(getAccounts(user.id))
  }, [dispatch])

  const [type, setType] = useState('list')
  const [id, setId] = useState('')

  const [state, setState] = useState({
    name: '',
    currency: '',
    type: '',
    userId: user.id
  })

  const clearState = () => {
    setState({
      name: '',
      currency: '',
      type: '',
      userId: user.id
    })
    setId('')
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  console.log(type)
  const notify = (notification) => toast(notification)
  const create = () => {
    if (state.name && state.currency && state.type) {
      dispatch(createAccount(state))
      notify('Account is created')
      setType('list')
      clearState()
    } else {
      notify('Fill in all the fields')
    }
  }

  const update = () => {
    if (state.name && state.currency && state.type) {
      dispatch(updateAccount(id, state))
      notify('Account is updated')
      setType('list')
      clearState()
    } else {
      notify('Fill in all the fields')
    }
  }

  const onEdit = (acc) => {
    setType('edit')
    setId(acc.id)
    setState(acc)
  }
  const onCancel = () => {
    setType('list')
    setId('')
    clearState()
  }

  const onDelete = (itemId) => {
    dispatch(deleteAccount(itemId))
    notify('Account is deleted')
  }

  return (
    <div className="container">
      <ToastContainer />
      <h3>Accounts</h3>
      {list &&
        list.length > 0 &&
        list.map((it) => (
          <div className="d-flex flex-row" key={it.id}>
            <p> {it.name}</p>
            <button type="button">
              <FontAwesomeIcon icon={faEdit} onClick={() => onEdit(it)} />
            </button>
            <button type="button">
              <FontAwesomeIcon icon={faTrashAlt} onClick={() => onDelete(it.id)} />
            </button>
          </div>
        ))}
      {list.length <= 0 && <p>List is empty</p>}
      <button type="button" onClick={() => setType('add')}>
        Add new account
      </button>
      {type === 'add' && (
        <AddAccount func={create} state={state} onChange={onChange} onCancel={onCancel} />
      )}
      {type === 'edit' && (
        <AddAccount func={update} state={state} onChange={onChange} onCancel={onCancel} />
      )}
    </div>
  )
}

export default Accounts
