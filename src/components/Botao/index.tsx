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
  onDeleteEmployee?: () => void;
}

export default function Botao(props: BotaoProps) {

  const {
    icon = <FontAwesomeIcon icon={FontsIcon.faSignIn}/>,
    type,
    children,
    disabled,
    onDeleteEmployee
  } = props

  return (
    <button
      className={style.btnStyle}
      type={type}
      disabled={disabled}
      onClick={onDeleteEmployee}
      >
      <span>{icon}</span>
      {children}
    </button>
  )
}