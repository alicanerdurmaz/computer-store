import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import styles from './AuthForm.module.css'
import { API_Login, API_Signup, API_GetUser, API_MergeLocalStorageCartWithDatabase } from 'src/utils/api'
import { AuthDto } from 'src/utils/auth-form.dto'
import Button from '../Button/Button'
import { useRouter } from 'next/router'
import Spinner from '../Spinner/Spinner'
import { useUserContext } from 'src/context/UserContext/UserContext'

interface FormData {
  email: string
  password: string
  name: string
}
interface Props {
  activePage: 'Log in' | 'Sign up'
}

const AuthForm = ({ activePage }: Props) => {
  const router = useRouter()
  const { setAccessToken, dispatchUserState } = useUserContext()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { register, unregister, handleSubmit, errors } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
  })
  const [submitting, setSubmitting] = useState(false)

  const submitHandler = async (formData: FormData) => {
    setSubmitting(true)

    const result =
      activePage === 'Log in'
        ? await API_Login(formData.email, formData.password)
        : await API_Signup(formData.name, formData.email, formData.password)

    if (result.error) {
      setServerError(result.error)
    } else {
      setServerError(null)
      await API_MergeLocalStorageCartWithDatabase(result.accessToken)
      const user = await API_GetUser(result.accessToken)
      if (user) {
        setAccessToken(result.accessToken)
        dispatchUserState({
          type: 'save',
          payload: user,
        })
        router.push('/')
      }
    }

    setSubmitting(false)
  }
  useEffect(() => {
    unregister(['email', 'password'])
    register()
    setServerError(null)
  }, [activePage])

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
      {activePage === 'Sign up' ? (
        <div className={styles.input_container}>
          <label htmlFor="name">
            {errors.name ? <span className={styles.text_error}>{errors.name.message}</span> : 'Name'}
          </label>
          <input type="name" id="name" name="name" maxLength={30} ref={register(AuthDto[activePage].name)} />
        </div>
      ) : null}
      <div className={styles.input_container}>
        <label htmlFor="email">
          {errors.email ? <span className={styles.text_error}>{errors.email.message}</span> : 'Email'}
        </label>
        <input type="email" id="email" name="email" ref={register(AuthDto[activePage].email)} />
      </div>

      <div className={styles.input_container}>
        <label htmlFor="password">
          {errors.password ? <span className={styles.text_error}>{errors.password.message}</span> : 'Password'}
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          ref={register(AuthDto[activePage].password)}
        />
        <span title="Show Password" className={styles.show_password} onClick={() => setShowPassword(!showPassword)}>
          <span></span>
        </span>
      </div>
      <div className={styles.errr_info}>
        <p className={styles.text_error}>{serverError}</p>
      </div>
      {submitting ? (
        <Spinner className={styles.spinner} />
      ) : (
        <div className={styles.btn_submit}>
          <Button type="submit" disabled={submitting}>
            {activePage}
          </Button>
        </div>
      )}
    </form>
  )
}

export default AuthForm
