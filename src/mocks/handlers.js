import { http, graphql, HttpResponse, delay } from 'msw'

const destinos = [
  {
    id: 1,
    nombre: 'París',
    pais: 'Francia',
    descripcion: 'La ciudad de la luz, ideal para arte, gastronomía y arquitectura histórica.',
    actividadesPopulares: ['Visitar la Torre Eiffel', 'Recorrer el Museo del Louvre', 'Paseo en barco por el Sena']
  },
  {
    id: 2,
    nombre: 'Tokio',
    pais: 'Japón',
    descripcion: 'Metrópoli vibrante donde conviven templos milenarios y tecnología de punta.',
    actividadesPopulares: ['Cruzar Shibuya', 'Visitar el templo Senso-ji', 'Tour gastronómico en Shinjuku']
  },
  {
    id: 3,
    nombre: 'Cusco',
    pais: 'Perú',
    descripcion: 'Capital histórica del Imperio Inca y puerta de entrada a los Andes.',
    actividadesPopulares: ['Excursión a Machu Picchu', 'Recorrer el Valle Sagrado', 'Caminata a la Montaña de 7 Colores']
  },
  {
    id: 4,
    nombre: 'Río de Janeiro',
    pais: 'Brasil',
    descripcion: 'Playas icónicas, samba y paisajes tropicales entre morros y selva.',
    actividadesPopulares: ['Subir al Cristo Redentor', 'Atardecer en Pan de Azúcar', 'Día de playa en Copacabana']
  }
]

const vuelosYHotelesPorDestino = {
  '1': {
    vuelos: [
      { id: 'V-101', aerolinea: 'Air France', fecha: '2026-12-10', precio: 890000, disponible: true },
      { id: 'V-102', aerolinea: 'LATAM Airlines', fecha: '2026-12-15', precio: 820000, disponible: true },
      { id: 'V-103', aerolinea: 'Iberia', fecha: '2026-12-20', precio: 950000, disponible: false }
    ],
    hoteles: [
      { id: 'H-101', nombre: 'Hotel Le Marais Boutique', fechas: '10 Dic - 17 Dic 2026', precioPorNoche: 145000, disponible: true },
      { id: 'H-102', nombre: 'Hôtel Eiffel Seine', fechas: '15 Dic - 22 Dic 2026', precioPorNoche: 180000, disponible: true }
    ]
  },
  '2': {
    vuelos: [
      { id: 'V-201', aerolinea: 'ANA (All Nippon Airways)', fecha: '2027-01-08', precio: 1250000, disponible: true },
      { id: 'V-202', aerolinea: 'Japan Airlines', fecha: '2027-01-14', precio: 1190000, disponible: false }
    ],
    hoteles: [
      { id: 'H-201', nombre: 'Shinjuku Granbell Hotel', fechas: '08 Ene - 15 Ene 2027', precioPorNoche: 130000, disponible: true },
      { id: 'H-202', nombre: 'Asakusa View Hotel', fechas: '14 Ene - 21 Ene 2027', precioPorNoche: 115000, disponible: true }
    ]
  },
  '3': {
    vuelos: [
      { id: 'V-301', aerolinea: 'LATAM Airlines', fecha: '2026-12-05', precio: 260000, disponible: true },
      { id: 'V-302', aerolinea: 'Sky Airline', fecha: '2026-12-12', precio: 215000, disponible: true }
    ],
    hoteles: [
      { id: 'H-301', nombre: 'Palacio del Inka Luxury', fechas: '05 Dic - 10 Dic 2026', precioPorNoche: 195000, disponible: true },
      { id: 'H-302', nombre: 'Tierra Viva Cusco Plaza', fechas: '12 Dic - 17 Dic 2026', precioPorNoche: 85000, disponible: false }
    ]
  },
  '4': {
    vuelos: [
      { id: 'V-401', aerolinea: 'GOL Líneas Aéreas', fecha: '2027-02-02', precio: 310000, disponible: true },
      { id: 'V-402', aerolinea: 'LATAM Airlines', fecha: '2027-02-10', precio: 345000, disponible: true }
    ],
    hoteles: [
      { id: 'H-401', nombre: 'Miramar Hotel by Windsor', fechas: '02 Feb - 09 Feb 2027', precioPorNoche: 160000, disponible: true },
      { id: 'H-402', nombre: 'Arena Copacabana Hotel', fechas: '10 Feb - 17 Feb 2027', precioPorNoche: 120000, disponible: true }
    ]
  }
}

export const handlers = [
  // 1. API REST mock: listar destinos disponibles (país + actividades populares)
  http.get('/api/destinos', async () => {
    await delay(600)
    return HttpResponse.json(destinos)
  }),

  // 2. API GraphQL mock: consultar vuelos y hoteles por destino seleccionado
  graphql.query('GetOpcionesViaje', async ({ variables }) => {
    await delay(600)
    const { destinoId } = variables
    const opciones = vuelosYHotelesPorDestino[String(destinoId)]

    if (!opciones) {
      return HttpResponse.json({
        errors: [{ message: `No se encontraron vuelos ni hoteles para el destino "${destinoId}"` }]
      })
    }

    return HttpResponse.json({
      data: {
        opcionesViaje: opciones
      }
    })
  })
]