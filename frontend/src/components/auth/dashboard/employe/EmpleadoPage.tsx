"use client";

import React from "react";
import { signOut } from "next-auth/react"; 

const EmpleadoPage = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-800 border-b-4 border-blue-500 pb-2 mb-6">
        Panel de Empleado
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-100 p-6 rounded-lg border-l-4 border-blue-700">
        <input
          className="p-3 border rounded-lg focus:border-blue-700 focus:ring-2 focus:ring-blue-300"
          type="text"
          placeholder="Nombre del Cliente"
        />
        <input
          className="p-3 border rounded-lg focus:border-blue-700 focus:ring-2 focus:ring-blue-300"
          type="email"
          placeholder="Correo Electrónico del Cliente"
        />
        <input
          className="p-3 border rounded-lg focus:border-blue-700 focus:ring-2 focus:ring-blue-300"
          type="tel"
          placeholder="Teléfono del Cliente"
        />
        <textarea
          className="p-3 border rounded-lg focus:border-blue-700 focus:ring-2 focus:ring-blue-300 col-span-1 md:col-span-2"
          placeholder="Notas Adicionales"
          rows={3}
        ></textarea>
        <button
          className="col-span-1 md:col-span-2 bg-blue-700 text-white p-3 rounded-lg font-bold hover:bg-blue-600 transition"
          title="Agregar nuevo cliente"
        >
          Agregar Cliente
        </button>
      </div>

      <h3 className="text-2xl font-semibold text-blue-800 mt-6">Clientes Registrados</h3>
      <table className="w-full border-collapse border mt-4 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="border p-3">Nombre</th>
            <th className="border p-3">Correo</th>
            <th className="border p-3">Teléfono</th>
            <th className="border p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center even:bg-blue-100 hover:bg-blue-200 transition">
            <td className="border p-3">Ana Gómez</td>
            <td className="border p-3">ana@example.com</td>
            <td className="border p-3">555-1234</td>
            <td className="border p-3 flex justify-center gap-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-400 transition"
                title="Editar cliente"
              >
                Editar
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500 transition"
                title="Eliminar cliente"
              >
                Eliminar
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan={4} className="text-center p-4 text-gray-500 italic">
              (Aquí aparecerán los clientes una vez registrados)
            </td>
          </tr>
        </tbody>
      </table>

      <div className="fixed bottom-6 right-6">
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition shadow-lg"
          title="Cerrar sesión"
          onClick={handleSignOut} // ¡Este es el cambio!
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default EmpleadoPage;