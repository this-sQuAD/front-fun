import { createContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { sucessToast, failedToast } from '../../helpers/toast'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Lista from '../../components/Lista'
import { DeleteModal } from '../../components/DeleteModal';

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

export interface EmployeeToAction {
  id: string;
  nome: string;
  role: string;
  email: string;
}

interface EmployeesContextType {
  employees: Employee[];
  fillFormToEditEmployee: (employee: EmployeeToAction | null) => void;
  employeeToEdit: EmployeeToAction | null;
  handleOpenDeleteModal: (employee: EmployeeToAction) => void;
  deleteEmployees: (id: string) => void;
  populateUsers: () => void;
}

export const EmployeesContext = createContext({} as EmployeesContextType);

Modal.setAppElement('#root');

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<EmployeeToAction | null>(null);
  const [employeeToEdit, setEmployeeToEdit] = useState<EmployeeToAction | null>(null);

  const populateUsers = async () => {
    const result = await UsersHttpHelper.getAll() as UserResponse;
    setEmployees(result.data as Employee[])
  }

  useEffect(() => {
    populateUsers()
  }, [])

  function aoRegistrarEmployee() {
    populateUsers()
    sucessToast("Usuário registrado com sucesso!")
  }

  function fillFormToEditEmployee(employee: EmployeeToAction | null) {
    setEmployeeToEdit(employee)
  }

  async function deleteEmployees(id: string) {
    try {
      await UsersHttpHelper.deleteEmployee(id);
      setEmployeeToDelete(null)
      populateUsers()
      sucessToast("Usuário deletado com sucesso!")
      
    } catch (error: any) {
      failedToast(error.response.data.message)
    }
  }

  function handleOpenDeleteModal(employee: EmployeeToAction) {
    setEmployeeToDelete(employee)
    setDeleteModalIsOpen(true)
  }

  function handleCloseModal() {
    setDeleteModalIsOpen(false)
  }

  return (
    <div>
      <Header />
      <EmployeesContext.Provider
        value={{
          employees,
          employeeToEdit,
          fillFormToEditEmployee,
          handleOpenDeleteModal,
          deleteEmployees,
          populateUsers
        }}
      >
        <DeleteModal 
          deleteModalIsOpen={deleteModalIsOpen}
          employeeToDelete={employeeToDelete}
          closeDeleteModal={handleCloseModal}
        />
        <Menu
          setNewEmployees={() => aoRegistrarEmployee()}
        />
        <Lista
          employees={employees}
          />
      </EmployeesContext.Provider>
      <ToastContainer 
        rtl={false}
        pauseOnFocusLoss
        newestOnTop={false}    
      />
      
    </div>
  )
}