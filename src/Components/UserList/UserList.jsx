import React, { useEffect, useState, useContext } from 'react';
import { Header } from '../Layouts/Header/Header';
import { AuthContext } from '../Context/Context';
import UserDetailsModal from '../WindowModals/UserDetailsModal/UserDetailsModal';

export const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { authToken } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);

  const accesRole = localStorage.getItem('role');
  
  useEffect(() => {
    const fetchPets = async () => {
      if (!authToken) return;

      const url = accesRole === 'administrador' 
        ? 'https://gaiavet-back.onrender.com/users'
        : 'https://gaiavet-back.onrender.com/userFind';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setUserList(data);
          setFilteredUserList(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.log('Error al traer los usuarios:', error);
      }
    };

    fetchPets();
  }, [authToken]);

  useEffect(() => {
    
    const filteredUsers = userList.filter(user =>
        user.cedula?.toString().includes(searchTerm) ||
        user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.telefono?.toString().includes(searchTerm) ||
        user.direccion?.toLowerCase().includes(searchTerm.toLowerCase())
      );
     
    setFilteredUserList(filteredUsers);
  }, [searchTerm, userList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const ModalUser = (user) => {
    setSelectedUser(user);
  };
  return (
    <>
      <Header title="Lista de usuarios" classN='text-7xl sm:text-4xl md:text-5xl lg:text-[3.3rem] lg:w-[50%] xl:text-6xl 2xl:text-7xl'/>
      <div className="">
        <div className="flex justify-center pt-48">
          <div className="flex flex-row items-center w-[60rem] sm:justify-center">
            <input
              type="text"
              placeholder="Busca un usuario de manera rapida"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-700 placeholder-gray-400  sm:w-[30rem] md:w-[40rem] lg:w-[50rem] xl:w-[60rem]"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className="w-full flex justify-center my-10">
          <div className="w-[80%] h-[100vh] p-6 mb-[10rem] sm:w-[100%] sm:px-3 sm:py-0 sm:mb-[5rem] md:px-4 lg:w-[95%] lg:px-6 xl:w-[90%] 2xl:w-[90%%]">
            <div className='overflow-y-auto max-h-[100vh] relative overflow-x-auto shadow-xl sm:rounded-lg font-itim'>

            <table className="w-full text-xl text-left rtl:text-right text-gray-300 dark:text-gray-400">
              <thead className='text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-400 '>
                <tr className="w-full bg-teal-500 text-gray-800 uppercase text-lg pb-10">
                  <th scope="col" className="py-3 px-6 text-center sm:text-xs sm:px-1 lg:text-sm lg:px-4 xl:px-6 xl:text-base">Documento</th>
                  <th scope="col" className="py-3 px-6 text-center sm:text-xs sm:px-1 lg:text-sm lg:px-4 xl:px-6 xl:text-base">Nombre</th>
                  <th scope="col" className="py-3 px-6 text-center sm:text-xs sm:px-1 lg:text-sm lg:px-4 xl:px-6 xl:text-base">Apellido</th>
                  <th scope="col" className="py-3 px-6 text-center sm:text-xs sm:px-1 lg:text-sm lg:px-4 xl:px-6 xl:text-base">Correo</th>
                  <th scope="col" className="py-3 px-6 text-center sm:text-xs sm:px-1 lg:text-sm lg:px-4 xl:px-6 xl:text-base">Dirección</th>
                  <th scope="col" className="py-3 px-6 text-center sm:text-xs sm:px-1 lg:text-sm lg:px-4 xl:px-6 xl:text-base">Teléfono</th>
                  <th scope="col" className="py-3 px-6 text-center sm:text-xs sm:px-1 lg:text-sm lg:px-4 xl:px-6 xl:text-base">Ver más</th>
                </tr>
                
              </thead>
              <tbody className="text-gray-600 text-base sm:text-xs lg:text-sm xl:text-base 2xl:text-base">
                {filteredUserList.map((user) => (
                  <tr key={user.cedula} className="dark:hover:bg-gray-50 border-gray-200 odd:bg-white odd:dark:bg-gray-100 even:dark:bg-gray-200 border-b">
                  {/* <tr key={user.cedula} className="odd:bg-white odd:dark:bg-gray-100  even:dark:bg-gray-100 border-b dark:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-300"> */}
                    <td className="py-3 text-center">{user.cedula}</td>
                    <td className="py-3 text-center">{user.nombre}</td>
                    <td className="py-3 text-center">{user.apellido}</td>
                    <td className="py-3 text-center">{user.correo}</td>
                    <td className="py-3 text-center">{user.direccion}</td>
                    <td className="py-3 text-center">{user.telefono}</td>
                    <td className="py-3 text-center"><button
                        type="button"
                        onClick={() => ModalUser(user)}
                        className='bg-blue-border px-11 py-3 rounded-md hover:bg-teal-300 text-white sm:w-[5rem] sm:h-[2.5rem] sm:p-2 lg:w-[6rem] xl:w-[6.5rem] xl:h-[3rem]'>
                        Ver más
                      </button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
        {selectedUser && (
          <UserDetailsModal
            cedula={selectedUser.cedula}
            nombre={selectedUser.nombre}
            apellido={selectedUser.apellido}
            correo={selectedUser.correo}
            direccion={selectedUser.direccion}
            telefono={selectedUser.telefono}
            userImg={selectedUser.imagen}
            onClose={() => ModalUser(null)}
          />
        )}
      </div>
    </>
  );
};