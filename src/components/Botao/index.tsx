import style from './botao.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as FontsIcon from '@fortawesome/free-solid-svg-icons';
import { ReactNode } from 'react';

type InputType = 'button' | 'submit' | 'reset';

interface BotaoProps {
  icon: ReactNode;
  type?: InputType;
  children?: string;
  disabled?: boolean;
  triggerFunction?: () => void;
}

export default function Botao(props: BotaoProps) {

  const {
    icon = <FontAwesomeIcon icon={FontsIcon.faSignIn}/>,
    type,
    children,
    disabled,
    triggerFunction
  } = props

  return (
    <button
      className={style.btnStyle}
      type={type}
      disabled={disabled}
      onClick={triggerFunction}
      >
      <span>{icon}</span>
      {children}
    </button>
  )
}