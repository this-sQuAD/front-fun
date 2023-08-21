import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FontsIcon from '@fortawesome/free-solid-svg-icons';
import profileDefault from '../../assets/images/profile.png'

import Botao from '../Botao';
import style from './employee.module.scss';
import { useContext } from 'react';
import { EmployeesContext } from '../../views/Home';

interface EmployeeProps {
  id: string;
  nome: string;
  role: string;
  email: string;
}

export default function Employee(props: EmployeeProps) {

  const {
    nome,
    role,
    email
  } = props

  const { fillFormToEditEmployee, handleOpenDeleteModal } = useContext(EmployeesContext)
  

  function handleEditEmployee() {
    fillFormToEditEmployee(props)
  }

  async function handleDeleteEmployee() {
    handleOpenDeleteModal(props)
  }

  return (
    <div className={style.employee}>
      <section className={style.employee__content}>
        <img src={profileDefault} alt="luffy de perfil" />
        <h3>{nome}</h3>
        <span>{email}</span>
        <span>{role}</span>
        <div className={style.employee__content__actions}>
          <Botao
            children='Editar'
            triggerFunction={handleEditEmployee}
            icon={<FontAwesomeIcon icon={FontsIcon.faPencil} />}
          />
          <Botao
            triggerFunction={handleDeleteEmployee}
            icon={<FontAwesomeIcon icon={FontsIcon.faTrash} color='' />}
          />
        </div>
      </section>
    </div>
  )
}