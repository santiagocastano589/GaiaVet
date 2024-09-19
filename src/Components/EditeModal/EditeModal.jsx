import React, { useState, useContext } from 'react';
import InputPetEditable from '../InputPetEditable/InputPetEditable';
import { AuthContext } from '../Context/Context';
import Select from 'react-select';
import Swal from 'sweetalert2';
import Raza from '../../../public/js/RazaPet';

const EditedModal = ({ edad, peso, namePet, documento, tipo, raza, foto, temperamento, onClose }) => {
    const [editedDocumento, setEditedDocumento] = useState(documento);
    const [editedName, setEditedName] = useState(namePet);
    const [editedPeso, setEditedPeso] = useState(peso);
    const [editedEdad, setEditedEdad] = useState(edad);
    const [editedFoto, setEditedFoto] = useState(foto);
    const [editedTemperamento, setEditedTemperamento] = useState(temperamento);

    const findInitialRaza = (raza) => {
        return Raza.find((r) => r.value === raza) || null;
    };

    const [editedRaza, setEditedRaza] = useState(findInitialRaza(raza));
    const handleTipoChange = (event) => {
        console.log('Nuevo tipo de mascota:', event.target.value);  // Verificar si el valor está cambiando
        setEditedTipo(event.target.value);
    };
    
    const { authToken } = useContext(AuthContext);

    const handleDocumentoChange = (event) => {
        setEditedDocumento(event.target.value);
    };


    const handleRazaChange = (event) => {
        setEditedRaza(event.target.value);
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleEdadChange = (event) => {
        setEditedEdad(event.target.value);
    };

    const handlePesoChange = (event) => {
        setEditedPeso(event.target.value);
    };

    const handleTemperamentoChange = (event) => {
        setEditedTemperamento(event.target.value);
    };

    const handleSaveChanges = async () => {
    
        Swal.fire({
            title: 'GaiaVet',
            text: '¿Deseas actualizar la información de esta mascota? Los cambios se guardarán en la base de datos.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
    
                const updatedPetData = {
                    idMascota: editedDocumento,
                    raza: editedRaza ? editedRaza.value : '',  
                    nombre: editedName,
                    peso: editedPeso,
                    edad: editedEdad,
                    foto: editedFoto,
                    temperamento: editedTemperamento
                };
    
                console.log('Datos de mascota a enviar:', updatedPetData);
    
                try {
                    const response = await fetch(`https://gaiavet-back.onrender.com/UpdatePet/${editedDocumento}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authToken}`,
                        },
                        body: JSON.stringify(updatedPetData),
                    });
    
                    if (!response.ok) {
                        throw new Error('Error al actualizar la mascota');
                    }
    
                    Swal.fire({
                        title: 'Actualizado',
                        text: 'La mascota ha sido actualizada con éxito.',
                        icon: 'success',
                    });
                    onClose();
                    window.location.reload();
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al actualizar la mascota. Inténtalo de nuevo.',
                        icon: 'error',
                    });
                    console.error(error);
                }
            }
        });
    };
    
    

    return (
        <div className="w-full fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300">
            <div className="w-[65rem] h-[32rem] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-fondo  rounded-lg shadow-sm">
                <div className='flex justify-between w-full'>
                    <div className="p-10 text-white flex flex-col justify-center items-center ">
                        <InputPetEditable
                            htmlFor="nombre"
                            nameLabel="Nombre:"
                            id="nombre"
                            value={editedName}
                            onChange={handleNameChange}
                        />

                         <div className='text-black w-[100%] mt-2'>
                         <div className='text-black justify-center flex w-[100%] mt-2'>
                            <label className='w-[10rem] text-black text-xl  items-center flex' htmlFor="">Raza o especie: </label>
                            <div className='w-[30rem] bg-red-400'>
                            <Select
                                    id="productos"
                                    name="productos"
                                    className="w-full"
                                    options={Raza}
                                    value={editedRaza}
                                    placeholder="-- Selecciona una raza --"
                                    onChange={(option) => setEditedRaza(option)}
                                    isSearchable
                            />
                                </div>
                            </div>
                            </div>

                        <InputPetEditable
                            htmlFor="edad"
                            nameLabel="Edad (Meses):"
                            id="edad"
                            type="number"
                            value={editedEdad}
                            onChange={handleEdadChange}
                        />
                        <InputPetEditable
                            htmlFor="peso"
                            nameLabel="Peso (Kg):"
                            id="peso"
                            type="number"
                            value={editedPeso}
                            onChange={handlePesoChange}
                        />
                        <InputPetEditable
                            htmlFor="temperamento"
                            nameLabel="Temperamento:"
                            id="temperamento"
                            value={editedTemperamento}
                            onChange={handleTemperamentoChange}
                        />

                        <div className='w-full mt-14 text-black flex justify-end'>
                            <button onClick={onClose} className='w-36 bg-gray-200 mx-3 p-2 rounded-md hover:bg-gray-400 hover:text-white'>Cancelar</button>
                            <button onClick={handleSaveChanges} className='w-36 bg-fondoTarjeta text-white mx-3 p-2 rounded-md hover:bg-teal-900'>Guardar cambios</button>
                        </div>
                    </div>

                    <div className="h-[32rem] w-80 bg-fondoTarjeta rounded-lg">
                        <div className='flex flex-col items-center mt-24'>
                            <img className='w-60 h-60 rounded-full object-cover' src={editedFoto} alt="" />
                            <h5 className="text-3xl font-bold mt-6 text-white">{namePet}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditedModal;