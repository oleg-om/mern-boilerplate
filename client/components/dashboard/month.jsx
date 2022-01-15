import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { createMonth } from '../../redux/reducers/months'

const AddNew = ({ func, state, onChange, onCancel, accounts }) => {
  return (
    <form>
      <h3>{state.type === 'add' ? 'Add account' : 'Edit account'}</h3>
      {accounts.map((account) => (
        <div className="mb-3" key={account.id}>
          <label htmlFor={account.id} className="form-label">
            {account.name} ({account.currency})
          </label>
          <input
            type="number"
            className="form-control"
            id={account.id}
            placeholder="Type number..."
            aria-describedby={account.id}
            value={state[account.id]}
            onChange={onChange}
          />
        </div>
      ))}
      <div className="mb-3">
        <label htmlFor="comment" className="form-label">
          Comment
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Have some special comment?"
          id="comment"
          aria-describedby="emailHelp"
          value={state.name}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="comment" className="form-label">
          Exchange rate
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Have some special comment?"
          id="comment"
          aria-describedby="emailHelp"
          value={state.name}
          onChange={onChange}
        />
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

const Month = ({ accounts }) => {
  const dispatch = useDispatch()
  const [type, setType] = useState('')
  const [state, setState] = useState({})
  const notify = (notification) => toast(notification)
  const create = () => {
    if (state.name && state.currency && state.type) {
      dispatch(createMonth(state))
      notify('Account is created')
      setType('list')
      // clearState()
    } else {
      notify('Fill in all the fields')
    }
  }
  console.log(state)
  const onChange = (e) => {
    const { id, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }
  const onCancel = () => {
    setType('list')
    // clearState()
  }
  return (
    <div>
      <ToastContainer />
      <h3>Finance table</h3>
      <button type="button" onClick={() => setType('add')}>
        Add new account
      </button>
      {type === 'add' && (
        <AddNew
          func={create}
          state={state}
          onChange={onChange}
          onCancel={onCancel}
          accounts={accounts}
        />
      )}
    </div>
  )
}

export default Month
