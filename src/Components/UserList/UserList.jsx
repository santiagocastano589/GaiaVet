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
      <Header title="Lista de usuarios" classN='text-7xl'/>
      <div className="">
        <div className="flex justify-center pt-48">
          <div className="flex flex-row items-center w-[60rem]">
            <input
              type="text"
              placeholder="Busca un usuario de manera rapida"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className="w-full flex justify-center my-10">
          <div className="w-[80%] h-[100vh] p-6 mb-[10rem]">
            <div className='overflow-y-auto max-h-[100vh] '>

            <table className="w-full bg-white border-4">
              <thead>
                <tr className="w-full bg-teal-500 text-gray-800 uppercase text-sm pb-10">
                  <th className="py-3 px-6 text-center">Documento</th>
                  <th className="py-3 px-6 text-center">Nombre</th>
                  <th className="py-3 px-6 text-center">Apellido</th>
                  <th className="py-3 px-6 text-center">Correo</th>
                  <th className="py-3 px-6 text-center">Direccion</th>
                  <th className="py-3 px-6 text-center">Telefono</th>
                  <th className="py-3 px-6 text-center">Ver mas</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredUserList.map((user) => (
                  <tr key={user.cedula} className="border-b border-gray-200 hover:bg-gray-100">

                    <td className="py-2 px-2 text-center">{user.cedula}</td>
                    <td className="py-2 px-2 text-center">{user.nombre}</td>
                    <td className="py-2 px-2 text-center">{user.apellido}</td>
                    <td className="py-2 px-2 text-center">{user.correo}</td>
                    <td className="py-2 px-2 text-center">{user.direccion}</td>
                    <td className="py-2 px-2 text-center">{user.telefono}</td>
                    <td className="py-2 px-2 text-center ">
                      <button
                        type="button"
                        onClick={() => ModalUser(user)}
                        className='bg-blue-border px-11 py-3 rounded-md hover:bg-teal-300 text-white'                      >
                        Ver más
                      </button>
                    </td>
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