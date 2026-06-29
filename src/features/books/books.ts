export interface Book {
  id: string
  title: string
  author: string
  price: number
  description?: string
  coverImage?: string
  format: 'fisico' | 'virtual'
  stock: number
}

const baseBooks: Omit<Book, 'format' | 'stock'>[] = [
  {
    id: '1',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    price: 15.99,
    description: 'Un piloto se encuentra perdido en el desierto del Sahara después de que su avión sufriera una avería, pero para su sorpresa, es allí donde conoce a un pequeño príncipe proveniente de otro planeta.',
    coverImage: 'https://m.media-amazon.com/images/I/61RIPwDRbYL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    price: 12.50,
    description: 'En el año 1984, el mundo está dividido en tres superpotencias: Oceanía, Eurasia y Asia Oriental. Londres, la principal ciudad de Oceanía, es una urbe lúgubre y vigilada.',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    price: 18.00,
    description: 'La novela narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.',
    coverImage: 'https://bookscompany.pe/wp-content/uploads/2025/02/9788466379717.jpg'
  },
  {
    id: '4',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    price: 20.00,
    description: 'Alonso Quijano, un hidalgo pobre que de tanto leer novelas de caballería acaba enloqueciendo y creyéndose un caballero andante.',
    coverImage: 'https://images.cdn2.buscalibre.com/fit-in/360x360/73/b6/73b6fd96c31d26e2b6a3531808c1188c.jpg'
  },
  {
    id: '5',
    title: 'Crónica de una muerte anunciada',
    author: 'Gabriel García Márquez',
    price: 14.20,
    description: 'En un pequeño pueblo, Santiago Nasar es asesinado por los gemelos Vicario para vengar el honor de su hermana.',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQToAQ-xouDRPSPDIWe6FTNoBOXuwft-sWI4wZmo6okwM1-8-kkiKSCiFlZh5t9gXv3OQJhQdCxicpBgkIs01xBV54gg84EH7HPdMfzBw&s=10'
  },
  {
    id: '6',
    title: 'Rayuela',
    author: 'Julio Cortázar',
    price: 16.50,
    description: 'La historia de Horacio Oliveira y su relación con La Maga en París y Buenos Aires.',
    coverImage: 'https://bookscompany.pe/wp-content/uploads/2025/02/9789589016787.jpg'
  }
]


export const books: Book[] = Array.from({ length: 200 }, (_, i) => {
  const base = baseBooks[i % baseBooks.length]
  const format: 'fisico' | 'virtual' = i % 2 === 0 ? 'fisico' : 'virtual'
  
  return {
    ...base,
    id: (i + 1).toString(),
    title: `${base.title} (Vol. ${i + 1})`,

    price: Number((base.price + (i % 10)).toFixed(2)),
    format,

    stock: format === 'virtual' ? 999 : Math.floor(Math.random() * 50) + 1
  }
})
