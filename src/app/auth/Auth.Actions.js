export const EMAIL_SIGN_IN = 'EMAIL_SIGN_IN'
export const EMAIL_SIGN_IN_SUCCESS = 'EMAIL_SIGN_IN_SUCCESS'
export const EMAIL_SIGN_IN_ERROR = 'EMAIL_SIGN_IN_ERROR'
export const EMAIL_SIGN_UP = 'EMAIL_SIGN_UP'
export const EMAIL_SIGN_UP_SUCCESS = 'EMAIL_SIGN_UP_SUCCESS'
export const EMAIL_SIGN_UP_ERROR = 'EMAIL_SIGN_UP_ERROR'
export const EMAIL_SIGN_OUT = 'EMAIL_SIGN_OUT'

const _emailSignIn = (payload) => ({ type: EMAIL_SIGN_IN })
const emailSignInSuccess = (payload) => ({ type: EMAIL_SIGN_IN_SUCCESS, payload })
const emailSignInError = (payload) => ({ type: EMAIL_SIGN_IN_ERROR, payload })

const _emailSignUp = (payload) => ({ type: EMAIL_SIGN_UP })
const emailSignUpSuccess = (payload) => ({ type: EMAIL_SIGN_UP_SUCCESS, payload })
const emailSignUpError = (payload) => ({ type: EMAIL_SIGN_UP_ERROR, payload })

//const emailSignOut = () => ({ type: EMAIL_SIGN_OUT })

export const emailSignIn = (email, password) => (
  (dispatch) => {
    dispatch(_emailSignIn())

    const errorHandler = (err) => {
      dispatch(emailSignInError(err))
    }

    const opts = {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email: email,
        password: password
      })
    }

    return fetch('http://127.0.0.1:3000/auth/sign_in', opts)
      .then((response) => {
        console.log('Auth.Actions().emailSignIn().then() - response: ', response); 
        response.json().then(json => {
          console.log('Auth.Actions().emailSignIn().then() - json: ', json); 
          if (response.ok) {
            dispatch(emailSignInSuccess(json.data))
          } else {
            const error = (json.errors.full_messages) ? json.errors.full_messages : json.errors
            errorHandler(error)
          }
        })
      }).catch(function(err) {
        console.log('Auth.Actions().emailSignIn().catch() - err: ', err); 
        errorHandler(err)
      })
  }
)

export const emailSignUp = (email, password, confirmPassword) => (
  (dispatch) => {
    dispatch(_emailSignUp())

    const errorHandler = (error, reject) => {
      console.log('emailSignUp().errorHandler() - error: ', error)

      let _error

      if (error && error.full_messages) {
        _error = error.full_messages
      } else if (error) {
        _error = error
      } else {
        _error = 'There was an error trying to sign you up, please try again.'
      }

      dispatch(emailSignUpError(_error))
      reject(_error)
    }

    const opts = {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        confirm_success_url: 'http://127.0.0.1:3001/sign-up/confirmation'
      })
    }

    return new Promise((resolve, reject) => {
      fetch('http://127.0.0.1:3000/auth', opts)
        .then((response) => {
          console.log('Auth.Actions().emailSignIn().then() - response: ', response); 
          response.json().then(json => {
            console.log('Auth.Actions().emailSignIn().then() - json: ', json); 
            if (response.ok) {
              const user = json.data
              dispatch(emailSignUpSuccess(user))
              resolve(user)
            } else {
              errorHandler(json.errors, reject)
            }
          })
        }).catch(function(error) {
          console.log('Auth.Actions().emailSignIn().catch() - error: ', error); 
          errorHandler(error, reject)
        })
    })
  }
)
