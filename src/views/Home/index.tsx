import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Lista from '../../components/Lista'
import { UsersHttpHelper } from '../../helpers/usersHttp';

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const populateUsers = async () => {
    const result = await UsersHttpHelper.getAll();
    setEmployees(result as Employee[])
  }

  useEffect(() => {
    populateUsers()
  }, [])

  function aoRegistrarEmployee() {
    populateUsers()
  }

  return (
    <div>
      <Header />
      <Menu
        setNewEmployees={() => aoRegistrarEmployee()}
      />
      <Lista
        employees={employees}
      />
    </div>
  )
}