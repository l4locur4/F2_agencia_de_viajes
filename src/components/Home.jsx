import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cargando from './Cargando'

export default function Home() {
  const [destinos, setDestinos] = useState([])
  const [paisSeleccionado, setPaisSeleccionado] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch('/api/destinos')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}: No se pudieron cargar los destinos`)
        }
        return res.json()
      })
      .then((data) => {
        setDestinos(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <Cargando mensaje="Cargando destinos disponibles desde API REST..." />

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium">
        ⚠️ {error}
      </div>
    )
  }

  const paises = ['Todos', ...new Set(destinos.map((d) => d.pais))]

  const destinosFiltrados =
    paisSeleccionado === 'Todos'
      ? destinos
      : destinos.filter((d) => d.pais === paisSeleccionado)

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">🌍 Destinos Disponibles</h2>
          <p className="text-slate-600 text-sm">
            Selecciona un destino para consultar vuelos y hoteles disponibles:
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="filtro-pais" className="text-sm font-semibold text-slate-700">
            Filtrar por país:
          </label>
          <select
            id="filtro-pais"
            value={paisSeleccionado}
            onChange={(e) => setPaisSeleccionado(e.target.value)}
            className="p-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none shadow-sm"
          >
            {paises.map((pais, index) => (
              <option key={index} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinosFiltrados.map((destino) => (
          <div
            key={destino.id}
            className="bg-slate-50 rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-blue-300 transition"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-slate-800">{destino.nombre}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  📍 {destino.pais}
                </span>
              </div>

              <p className="text-slate-600 text-sm mb-4">{destino.descripcion}</p>

              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Actividades populares:
                </h4>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                  {destino.actividadesPopulares.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              to={`/destino/${destino.id}`}
              state={{ destino }}
              className="w-full text-center bg-slate-900 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 transition text-sm"
            >
              Ver Vuelos y Hoteles →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}