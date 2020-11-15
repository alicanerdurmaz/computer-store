import React from 'react'
import ReactDOM from 'react-dom'
import TimesIcon from '../Icons/TimesIcon'

import styles from './Modal.module.css'
interface Props {
  visible: boolean
  children: React.ReactNode
  onClose?: () => any
}

const Modal = ({ visible, children, onClose }: Props) => {
  if (!visible || !process.browser) return null
  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.close} onClick={onClose}>
          <TimesIcon />
        </button>
        {children}
      </div>
    </div>,
    document?.getElementById('__next') as HTMLElement,
  )
}

export default Modal
