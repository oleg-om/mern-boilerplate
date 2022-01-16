import React, { useEffect } from 'react'
import cx from 'classnames'

const Pagination = ({ quantity, active, func }) => {
  const total = Number(quantity)
  const page = Number(active)
  const array = Array.from({ length: quantity }, (v, k) => k + 1).filter(
    (it) =>
      it === page ||
      it === page + 1 ||
      it === page + 2 ||
      it === page + 3 ||
      it === page - 1 ||
      it === page - 2
  )

  const Numbers = () => {
    return array.map((it, id) => (
      <li key={`${it}${id}`} className="page-item">
        <button
          type="button"
          className={cx('page-link', {
            'bg-primary text-white': it === page
          })}
          onClick={() => func(it)}
        >
          {it}
        </button>
      </li>
    ))
  }

  useEffect(() => {}, [])
  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-end">
        <li
          className={cx('page-item', {
            disabled: page <= 1
          })}
        >
          <button
            type="button"
            className="page-link"
            tabIndex="-1"
            aria-disabled="true"
            onClick={() => (page <= 1 ? () => {} : func(page - 1))}
          >
            Previous
          </button>
        </li>
        <Numbers />
        <li
          className={cx('page-item', {
            disabled: page >= total
          })}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => (page >= total ? () => {} : func(page + 1))}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
