import Employee from '../Employee';
import style from './lista.module.scss';
import { v4 as uuidv4 } from 'uuid';

interface employeesProps {
  createdAt: Date;
  email: string;
  name: string;
  role: string;
  id: number;
}

interface ListaProps {
  employees: employeesProps[]
}

export default function Lista({employees = []}: ListaProps) {

  if(employees.length > 0) {
    return (<section className={style.lista}>
      <h3>Lista de Funcionários</h3>
      <div className={style.lista__employees}>
        {employees.map(employe => <Employee
          key={uuidv4()}
          nome={employe.name}
          role={employe.role}
          email={employe.email}
        />)}
      </div>
    </section>)
  } else {
    return <h2 style={{textAlign: 'center'}}>
    Infelizmente você não possui nenhum funcionário ainda 😢
  </h2>
  }
}