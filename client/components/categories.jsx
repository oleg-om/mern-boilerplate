import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import cx from 'classnames'
import 'react-toastify/dist/ReactToastify.css'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {
  createCategory,
  getCategorysByPage,
  updateCategory,
  deleteCategory
} from '../redux/reducers/categories'
import Head from './head'
import Pagination from './common/pagination'
import GetIcon from './common/icons'
import IconList from '../lists/categoryIcons'
import IconColors from '../lists/categoryColors'

// const getCurrencySign = (sign) => {
//   const getSign = () => {
//     if (sign === 'RUB') {
//       return faRubleSign
//     }
//     if (sign === 'USD') {
//       return faDollarSign
//     }
//     if (sign === 'EUR') {
//       return faEuroSign
//     }
//     return 'faQuestionCircle'
//   }
//   return <FontAwesomeIcon icon={getSign()} className="text-secondary" />
// }

const AddCategory = ({ func, state, onChange, onCancel, onHide, show, type, onDelete }) => {
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
          {type === 'add' ? 'Add category' : 'Edit category'}
        </Modal.Title>
      </Modal.Header>{' '}
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Category name
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
              Choose category icon
            </label>
            <div className="d-flex flex-wrap justify-content-between my-2">
              {IconList.map((icon) => (
                <div className={`col-2 m-2 text-center ${state.color}__text`} key={icon}>
                  <button
                    type="button"
                    onClick={onChange}
                    name="icon"
                    value={icon}
                    className={cx(`  ${state.color}__text`, {
                      active__icon: state.icon === icon
                    })}
                  >
                    <FontAwesomeIcon icon={GetIcon(icon)} size="2x" />
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="exampleInputPassword1" className="form-label">
              Choose icon color
            </label>
            <span className="d-flex flex-row justify-content-center">
              {IconColors.map((color) => (
                <button
                  type="button"
                  onClick={onChange}
                  name="color"
                  value={color}
                  className={`col-2 m-2 text-center ${color}__bg color__icon ${
                    state.color === color ? 'active__icon' : ''
                  }`}
                  key={color}
                />
              ))}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Category type
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
              {['income', 'costs'].map((it) => {
                return (
                  <option value={it} key={it}>
                    {it}
                  </option>
                )
              })}
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit" className="btn btn-primary" onClick={func}>
          Submit
        </button>
        {type === 'add' ? (
          <button type="submit" className="btn btn-danger ms-2" onClick={onCancel}>
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-danger ms-2"
            onClick={() => onDelete(state)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

const RemoveCategory = ({ func, onHide, show, name }) => {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Are you shure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Category {name} will be deleted</p>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit" className="btn btn-primary" onClick={func}>
          Submit
        </button>
        <button type="submit" className="btn btn-danger ms-2" onClick={onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  )
}

const Categories = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { list, isLoaded, numberOfPages } = useSelector((state) => state.categories)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getCategorysByPage(user.id, page))
  }, [dispatch, page])

  const [type, setType] = useState('list')
  const [id, setId] = useState('')
  const [itemName, setItemName] = useState('')

  const [state, setState] = useState({
    name: '',
    icon: 'faHeart',
    type: '',
    color: 'sunray',
    userId: user.id
  })

  const clearState = () => {
    setState({
      name: '',
      icon: 'faHeart',
      type: '',
      color: 'sunray',
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
    if (state.name && state.icon && state.type) {
      dispatch(createCategory(state))
      notify('Category is created')
      setType('list')
      clearState()
    } else {
      notify('Fill in all the fields')
    }
  }

  const update = () => {
    if (state.name && state.icon && state.type) {
      dispatch(updateCategory(id, state))
      notify('Category is updated')
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
    setModalShow(false)
  }

  const deleteIt = () => {
    dispatch(deleteCategory(id))
    setModalRemove(false)
    notify('Category is deleted')
  }

  return (
    <div className="container">
      <Head title="Categorys" />
      <ToastContainer />
      <h3>Categories</h3>
      {/* {isLoaded &&
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
        ))} */}
      <div className="d-flex flex-wrap">
        {isLoaded &&
          list &&
          list.length > 0 &&
          list.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => onEdit(it)}
              className={`${it.color}__text d-flex flex-column align-items-center m-3`}
            >
              <FontAwesomeIcon icon={GetIcon(it.icon)} size="2x" />
              <p>{it.name}</p>
            </button>
          ))}
      </div>
      {isLoaded && list && list.length <= 0 && <p>List is empty</p>}
      {!isLoaded && (
        <div className="d-flex justify-content-center  m-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <Pagination quantity={numberOfPages} active={page} func={setPage} />
      <button type="button" className="btn btn-success" onClick={() => onAdd()}>
        Add new category
      </button>
      {type === 'add' && (
        <AddCategory
          func={create}
          state={state}
          onChange={onChange}
          onCancel={onCancel}
          show={modalShow}
          onHide={() => setModalShow(false)}
          type={type}
          onDelete={onDelete}
        />
      )}
      {type === 'edit' && (
        <AddCategory
          func={update}
          state={state}
          onChange={onChange}
          onCancel={onCancel}
          show={modalShow}
          onHide={() => setModalShow(false)}
          type={type}
          onDelete={onDelete}
        />
      )}
      {modalRemove && (
        <RemoveCategory
          func={deleteIt}
          show={modalRemove}
          onHide={() => setModalRemove(false)}
          name={itemName}
        />
      )}
    </div>
  )
}

export default Categories
