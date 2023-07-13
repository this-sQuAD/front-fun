import Employee from '../Employee';
import style from './lista.module.scss';

interface EmployeesProps {
  createdAt: Date;
  email: string;
  name: string;
  role: string;
  _id: string;
}

interface ListaProps {
  employees: EmployeesProps[]
}

export default function Lista({employees = []}: ListaProps) {

  if(employees.length > 0) {
    return (<section className={style.lista}>
      <h3>Lista de Funcionários</h3>
      <div className={style.lista__employees}>
        {employees.map(employee => <Employee
          key={employee._id}
          id={employee._id}
          nome={employee.name}
          role={employee.role}
          email={employee.email}
        />)}
      </div>
    </section>)
  } else {
    return <h2 style={{textAlign: 'center'}}>
    Infelizmente você não possui nenhum funcionário ainda 😢
  </h2>
  }
}