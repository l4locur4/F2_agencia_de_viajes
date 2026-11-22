import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import Cargando from './Cargando'

const GET_OPCIONES_VIAJE = gql`
  query GetOpcionesViaje($destinoId: ID!) {
    opcionesViaje(destinoId: $destinoId) {
      vuelos {
        id
        aerolinea
        fecha
        precio
        disponible
      }
      hoteles {
        id
        nombre
        fechas
        precioPorNoche
        disponible
      }
    }
  }
`

export default function DetalleDestino() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const destino = location.state?.destino

  const { loading, error, data } = useQuery(GET_OPCIONES_VIAJE, {
    variables: { destinoId: id }
  })

  if (loading) return <Cargando mensaje="Consultando vuelos y hoteles vía GraphQL..." />

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 font-semibold mb-4">⚠️ Error al consultar opciones: {error.message}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition cursor-pointer"
        >
          ← Volver a Destinos
        </button>
      </div>
    )
  }

  const { vuelos, hoteles } = data.opcionesViaje

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            ✈️ Opciones de Viaje {destino ? `a ${destino.nombre} (${destino.pais})` : `#${id}`}
          </h2>
          <p className="text-slate-600 text-sm">
            Consulta tarifas, fechas y disponibilidad actualizada de vuelos y alojamiento:
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-slate-200 text-slate-800 font-medium px-4 py-2 rounded-lg hover:bg-slate-300 transition text-sm cursor-pointer"
        >
          ← Volver a Destinos
        </button>
      </div>

      {/* Sección Vuelos */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-3">🛫 Vuelos Disponibles</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white text-sm">
                <th className="p-3">Código</th>
                <th className="p-3">Aerolínea</th>
                <th className="p-3">Fecha de Salida</th>
                <th className="p-3 text-right">Precio (CLP)</th>
                <th className="p-3 text-center">Disponibilidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {vuelos.map((vuelo) => (
                <tr key={vuelo.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono text-slate-600">{vuelo.id}</td>
                  <td className="p-3 font-semibold text-slate-800">{vuelo.aerolinea}</td>
                  <td className="p-3 text-slate-600">{vuelo.fecha}</td>
                  <td className="p-3 text-right font-bold text-slate-800">
                    ${vuelo.precio.toLocaleString('es-CL')}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        vuelo.disponible
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {vuelo.disponible ? 'Disponible' : 'Agotado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sección Hoteles */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-3">🏨 Hoteles Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hoteles.map((hotel) => (
            <div
              key={hotel.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-bold text-slate-800 text-base">{hotel.nombre}</h4>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                      hotel.disponible
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {hotel.disponible ? 'Disponible' : 'Sin cupos'}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1">📅 Fechas: {hotel.fechas}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs text-slate-500">Tarifa por noche</span>
                <span className="text-lg font-extrabold text-blue-600">
                  ${hotel.precioPorNoche.toLocaleString('es-CL')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}