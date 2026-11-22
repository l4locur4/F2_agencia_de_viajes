export default function Cargando({ mensaje = 'Cargando información...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-slate-600">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-sm font-medium">{mensaje}</p>
    </div>
  )
}