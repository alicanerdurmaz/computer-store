import React, { useState } from 'react'

import styles from './index.module.css'
import AuthForm from '../../src/components/Form/AuthForm'
import Button from 'src/components/Button/Button'

const Login = () => {
  const [activePage, setActivePage] = useState<'Log in' | 'Sign up'>('Log in')
  return (
    <div className={styles.container}>
      <div className={styles.btn_group}>
        <Button
          style={{ marginRight: '0.5px' }}
          className={activePage === 'Log in' ? styles.active : null}
          onClick={() => setActivePage('Log in')}
        >
          Log in
        </Button>
        <Button className={activePage === 'Sign up' ? styles.active : null} onClick={() => setActivePage('Sign up')}>
          Sign up
        </Button>
      </div>
      <AuthForm activePage={activePage}></AuthForm>
    </div>
  )
}

export default Login
