import React from 'react'
import { Modal } from 'react-bootstrap'
import '../../src/index.css'
interface ModalProps {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onClose?: (title?: string) => void
}

export const CustomModal: React.FC<ModalProps> = ({
  title,
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Modal className="my-modal" show={isOpen} onHide={onClose}>
      <Modal.Header className="justifyCctr">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '1rem 2rem 1rem 2rem' }}>
        {children}
      </Modal.Body>
    </Modal>
  )
}
