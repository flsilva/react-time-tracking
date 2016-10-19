import React from 'react'

const ErrorMessages = (props) => {
  let errors = props.error
  if (typeof errors === 'string') {
    errors = [errors]
  }

  const renderItem = (message, index) => {
    return (
      <p key={index}>
        {message}
      </p>
    )
  }

  return (
    <div className="ErrorMessages">
      {errors ? errors.map(renderItem) : null}
    </div>
  )
}

export default ErrorMessages

