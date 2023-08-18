import { useContext } from 'react';
import Modal from 'react-modal';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { EmployeeToDelete, EmployeesContext } from '../../views/Home';

import style from './deleteModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ModalPropsType {
  // children: ReactNode;
  deleteModalIsOpen: boolean;
  employeeToDelete: EmployeeToDelete | null;
  closeDeleteModal: () => void;
}

export function DeleteModal({ deleteModalIsOpen, employeeToDelete, closeDeleteModal }: ModalPropsType) {
  const { deleteEmployees } = useContext(EmployeesContext)

  function handleDeleteEmployee(id: string) {
    deleteEmployees(id)
  }

  if (!deleteModalIsOpen || !employeeToDelete) {
    return null;
  }

  return (
    <Modal
    className={style.modal}
    overlayClassName={style.modal_overlay}
    isOpen={deleteModalIsOpen}
    onRequestClose={closeDeleteModal}
    contentLabel="Example Modal"
  >
    <header>
      <FontAwesomeIcon icon={faTrash} size='2x' color='#c61d1d' />
      <h2>Tem certeza que deseja excluir o funcionário?</h2>
    </header>
    <div className={style.modal__funcionario}>
      <span>{employeeToDelete?.nome}</span>
      <span>{employeeToDelete?.email}</span>
    </div>
    <div className={style.modal__actions}>
      <button onClick={closeDeleteModal}>Cancelar</button>
      <button onClick={() => handleDeleteEmployee(employeeToDelete.id)}>Excluir</button>
    </div>
  </Modal>
  )
}