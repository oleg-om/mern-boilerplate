import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Modal } from 'react-bootstrap'
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
  getAccountsByPage,
  updateAccount,
  deleteAccount
} from '../redux/reducers/accounts'
import Head from './head'
import Pagination from './common/pagination'
import currencyList from '../lists/currencies'
import accountTypeList from '../lists/accountTypes'

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
  const { t } = useTranslation()
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
          {type === 'add' ? t('Add account') : t('Edit account')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              {t('Account name')}
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
              {t('Account currency')}
            </label>
            <select
              className="form-control"
              id="exampleInputPassword1"
              value={state.currency}
              onChange={onChange}
              name="currency"
            >
              <option value="" disabled>
                {t('Choose currency')}
              </option>
              {currencyList.map((it) => {
                return (
                  <option value={it} key={it}>
                    {t(it)}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              {t('Account type')}
            </label>
            <select
              className="form-control"
              id="exampleInputPassword1"
              value={state.type}
              onChange={onChange}
              name="type"
            >
              <option value="" disabled>
                {t('Choose type')}
              </option>
              {accountTypeList.map((it) => {
                return (
                  <option value={it} key={it}>
                    {t(it)}
                  </option>
                )
              })}
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit" className="btn btn-primary" onClick={func}>
          {t('Submit')}
        </button>
        <button type="submit" className="btn btn-danger ms-2" onClick={onCancel}>
          {t('Cancel')}
        </button>
      </Modal.Footer>
    </Modal>
  )
}

const RemoveAccount = ({ func, onHide, show, name }) => {
  const { t } = useTranslation()
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('Are you shure?')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('Account')} {name} {t('will be deleted')}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit" className="btn btn-primary" onClick={func}>
          {t('Submit')}
        </button>
        <button type="submit" className="btn btn-danger ms-2" onClick={onHide}>
          {t('Cancel')}
        </button>
      </Modal.Footer>
    </Modal>
  )
}

const Accounts = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { list, isLoaded, numberOfPages } = useSelector((state) => state.accounts)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getAccountsByPage(user.id, page))
  }, [dispatch, page])

  const [type, setType] = useState('list')
  const [id, setId] = useState('')
  const [itemName, setItemName] = useState('')

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
  const [modalRemove, setModalRemove] = useState(false)

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

  const onDelete = (item) => {
    setModalRemove(true)
    setId(item.id)
    setItemName(item.name)
  }

  const deleteIt = () => {
    dispatch(deleteAccount(id))
    setModalRemove(false)
    notify('Account is deleted')
  }

  return (
    <div className="container">
      <Head title="Accounts" />
      <ToastContainer />
      <h3>{t('Accounts')}</h3>
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
                onClick={() => onDelete(it)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </span>
          </div>
        ))}
      {isLoaded && list && list.length <= 0 && <p>{t('List is empty')}</p>}
      {!isLoaded && (
        <div className="d-flex justify-content-center  m-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">{t('Loading')}...</span>
          </div>
        </div>
      )}
      <Pagination quantity={numberOfPages} active={page} func={setPage} />
      <button type="button" className="btn btn-success" onClick={() => onAdd()}>
        {t('Add new account')}
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
      {modalRemove && (
        <RemoveAccount
          func={deleteIt}
          show={modalRemove}
          onHide={() => setModalRemove(false)}
          name={itemName}
        />
      )}
    </div>
  )
}

export default Accounts
