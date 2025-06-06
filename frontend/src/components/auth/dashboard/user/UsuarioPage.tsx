// src\components\auth\dashboard\usuario\UsuarioPage.tsx

"use client"; // Asegurarse de que sea un Client Component

import React from "react";
import { signOut } from "next-auth/react"; // Importamos la función signOut

const UsuarioPage = () => {
  const handleSignOut = async () => {
    // Cierra la sesión sin forzar una redirección específica por ahora.
    // Cuando necesites redirigir al login, cambia a: await signOut({ callbackUrl: '/' });
    await signOut();
  };

  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-800 min-h-screen flex flex-col items-center py-8 px-4">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg p-6 md:p-8 border-t-8 border-blue-600">
        <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-blue-800 mb-2">HYPERAGENDADOS</h1>
            <p className="text-xl text-blue-600">Tu portal para agendar citas médicas</p>
        </header>

        {/* Cabecera de la página de usuario con botón de cerrar sesión */}
        <div className="flex justify-between items-center mb-6 border-b pb-4 border-blue-200">
            <h2 className="text-2xl font-semibold text-blue-700">Panel de Paciente</h2>
            <button
                className="bg-blue-700 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-600 transition duration-200 ease-in-out shadow-md"
                title="Cerrar sesión"
                onClick={handleSignOut} // Aquí está la función de cierre de sesión
            >
                Cerrar Sesión
            </button>
        </div>

        {/* Filtro de Profesiones */}
        <section className="mb-8 p-5 bg-blue-50 rounded-lg shadow-inner">
            <h3 className="text-lg font-medium text-blue-800 mb-3">Filtrar citas por profesión:</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <select className="flex-grow p-3 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-blue-700 bg-white shadow-sm">
                    <option value="">-- Todas las Profesiones --</option>
                    <option value="cardiologia">Cardiología</option>
                    <option value="dermatologia">Dermatología</option>
                    <option value="pediatria">Pediatría</option>
                    <option value="odontologia">Odontología</option>
                    <option value="oftalmologia">Oftalmología</option>
                    <option value="psicologia">Psicología</option>
                    {/* Aquí se cargarían dinámicamente las profesiones desde la API */}
                </select>
                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200 ease-in-out shadow"
                    title="Aplicar filtro o mostrar todas las citas"
                >
                    Aplicar Filtro
                </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Selecciona una profesión para ver solo esas citas. Vuelve a seleccionar "Todas las Profesiones" para ver todas.</p>
        </section>

        {/* Listado de Citas */}
        <section className="mb-6">
            <h3 className="text-2xl font-bold text-blue-700 mb-5">Citas Disponibles y Agendadas</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:col-span-3 gap-6">

                {/* EJEMPLO DE CITA DISPONIBLE */}
                <div className="relative bg-white p-5 rounded-lg shadow-md flex flex-col border-l-6 border-blue-500 transition duration-200 ease-in-out hover:shadow-lg">
                    <h4 className="text-xl font-bold text-blue-800 mb-2">Cita con Dr. Esteban Quito</h4>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-semibold text-blue-700">Profesión:</span> Cardiología</p>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Fecha:</span> 15/07/2025</p>
                    <p className="text-sm text-gray-700 mb-3"><span className="font-semibold">Hora:</span> 10:00 AM</p>
                    <p className="text-md text-green-600 font-bold mt-auto mb-3">Estado: Disponible</p>
                    <button className="w-full bg-blue-500 text-white py-2.5 rounded-md font-semibold hover:bg-blue-600 transition duration-200 ease-in-out" title="Agendar esta cita">
                        Agendar Cita
                    </button>
                </div>

                {/* EJEMPLO DE CITA AGENDADA POR EL USUARIO ACTUAL */}
                <div className="relative bg-blue-100 p-5 rounded-lg shadow-md flex flex-col border-l-6 border-blue-700 opacity-80">
                    <h4 className="text-xl font-bold text-blue-900 mb-2">Cita con Dra. Sofía Loren</h4>
                    <p className="text-sm text-gray-800 mb-1"><span className="font-semibold text-blue-800">Profesión:</span> Dermatología</p>
                    <p className="text-sm text-gray-800 mb-1"><span className="font-semibold">Fecha:</span> 10/06/2025</p>
                    <p className="text-sm text-gray-800 mb-3"><span className="font-semibold">Hora:</span> 03:30 PM</p>
                    <p className="text-md text-blue-900 font-bold mt-auto mb-3">Estado: Agendada (Contigo)</p>
                    <button className="w-full bg-gray-400 text-gray-600 py-2.5 rounded-md font-semibold cursor-not-allowed" disabled title="Ya tienes esta cita agendada">
                        Cita Agendada
                    </button>
                </div>

                {/* OTRO EJEMPLO DE CITA DISPONIBLE */}
                <div className="relative bg-white p-5 rounded-lg shadow-md flex flex-col border-l-6 border-blue-500 transition duration-200 ease-in-out hover:shadow-lg">
                    <h4 className="text-xl font-bold text-blue-800 mb-2">Cita con Dr. Alejandro Sanz</h4>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-semibold text-blue-700">Profesión:</span> Pediatría</p>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Fecha:</span> 20/07/2025</p>
                    <p className="text-sm text-gray-700 mb-3"><span className="font-semibold">Hora:</span> 09:00 AM</p>
                    <p className="text-md text-green-600 font-bold mt-auto mb-3">Estado: Disponible</p>
                    <button className="w-full bg-blue-500 text-white py-2.5 rounded-md font-semibold hover:bg-blue-600 transition duration-200 ease-in-out" title="Agendar esta cita">
                        Agendar Cita
                    </button>
                </div>

                {/* EJEMPLO DE CITA AGENDADA POR OTRO USUARIO */}
                <div className="relative bg-blue-100 p-5 rounded-lg shadow-md flex flex-col border-l-6 border-blue-700 opacity-80">
                    <h4 className="text-xl font-bold text-blue-900 mb-2">Cita con Dra. Isabel Allende</h4>
                    <p className="text-sm text-gray-800 mb-1"><span className="font-semibold text-blue-800">Profesión:</span> Cardiología</p>
                    <p className="text-sm text-gray-800 mb-1"><span className="font-semibold">Fecha:</span> 18/06/2025</p>
                    <p className="text-sm text-gray-800 mb-3"><span className="font-semibold">Hora:</span> 02:00 PM</p>
                    <p className="text-md text-blue-900 font-bold mt-auto mb-3">Estado: Agendada (Por otro paciente)</p>
                    <button className="w-full bg-gray-400 text-gray-600 py-2.5 rounded-md font-semibold cursor-not-allowed" disabled title="Esta cita ya ha sido agendada por otro paciente">
                        No Disponible
                    </button>
                </div>

                {/* Mensaje cuando no hay citas */}
                <div className="md:col-span-2 lg:col-span-3 text-center p-8 text-gray-500 italic bg-gray-100 rounded-lg border border-gray-200">
                    <p>No hay citas disponibles para mostrar con los filtros aplicados.</p>
                    <p className="text-sm mt-2">Intenta seleccionar "Todas las Profesiones" o revisa en otra fecha.</p>
                </div>

            </div>
        </section>
      </div>
    </div>
  );
};

export default UsuarioPage;