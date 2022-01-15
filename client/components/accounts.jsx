import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEdit,
  faTrashAlt,
  faRubleSign,
  faDollarSign,
  faEuroSign
} from '@fortawesome/free-solid-svg-icons'
import {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount
} from '../redux/reducers/accounts'
import Head from './head'

const getCurrencySign = (sign) => {
  const getSign = () => {
    if (sign === 'RUB') {
      return faRubleSign
    }
    if (sign === 'USD') {
      return faDollarSign
    }
    if (sign === 'EUR') {
      return faEuroSign
    }
    return 'faQuestionCircle'
  }
  return <FontAwesomeIcon icon={getSign()} className="text-secondary" />
}

const AddAccount = ({ func, state, onChange, onCancel, onHide, show, type }) => {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {type === 'add' ? 'Add account' : 'Edit account'}
        </Modal.Title>
      </Modal.Header>{' '}
      <Modal.Body>
        <form>
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
          <button type="submit" className="btn btn-primary ms-2" onClick={onCancel}>
            Cancel
          </button>
        </form>{' '}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const Accounts = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { list, isLoaded } = useSelector((state) => state.accounts)

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
  const [modalShow, setModalShow] = useState(false)

  const onEdit = (acc) => {
    setType('edit')
    setId(acc.id)
    setState(acc)
    setModalShow(true)
  }
  const onAdd = () => {
    setType('add')
    setModalShow(true)
  }
  const onCancel = () => {
    setType('list')
    clearState()
  }

  const onDelete = (itemId) => {
    dispatch(deleteAccount(itemId))
    notify('Account is deleted')
  }

  return (
    <div className="container">
      <Head title="Accounts" />
      <ToastContainer />
      <h3>Accounts</h3>
      {isLoaded &&
        list &&
        list.length > 0 &&
        list.map((it) => (
          <div
            className="d-flex flex-row justify-content-between border border-light rounded-lg mb-2 p-2"
            key={it.id}
          >
            <span className="d-flex flex-row align-items-center">
              {getCurrencySign(it.currency)}
              <button type="button" className="btn m-0 ms-2 fw-bold" onClick={() => onEdit(it)}>
                {it.name}
              </button>
            </span>
            <span className="d-flex flex-row">
              <button type="button" className="btn btn-outline-primary" onClick={() => onEdit(it)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                type="button"
                className="btn btn-outline-danger ms-2"
                onClick={() => onDelete(it.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </span>
          </div>
        ))}
      {isLoaded && list.length <= 0 && <p>List is empty</p>}
      {!isLoaded && (
        <div className="d-flex justify-content-center  m-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <button type="button" className="btn btn-success" onClick={() => onAdd()}>
        Add new account
      </button>
      {type === 'add' && (
        <AddAccount
          func={create}
          state={state}
          onChange={onChange}
          onCancel={onCancel}
          show={modalShow}
          onHide={() => setModalShow(false)}
          type={type}
        />
      )}
      {type === 'edit' && (
        <AddAccount
          func={update}
          state={state}
          onChange={onChange}
          onCancel={onCancel}
          show={modalShow}
          onHide={() => setModalShow(false)}
          type={type}
        />
      )}
    </div>
  )
}

export default Accounts
