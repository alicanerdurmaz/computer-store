import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import styles from './AuthForm.module.css'
import { API_Login, API_Signup } from 'src/utils/api'
import { AuthDto } from 'src/utils/auth-form.dto'
import Button from '../Button/Button'

interface FormData {
  email: string
  password: string
}
interface Props {
  activePage: 'Log in' | 'Sign up'
}

const AuthForm = ({ activePage }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { register, unregister, handleSubmit, errors } = useForm<FormData>({
    defaultValues: { email: 'alican@computerstore.com', password: 'ComputerStore!' },
  })
  const [submitting, setSubmitting] = useState(false)

  const submitHandler = async (formData: FormData) => {
    setSubmitting(true)

    const result =
      activePage === 'Log in'
        ? await API_Login(formData.email, formData.password)
        : await API_Signup('alican', formData.email, formData.password)

    result?.error ? setServerError(result.error) : console.log(result.accessToken)

    setSubmitting(false)
  }
  useEffect(() => {
    unregister(['email', 'password'])
    register()
  }, [activePage])

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
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

      <div className={styles.btn_submit}>
        <Button type="submit" disabled={submitting}>
          {activePage}
        </Button>
      </div>
    </form>
  )
}

export default AuthForm
