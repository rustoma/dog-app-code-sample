import React, { FC, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Button, ButtonProps } from '@/components/common/Button/Button'
import {
  Body,
  Content,
  Footer,
  Header,
  ModalWindow,
  Title
} from '@/components/common/Modal/styles/ModalStyles'

interface ModalProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  closeLabel: string
  submitLabel: string
  submitProps?: ButtonProps
}

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  closeLabel,
  submitLabel,
  submitProps,
  children
}) => {
  useEffect(() => {
    const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [onClose])

  if (!open) return null

  return ReactDOM.createPortal(
    <ModalWindow onClick={onClose}>
      <Content onClick={e => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Body>{children}</Body>
        <Footer>
          <Button variant="secondary" onClick={onClose}>
            {closeLabel}
          </Button>
          <Button onClick={onSubmit} {...submitProps}>
            {submitLabel}
          </Button>
        </Footer>
      </Content>
    </ModalWindow>,
    document.getElementById('root') as HTMLElement
  )
}
