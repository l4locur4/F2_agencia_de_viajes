import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import DetalleDestino from './components/DetalleDestino'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 py-8 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          
          <header className="relative w-full h-52 bg-slate-900">
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=80" 
              alt="Agencia de Viajes" 
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow">
                ✈️ Agencia de Viajes Horizonte
              </h1>
              <p className="text-sm md:text-base text-slate-100 mt-1 drop-shadow">
                Explora destinos internacionales, vuelos y hoteles en un solo lugar
              </p>
            </div>
          </header>

          <nav className="bg-slate-900 p-4 flex flex-wrap justify-center gap-3 shadow-md">
            <Link to="/" className="text-white bg-blue-600 hover:bg-blue-500 font-medium px-4 py-2 rounded-lg transition text-sm">
              🌍 Destinos Disponibles
            </Link>
            <Link to="/about" className="text-white bg-slate-800 hover:bg-slate-700 font-medium px-4 py-2 rounded-lg transition text-sm">
              👥 Quiénes Somos
            </Link>
            <Link to="/contact" className="text-white bg-slate-800 hover:bg-slate-700 font-medium px-4 py-2 rounded-lg transition text-sm">
              📞 Contacto
            </Link>
          </nav>

          <main className="p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destino/:id" element={<DetalleDestino />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

        </div>
      </div>
    </BrowserRouter>
  )
}

export default App