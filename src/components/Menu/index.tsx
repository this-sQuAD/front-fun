import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FontsIcon from '@fortawesome/free-solid-svg-icons';

import Input from '../Input'
import Botao from '../Botao'
import Option from '../Options';

import style from './menu.module.scss';
import { UsersHttpHelper } from '../../helpers/usersHttp';

export interface Payload {
  email: string;
  name: string;
  role?: string;
  id: string;
  password: string;
  confirmPassword: string
}

interface MenuProps {
  setNewEmployees: (payload: Payload) => void;
}

interface RegisterResponse {
  status: number;
}


export default function Menu(props: MenuProps) {

  const { setNewEmployees } = props;

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState('user');
  const [loadLogin, setLoadLogin] = useState(false);
  const [showP, setShowP] = useState(false);


  async function registerEmploye(event: FormEvent) {
    event.preventDefault();
    setLoadLogin(true)

    const payload: Payload = {
      id: uuidv4(),
      name: registerName,
      email: registerEmail,
      password: registerPassword,
      role: registerRole,
      confirmPassword: registerPassword,
    }

    const registerEmployeeApi = async () => {
        const response = await UsersHttpHelper.registerEmployee(payload) as RegisterResponse;

      if (response.status !== 201) {
        setShowP(true)
        setTimeout(() => {
          setShowP(false)
        }, 4000)
      } else {
        setNewEmployees(payload)

        setRegisterEmail('')
        setRegisterName('')
        setRegisterPassword('')
        setRegisterRole('user')
      }
    }

    registerEmployeeApi();
    setLoadLogin(false)
  }

  return (
    <section className={style.menuPrincipal}>
      <aside className={style.menuPrincipal__register}>
        <h3>Preencha as informações</h3>
        <p>Coloque as informações para cadastrar um funcionário na empresa!</p>
        <form onSubmit={registerEmploye}>
          <Input
            id='inputFullname'
            label='Nome Completo'
            placeholder='Digite o nome completo'
            required={true}
            type='text'
            status={false}
            icon={<FontAwesomeIcon icon={FontsIcon.faUser} />}
            valor={registerName}
            aoAlterado={valor => setRegisterName(valor)}
          />
          <Input
            id='inputEmail'
            label='E-mail'
            placeholder='Digite o e-mail'
            required={true}
            type='email'
            status={false}
            valor={registerEmail}
            aoAlterado={valor => setRegisterEmail(valor)}
          />
          <Input
            id='inputPassword'
            label='Password'
            placeholder='Digite a senha'
            required={true}
            type='password'
            status={false}
            valor={registerPassword}
            aoAlterado={valor => setRegisterPassword(valor)}
          />
          <Option
            options={[{ valor: 'admin', label: 'Admin' }, { valor: 'user', label: 'User' }]}
            idSelect='roleEmployee'
            required={true}
            valor={registerRole}
            aoAlterado={valor => setRegisterRole(valor)}
          />
          <Botao
            icon={<FontAwesomeIcon pulse={loadLogin} icon={loadLogin ? FontsIcon.faSpinner : FontsIcon.faSave} />}
            children='Cadastrar'
            disabled={!registerEmail || !registerName || !registerPassword}
          />
          {<span style={{display: (showP ? 'block' : 'none')}}>Erro ao realizar requisição!!</span>}
        </form>
      </aside>
    </section>
  )
}