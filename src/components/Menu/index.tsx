import { FormEvent, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FontsIcon from '@fortawesome/free-solid-svg-icons';

import Input from '../Input'
import Botao from '../Botao'
import Option from '../Options';

import style from './menu.module.scss';
import { UsersHttpHelper } from '../../helpers/usersHttp';
import { EmployeesContext } from '../../views/Home';

export interface Payload {
  email: string;
  name: string;
  role?: string;
  id?: string;
  password: string;
  confirmPassword: string
}

interface MenuProps {
  setNewEmployees: (payload: Payload) => void;
}

interface StatusCodeApiResponse {
  status: number;
}

export default function Menu(props: MenuProps) {  
  const { setNewEmployees } = props;
  const { employeeToEdit, fillFormToEditEmployee, populateUsers } = useContext(EmployeesContext);

  const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: 'user'
  }

  const [formData, setFormData] = useState(initialFormData);
  const {name, email, password, role} = formData
  const [loadLogin, setLoadLogin] = useState(false);
  const [showP, setShowP] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if(employeeToEdit) {
      setFormData({
        name: employeeToEdit.nome,
        email: employeeToEdit.email,
        password: '',
        role: employeeToEdit.role
      })

      setSelectedOption(employeeToEdit.role)
    }
  }, [employeeToEdit])

  const registerEmployeeApi = async () => {
    const payload: Payload = {
      id: uuidv4(),
      name: name,
      email: email,
      password: password,
      role: role,
      confirmPassword: password,
    }

    const response = await UsersHttpHelper.registerEmployee(payload) as StatusCodeApiResponse;

    if (response.status !== 201) {
      setShowP(true)
      setTimeout(() => {
        setShowP(false)
      }, 4000)
    } else {
      setNewEmployees(payload)

      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user'
      })
    }
  }

  async function registerEmployee(event: FormEvent) {
    event.preventDefault();
    setLoadLogin(true)
    await registerEmployeeApi();
    setLoadLogin(false)
  }

  async function editEmployee(event: FormEvent) {
    event.preventDefault();
    setLoadLogin(true)

    const payload: Payload = {
      name,
      email,
      password,
      role,
      confirmPassword: password,
    }

    if (employeeToEdit) {
      const response = await UsersHttpHelper.updateEmployee(employeeToEdit.id, payload) as StatusCodeApiResponse;

      if (response.status !== 201) {
        setShowP(true)
        setTimeout(() => {
          setShowP(false)
        }, 4000)
      } else {
        fillFormToEditEmployee(null)
        setFormData(initialFormData)
        setLoadLogin(false)
        populateUsers()
      }
    }
  }

  return (
    <section className={style.menuPrincipal}>
      <aside className={style.menuPrincipal__register}>
        <h3>Preencha as informações</h3>
        <p>Coloque as informações para {employeeToEdit ? 'editar' : 'cadastrar'} um funcionário na empresa!</p>
        {
          employeeToEdit
          ? (
              <form onSubmit={editEmployee}>
                <Input
                  id='inputFullname'
                  label='Nome Completo'
                  placeholder='Digite o nome completo'
                  required={true}
                  type='text'
                  status={false}
                  icon={<FontAwesomeIcon icon={FontsIcon.faUser} />}
                  valor={name}
                  aoAlterado={valor => setFormData({...formData, name: valor})}
                />
                <Input
                  id='inputEmail'
                  label='E-mail'
                  placeholder='Digite o e-mail'
                  required={true}
                  type='email'
                  status={false}
                  valor={email}
                  aoAlterado={valor => setFormData({...formData, email: valor})}
                />
                <Input
                  id='inputPassword'
                  label='Password'
                  placeholder='Digite a senha'
                  required={true}
                  type='password'
                  status={false}
                  valor={password}
                  aoAlterado={valor => setFormData({...formData, password: valor})}
                />
                <Option
                  options={[{ valor: 'admin', label: 'Admin' }, { valor: 'user', label: 'User' }]}
                  idSelect='roleEmployee'
                  selectValue={selectedOption}
                  required={true}
                  valor={role}
                  aoAlterado={valor => {
                    setFormData({...formData, role: valor})
                    setSelectedOption(valor)
                  }}
                />
                <Botao
                  icon={<FontAwesomeIcon pulse={loadLogin} icon={loadLogin ? FontsIcon.faSpinner : FontsIcon.faPencil} />}
                  children='Editar'
                  disabled={!email || !name || !password}
                />
                {<span style={{display: (showP ? 'block' : 'none')}}>Erro ao realizar requisição!!</span>}
              </form>
          ) : (
              <form onSubmit={registerEmployee}>
                <Input
                  id='inputFullname'
                  label='Nome Completo'
                  placeholder='Digite o nome completo'
                  required={true}
                  type='text'
                  status={false}
                  icon={<FontAwesomeIcon icon={FontsIcon.faUser} />}
                  valor={name}
                  aoAlterado={valor => setFormData({...formData, name: valor})}
                />
                <Input
                  id='inputEmail'
                  label='E-mail'
                  placeholder='Digite o e-mail'
                  required={true}
                  type='email'
                  status={false}
                  valor={email}
                  aoAlterado={valor => setFormData({...formData, email: valor})}
                />
                <Input
                  id='inputPassword'
                  label='Password'
                  placeholder='Digite a senha'
                  required={true}
                  type='password'
                  status={false}
                  valor={password}
                  aoAlterado={valor => setFormData({...formData, password: valor})}
                />
                <Option
                  options={[{ valor: 'admin', label: 'Admin' }, { valor: 'user', label: 'User' }]}
                  idSelect='roleEmployee'
                  required={true}
                  valor={role}
                  aoAlterado={valor => setFormData({...formData, role: valor})}
                />
                <Botao
                  icon={<FontAwesomeIcon pulse={loadLogin} icon={loadLogin ? FontsIcon.faSpinner : FontsIcon.faSave} />}
                  children='Cadastrar'
                  disabled={!email || !name || !password}
                />
                {<span style={{display: (showP ? 'block' : 'none')}}>Erro ao realizar requisição!!</span>}
              </form>
          )
        }
      </aside>
    </section>
  )
}