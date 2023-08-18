import { createContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Lista from '../../components/Lista'
import { UsersHttpHelper } from '../../helpers/usersHttp';

export interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

interface UserResponse {
  data: Employee[];
}

interface EmployeesContextType {
  employees: Employee[];
  deleteEmployees: (id: string) => void;
}

export const EmployeesContext = createContext({} as EmployeesContextType);

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const populateUsers = async () => {
    const result = await UsersHttpHelper.getAll() as UserResponse;
    setEmployees(result.data as Employee[])
  }

  useEffect(() => {
    populateUsers()
  }, [])

  function aoRegistrarEmployee() {
    populateUsers()
  }

  async function deleteEmployees(id: string) {
    console.log("teste");
    
    await UsersHttpHelper.deleteEmployee(id);
    populateUsers()
  }

  return (
    <div>
      <Header />
      <EmployeesContext.Provider
        value={{
          employees,
          deleteEmployees
        }}
      >
        <Menu
          setNewEmployees={() => aoRegistrarEmployee()}
        />
        <Lista
          employees={employees}
          />
      </EmployeesContext.Provider>
    </div>
  )
}