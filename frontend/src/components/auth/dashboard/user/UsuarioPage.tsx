import React, { useState, useEffect } from 'react';

// Interfaz para las citas, extendida para el contexto del frontend del paciente
interface Cita {
  idCita: string;
  profesion: string;
  fechaCita: string; // Formato ISO 8601: "YYYY-MM-DDTHH:MM"
  sede: string;
  localidad: string;
  estado: 'Disponible' | 'Agendada' | 'Cancelada'; // Estados explícitos
  bookedBy?: string | null; // ID del usuario que la agendó (para citas agendadas por el paciente)
  empleadoAsignado?: string; // Nombre del profesional/doctor asignado
}

const PacientePage = () => {
  const [allCitas, setAllCitas] = useState<Cita[]>([]);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [citaToBook, setCitaToBook] = useState<Cita | null>(null);

  // Usuario actual simulado para este ejemplo
  const currentUser = { id: 'paciente_123', name: 'Ana Rodríguez', role: 'usuario' };

  useEffect(() => {
    // Simula una llamada a la API para obtener citas
    fetch("http://localhost:3000/api/citas")
      .then((response) => {
        if (!response.ok) {
          console.error("Error en la respuesta de la API", response);
          // Retorna un arreglo vacío para que el `.then` siguiente maneje el fallback
          return [];
        }
        return response.json();
      })
      .then((data: Cita[]) => {
        // Añade algunas citas de prueba si la API no devuelve datos o para desarrollo
        const mockData: Cita[] = [
          { idCita: 'c1', profesion: 'Odontología', fechaCita: '2025-06-10T10:00', sede: 'Centro', localidad: 'Bogotá', estado: 'Disponible' },
          { idCita: 'c2', profesion: 'Medicina General', fechaCita: '2025-06-11T11:00', sede: 'Norte', localidad: 'Medellín', estado: 'Agendada', bookedBy: 'otro_paciente', empleadoAsignado: 'Dr. López' },
          { idCita: 'c3', profesion: 'Pediatría', fechaCita: '2025-06-12T09:30', sede: 'Sur', localidad: 'Cali', estado: 'Disponible' },
          { idCita: 'c4', profesion: 'Odontología', fechaCita: '2025-06-13T14:00', sede: 'Centro', localidad: 'Bogotá', estado: 'Agendada', bookedBy: currentUser.id, empleadoAsignado: 'Dra. Pérez' }, // Agendada por el usuario actual
          { idCita: 'c5', profesion: 'Cardiología', fechaCita: '2025-06-14T16:00', sede: 'Norte', localidad: 'Bogotá', estado: 'Disponible' },
        ];
        // Combina datos de la API con mock data o usa solo mock si la API falla
        setCitas(Array.isArray(data) && data.length > 0 ? data : mockData);
      })
      .catch((error) => {
        console.error("Error al cargar citas", error);
        // En caso de error total de la API, se usa solo la mock data
        const mockData: Cita[] = [
            { idCita: 'c1', profesion: 'Odontología', fechaCita: '2025-06-10T10:00', sede: 'Centro', localidad: 'Bogotá', estado: 'Disponible' },
            { idCita: 'c2', profesion: 'Medicina General', fechaCita: '2025-06-11T11:00', sede: 'Norte', localidad: 'Medellín', estado: 'Agendada', bookedBy: 'otro_paciente', empleadoAsignado: 'Dr. López' },
            { idCita: 'c3', profesion: 'Pediatría', fechaCita: '2025-06-12T09:30', sede: 'Sur', localidad: 'Cali', estado: 'Disponible' },
            { idCita: 'c4', profesion: 'Odontología', fechaCita: '2025-06-13T14:00', sede: 'Centro', localidad: 'Bogotá', estado: 'Agendada', bookedBy: currentUser.id, empleadoAsignado: 'Dra. Pérez' },
            { idCita: 'c5', profesion: 'Cardiología', fechaCita: '2025-06-14T16:00', sede: 'Norte', localidad: 'Bogotá', estado: 'Disponible' },
          ];
        setAllCitas(mockData);
      });
  }, []);

  // Obtiene una lista de profesiones únicas para el filtro
  const getUniqueProfessions = (): string[] => {
    return Array.from(new Set(allCitas.map(cita => cita.profesion)));
  };

  // Maneja la selección de profesión en el filtro
  const handleProfessionFilter = (profession: string | null) => {
    // Si se hace clic en la misma profesión, se desactiva el filtro (muestra todas)
    setSelectedProfession(prev => (prev === profession ? null : profession));
  };

  // Prepara la cita para mostrar en el modal de confirmación
  const handleBookClick = (cita: Cita) => {
    setCitaToBook(cita);
    setIsModalOpen(true);
  };

  // Confirma la reserva de la cita
  const confirmBooking = () => {
    if (!citaToBook) return;

    // Simula una llamada PUT/PATCH a la API para agendar la cita
    fetch(`http://localhost:3000/api/citas/${citaToBook.idCita}/agendar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        estado: "Agendada",
        bookedBy: currentUser.id,
        // Aquí podrías enviar otros datos necesarios para tu backend,
        // como el id del paciente que agenda.
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error al agendar cita", response);
          return null;
        }
        return response.json();
      })
      .then((updatedCita) => {
        if (updatedCita) {
          // Actualiza el estado local de las citas para reflejar el cambio
          setAllCitas((prevCitas) =>
            prevCitas.map((c) =>
              c.idCita === updatedCita.idCita
                ? { ...c, estado: 'Agendada', bookedBy: currentUser.id }
                : c
            )
          );
          alert(`¡Cita de ${updatedCita.profesion} agendada con éxito para el ${formatFecha(updatedCita.fechaCita)}!`);
        }
      })
      .catch((error) => console.error("Error al agendar cita", error))
      .finally(() => {
        setIsModalOpen(false); // Cierra el modal
        setCitaToBook(null); // Limpia la cita seleccionada
      });
  };

  // Cierra el modal de confirmación
  const closeModal = () => {
    setIsModalOpen(false);
    setCitaToBook(null);
  };

  // Formatea la fecha y hora para una visualización amigable
  const formatFecha = (fecha: string): string => {
    if (!fecha) return "Fecha no disponible";
    try {
      return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
        hour12: true // Formato de 12 horas con AM/PM
      });
    } catch (e) {
      console.error("Formato de fecha inválido:", fecha);
      return fecha; // Devuelve el original si falla el parseo
    }
  };

  // Filtra las citas basándose en la profesión seleccionada
  const filteredCitas = selectedProfession
    ? allCitas.filter(cita => cita.profesion === selectedProfession)
    : allCitas;

  // Redirige al cerrar sesión (ejemplo)
  const cerrarSesion = () => {
    window.location.href = "http://localhost:3001"; // URL de tu página de login
  };

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 font-sans flex flex-col">
      {/* --- Header --- */}
      <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agenda Médica</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg">Hola, {currentUser.name}</span>
          <button
            onClick={cerrarSesion}
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* --- Contenido Principal --- */}
      <main className="container mx-auto p-6 flex-grow">
        {/* --- Filtro de Profesiones --- */}
        <div className="relative text-center mb-8">
          <button
            onClick={() => handleProfessionFilter(null)} // El `null` aquí es para toggling
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            {selectedProfession ? `Ver todas las especialidades` : `Filtrar por Especialidad ${getUniqueProfessions().length > 0 ? '▼' : ''}`}
          </button>
          {/* Menú desplegable, visible solo si no hay una profesión seleccionada (o si se quiere volver a todas) */}
          {selectedProfession === null && getUniqueProfessions().length > 0 && (
            <div className={`
              absolute left-1/2 transform -translate-x-1/2 mt-3 bg-white border border-blue-300 rounded-lg shadow-xl z-10
              max-h-60 overflow-y-auto w-64 md:w-80
            `}>
              <ul className="py-2">
                {getUniqueProfessions().map(profession => (
                  <li
                    key={profession}
                    onClick={() => handleProfessionFilter(profession)}
                    className={`
                      px-6 py-2 cursor-pointer text-blue-800 hover:bg-blue-100 transition duration-200
                    `}
                  >
                    {profession}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* --- Lista de Citas --- */}
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6 border-b-2 border-blue-400 pb-2">
          Citas Disponibles y Agendadas
        </h2>

        {filteredCitas.length === 0 ? (
          <p className="text-center text-lg text-blue-700 p-8 bg-blue-100 rounded-lg shadow-inner">
            No hay citas disponibles para la especialidad seleccionada o ninguna cita registrada.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCitas.map((cita) => {
              const isBookedByUser = cita.estado === 'Agendada' && cita.bookedBy === currentUser.id;
              const isBookedByOther = cita.estado === 'Agendada' && cita.bookedBy !== currentUser.id;
              const isAvailable = cita.estado === 'Disponible';

              return (
                <div
                  key={cita.idCita}
                  // Clases dinámicas de Tailwind basadas en el estado de la cita
                  className={`
                    p-6 rounded-xl shadow-lg transition duration-300 ease-in-out
                    ${isBookedByUser
                      ? 'bg-blue-800 text-white border-2 border-blue-900' // Agendada por el usuario
                      : isBookedByOther
                        ? 'bg-blue-500 text-white border-2 border-blue-600 cursor-not-allowed' // Agendada por otro
                        : 'bg-blue-200 text-blue-900 border-2 border-blue-300 cursor-pointer hover:shadow-xl hover:translate-y-[-3px]' // Disponible
                    }
                  `}
                  // Solo permitir click si la cita está disponible
                  onClick={() => isAvailable && handleBookClick(cita)}
                >
                  <h3 className={`text-xl font-bold mb-2 ${isBookedByUser || isBookedByOther ? 'text-white' : 'text-blue-900'}`}>
                    {cita.profesion}
                  </h3>
                  <p className={`text-sm mb-1 ${isBookedByUser || isBookedByOther ? 'text-blue-100' : 'text-blue-700'}`}>
                    <span className="font-semibold">Fecha y Hora:</span> {formatFecha(cita.fechaCita)}
                  </p>
                  <p className={`text-sm mb-1 ${isBookedByUser || isBookedByOther ? 'text-blue-100' : 'text-blue-700'}`}>
                    <span className="font-semibold">Sede:</span> {cita.sede}
                  </p>
                  <p className={`text-sm mb-3 ${isBookedByUser || isBookedByOther ? 'text-blue-100' : 'text-blue-700'}`}>
                    <span className="font-semibold">Localidad:</span> {cita.localidad}
                  </p>
                  {cita.empleadoAsignado && (
                    <p className={`text-sm italic ${isBookedByUser || isBookedByOther ? 'text-blue-200' : 'text-blue-600'}`}>
                      <span className="font-semibold">Profesional:</span> {cita.empleadoAsignado}
                    </p>
                  )}
                  <div className={`mt-4 pt-4 border-t-2 ${isBookedByUser || isBookedByOther ? 'border-blue-400' : 'border-blue-300'} text-right`}>
                    {isBookedByUser ? (
                      <span className="text-lg font-bold flex items-center justify-end text-white">
                        Agendada por ti <span className="ml-2 text-xl">✅</span>
                      </span>
                    ) : isBookedByOther ? (
                      <span className="text-lg font-bold flex items-center justify-end text-blue-200">
                        No disponible <span className="ml-2 text-xl">🚫</span>
                      </span>
                    ) : (
                      <span className="text-lg font-bold text-blue-800">
                        Disponible para reservar
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* --- Modal de Confirmación --- */}
      {isModalOpen && citaToBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center border-t-4 border-blue-600">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Confirmar Cita</h3>
            <p className="text-lg text-blue-700 mb-2">¿Estás seguro de agendar esta cita?</p>
            <p className="text-md text-blue-900 mb-1">
              <span className="font-semibold">Profesión:</span> {citaToBook.profesion}
            </p>
            <p className="text-md text-blue-900 mb-4">
              <span className="font-semibold">Fecha y Hora:</span> {formatFecha(citaToBook.fechaCita)}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition duration-300"
              >
                Confirmar
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-5 rounded-lg transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacientePage;

function setCitas(arg0: Cita[]) {
  throw new Error('Function not implemented.');
}
