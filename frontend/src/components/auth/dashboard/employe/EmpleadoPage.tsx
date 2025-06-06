// src\components\auth\dashboard\empleado\EmpleadoPage.tsx

"use client"; // Asegurarse de que sea un Client Component

import React from "react";
import { signOut } from "next-auth/react"; // Importamos la función signOut

const EmpleadoPage = () => {
  const handleSignOut = async () => {
    // Cierra la sesión sin forzar una redirección específica por ahora.
    // Cuando necesites redirigir al login, cambia a: await signOut({ callbackUrl: '/' });
    await signOut();
  };

  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-800 min-h-screen flex flex-col items-center py-8 px-4">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg p-6 md:p-8 border-t-8 border-green-600">
        <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-green-800 mb-2">HYPERAGENDADOS</h1>
            <p className="text-xl text-green-600">Panel de Gestión para Empleados</p>
        </header>

        {/* Cabecera de la página de empleado con botón de cerrar sesión */}
        <div className="flex justify-between items-center mb-6 border-b pb-4 border-green-200">
            <h2 className="text-2xl font-semibold text-green-700">Panel de Empleado</h2>
            <button
                className="bg-green-700 text-white px-5 py-2 rounded-lg font-bold hover:bg-green-600 transition duration-200 ease-in-out shadow-md"
                title="Cerrar sesión"
                onClick={handleSignOut} // Aquí está la función de cierre de sesión
            >
                Cerrar Sesión
            </button>
        </div>

        {/* Sección para Crear Nuevas Citas */}
        <section className="mb-8 p-5 bg-green-50 rounded-lg shadow-inner">
            <h3 className="text-lg font-medium text-green-800 mb-4">Crear Nueva Cita</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    className="p-3 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200 text-green-700"
                    type="date"
                    placeholder="Fecha de la Cita"
                    title="Seleccionar fecha"
                />
                <input
                    className="p-3 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200 text-green-700"
                    type="time"
                    placeholder="Hora de la Cita"
                    title="Seleccionar hora"
                />
                {/* La profesión del empleado se asigna automáticamente, no se muestra un selector aquí */}
                <p className="p-3 bg-green-100 border border-green-300 rounded-md text-green-800 col-span-1 md:col-span-2">
                    Profesión: <span className="font-semibold">[Profesión del Empleado Automática]</span>
                </p>
                <button
                    className="col-span-1 md:col-span-2 bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition duration-200 ease-in-out shadow"
                    title="Crear nueva cita"
                >
                    Crear Cita
                </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">La profesión del empleado que crea la cita se asignará automáticamente.</p>
        </section>

        {/* Listado de Citas del Empleado */}
        <section className="mb-6">
            <h3 className="text-2xl font-bold text-green-700 mb-5">Mis Citas (Disponibles y Agendadas)</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* EJEMPLO DE CITA DISPONIBLE CREADA POR ESTE EMPLEADO */}
                <div className="relative bg-white p-5 rounded-lg shadow-md flex flex-col border-l-6 border-green-500 transition duration-200 ease-in-out hover:shadow-lg">
                    <h4 className="text-xl font-bold text-green-800 mb-2">Cita Disponible</h4>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-semibold text-green-700">Profesión:</span> Pediatría</p>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Fecha:</span> 25/07/2025</p>
                    <p className="text-sm text-gray-700 mb-3"><span className="font-semibold">Hora:</span> 11:00 AM</p>
                    <p className="text-md text-green-600 font-bold mt-auto mb-3">Estado: Disponible</p>
                    <p className="text-sm text-gray-500 italic">Asignada a: <span className="font-semibold">Nadie (Disponible)</span></p>
                    <div className="mt-4 flex gap-2">
                        <button className="flex-1 bg-yellow-500 text-white py-2 rounded-md font-semibold hover:bg-yellow-600 transition duration-200 ease-in-out" title="Modificar esta cita">
                            Modificar
                        </button>
                        <button className="flex-1 bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition duration-200 ease-in-out" title="Eliminar esta cita">
                            Eliminar
                        </button>
                    </div>
                </div>

                {/* EJEMPLO DE CITA AGENDADA A ESTE EMPLEADO */}
                <div className="relative bg-green-100 p-5 rounded-lg shadow-md flex flex-col border-l-6 border-green-700 opacity-80">
                    <h4 className="text-xl font-bold text-green-900 mb-2">Cita Agendada</h4>
                    <p className="text-sm text-gray-800 mb-1"><span className="font-semibold text-green-800">Profesión:</span> Pediatría</p>
                    <p className="text-sm text-gray-800 mb-1"><span className="font-semibold">Fecha:</span> 20/06/2025</p>
                    <p className="text-sm text-gray-800 mb-3"><span className="font-semibold">Hora:</span> 09:30 AM</p>
                    <p className="text-md text-green-900 font-bold mt-auto mb-3">Estado: Agendada</p>
                    <p className="text-sm text-gray-600 italic">Asignada a: <span className="font-semibold">Paciente: Ana López</span></p>
                    <div className="mt-4 flex gap-2">
                        <button className="flex-1 bg-yellow-500 text-white py-2 rounded-md font-semibold hover:bg-yellow-600 transition duration-200 ease-in-out" title="Modificar esta cita">
                            Modificar
                        </button>
                        <button className="flex-1 bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition duration-200 ease-in-out" title="Eliminar esta cita">
                            Eliminar
                        </button>
                    </div>
                </div>

                {/* Otro Ejemplo de Cita Disponible */}
                <div className="relative bg-white p-5 rounded-lg shadow-md flex flex-col border-l-6 border-green-500 transition duration-200 ease-in-out hover:shadow-lg">
                    <h4 className="text-xl font-bold text-green-800 mb-2">Cita Disponible</h4>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-semibold text-green-700">Profesión:</span> Dermatología</p>
                    <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Fecha:</span> 01/08/2025</p>
                    <p className="text-sm text-gray-700 mb-3"><span className="font-semibold">Hora:</span> 02:00 PM</p>
                    <p className="text-md text-green-600 font-bold mt-auto mb-3">Estado: Disponible</p>
                    <p className="text-sm text-gray-500 italic">Asignada a: <span className="font-semibold">Nadie (Disponible)</span></p>
                    <div className="mt-4 flex gap-2">
                        <button className="flex-1 bg-yellow-500 text-white py-2 rounded-md font-semibold hover:bg-yellow-600 transition duration-200 ease-in-out" title="Modificar esta cita">
                            Modificar
                        </button>
                        <button className="flex-1 bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition duration-200 ease-in-out" title="Eliminar esta cita">
                            Eliminar
                        </button>
                    </div>
                </div>

                {/* Mensaje si no hay citas */}
                <div className="md:col-span-2 lg:col-span-3 text-center p-8 text-gray-500 italic bg-gray-100 rounded-lg border border-gray-200">
                    <p>No tienes citas programadas o disponibles en este momento.</p>
                </div>

            </div>
        </section>
      </div>
    </div>
  );
};

export default EmpleadoPage;