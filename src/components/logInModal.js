import React from "react"
import Modal from "react-modal"

import { isLoggedIn } from "../services/auth"

Modal.setAppElement(`#___gatsby`)

const LogInModal = () => (
  <Modal 
      isOpen={isLoggedIn()}
      contentLabel="Log In"
  >
    <p>Hello from the modal!</p>
  </Modal>
)

export default LogInModal
