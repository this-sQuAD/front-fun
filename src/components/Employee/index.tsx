import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FontsIcon from '@fortawesome/free-solid-svg-icons';
import profileDefault from '../../assets/images/profile.png'

import Botao from '../Botao';
import style from './employee.module.scss';
import { FormEvent, useContext } from 'react';
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

  const { handleOpenDeleteModal } = useContext(EmployeesContext)
  

  const editEmployee = (event: FormEvent) => {
    event.preventDefault();
  }

  async function handleDeleteEmployee() {
    handleOpenDeleteModal(props)
  }

  return (
    <div className={style.employee}>
      <form onSubmit={editEmployee}>
        <section className={style.employee__content}>
          <img src={profileDefault} alt="luffy de perfil" />
          <h3>{nome}</h3>
          <span>{email}</span>
          <span>{role}</span>
          <div className={style.employee__content__actions}>
            <Botao
              children='Editar'
              icon={<FontAwesomeIcon icon={FontsIcon.faPencil} />}
            />
            <Botao
              onDeleteEmployee={handleDeleteEmployee}
              icon={<FontAwesomeIcon icon={FontsIcon.faTrash} color='' />}
            />
          </div>
        </section>
      </form>
    </div>
  )
}