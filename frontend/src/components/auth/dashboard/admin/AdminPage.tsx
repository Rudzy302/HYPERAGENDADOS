// src\components\auth\dashboard\admin\AdminPage.tsx

"use client"; // Asegurarse de que sea un Client Component

import React from "react";
import { signOut } from "next-auth/react"; // Importamos la función signOut

const AdminPage = () => {
  const handleSignOut = async () => {
    // Cierra la sesión sin forzar una redirección específica por ahora.
    // Cuando necesites redirigir al login, cambia a: await signOut({ callbackUrl: '/' });
    await signOut();
  };

  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-800 min-h-screen flex flex-col items-center py-8 px-4">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg p-6 md:p-8 border-t-8 border-red-600">
        <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-red-800 mb-2">HYPERAGENDADOS</h1>
            <p className="text-xl text-red-600">Panel de Gestión para Administradores</p>
        </header>

        {/* Cabecera de la página de administrador con botón de cerrar sesión */}
        <div className="flex justify-between items-center mb-6 border-b pb-4 border-red-200">
            <h2 className="text-2xl font-semibold text-red-700">Panel de Administrador</h2>
            <button
                className="bg-red-700 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-600 transition duration-200 ease-in-out shadow-md"
                title="Cerrar sesión"
                onClick={handleSignOut} // Aquí está la función de cierre de sesión
            >
                Cerrar Sesión
            </button>
        </div>

        {/* Sección para Crear Nuevos Usuarios */}
        <section className="mb-8 p-5 bg-red-50 rounded-lg shadow-inner">
            <h3 className="text-lg font-medium text-red-800 mb-4">Crear Nuevo Usuario</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    className="p-3 border border-red-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-200 text-red-700"
                    type="text"
                    placeholder="Nombre Completo"
                />
                <input
                    className="p-3 border border-red-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-200 text-red-700"
                    type="email"
                    placeholder="Correo Electrónico"
                />
                <input
                    className="p-3 border border-red-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-200 text-red-700"
                    type="password"
                    placeholder="Contraseña"
                />
                <select
                    className="p-3 border border-red-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-200 text-red-700 bg-white"
                >
                    <option value="">Seleccionar Rol</option>
                    <option value="admin">Administrador</option>
                    <option value="empleado">Empleado</option>
                    <option value="usuario">Usuario</option>
                </select>
                <button
                    className="col-span-1 md:col-span-2 bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition duration-200 ease-in-out shadow"
                    title="Crear un nuevo usuario"
                >
                    Crear Usuario
                </button>
            </div>
        </section>

        {/* Sección de Gestión de Usuarios y Citas (simulada con tabla) */}
        <section className="mb-6">
            <h3 className="text-2xl font-bold text-red-700 mb-5">Gestión de Usuarios y Citas</h3>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-red-200">
                <table className="min-w-full divide-y divide-red-200">
                    <thead className="bg-red-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Rol
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Citas Asignadas
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-red-200">
                        {/* Ejemplo de Fila de Usuario */}
                        <tr className="hover:bg-red-50 transition duration-150 ease-in-out">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Juan Pérez (Admin)
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-700 font-semibold">
                                Administrador
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                5 citas
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-yellow-600 hover:text-yellow-900 mr-3" title="Editar usuario">Editar</button>
                                <button className="text-blue-600 hover:text-blue-900 mr-3" title="Cambiar rol o asignar cita">Gestionar</button>
                                <button className="text-red-600 hover:text-red-900" title="Eliminar usuario">Eliminar</button>
                            </td>
                        </tr>
                        {/* Ejemplo de Fila de Empleado */}
                        <tr className="bg-red-50 hover:bg-red-100 transition duration-150 ease-in-out">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                María López (Emp)
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                                Empleado
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                12 citas
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-yellow-600 hover:text-yellow-900 mr-3" title="Editar usuario">Editar</button>
                                <button className="text-blue-600 hover:text-blue-900 mr-3" title="Cambiar rol o asignar cita">Gestionar</button>
                                <button className="text-red-600 hover:text-red-900" title="Eliminar usuario">Eliminar</button>
                            </td>
                        </tr>
                        {/* Ejemplo de Fila de Usuario/Paciente */}
                        <tr className="hover:bg-red-50 transition duration-150 ease-in-out">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Carlos García (User)
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">
                                Usuario
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2 citas
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-yellow-600 hover:text-yellow-900 mr-3" title="Editar usuario">Editar</button>
                                <button className="text-blue-600 hover:text-blue-900 mr-3" title="Cambiar rol o asignar cita">Gestionar</button>
                                <button className="text-red-600 hover:text-red-900" title="Eliminar usuario">Eliminar</button>
                            </td>
                        </tr>
                        {/* Mensaje si no hay usuarios */}
                        <tr>
                            <td colSpan={4} className="text-center p-6 text-gray-500 italic bg-gray-100">
                                (No hay usuarios registrados o no se han cargado datos.)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;