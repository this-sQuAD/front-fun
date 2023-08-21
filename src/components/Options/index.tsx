import { ChangeEvent } from 'react';
import style from './option.module.scss';

interface roleOptions {
  valor: string;
  label: string;
}

interface OptionProps {
  options: roleOptions[];
  idSelect: string;
  aoAlterado: (event: string) => void;
  required?: boolean;
  valor: string;
  selectValue?: string;
}

export default function Option(props: OptionProps) {
  const {
    options = [{
      valor: 'default',
      label: 'Selecione',
    }],
    idSelect,
    selectValue,
    aoAlterado
  } = props

  const aoMudarOption = (event: ChangeEvent<HTMLSelectElement>) => {
    aoAlterado(event.target.value)
    
  }

  return (
    <select className={style.select} name={idSelect} id={idSelect} value={selectValue} onChange={aoMudarOption}>
      <option className={style.select__option} value=''>Selecione</option>
      {options.map(op => {
        return (
          <option key={op.valor} className={style.select__option} value={op.valor}>{op.label}</option>
        )
      })}
    </select>
  )
}