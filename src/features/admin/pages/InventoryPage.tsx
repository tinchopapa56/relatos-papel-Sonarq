import { useState, useMemo, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { books, type Book } from '@/features/books/books'

const ITEMS_PER_PAGE = 20

const BookSchema = Yup.object().shape({
  title: Yup.string().required('Requerido'),
  author: Yup.string().required('Requerido'),
  price: Yup.number().min(0, 'Precio inválido').required('Requerido'),
  stock: Yup.number().min(0, 'Stock inválido').required('Requerido'),
  format: Yup.string().oneOf(['fisico', 'virtual']).required('Requerido'),
})

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [formatFilter, setFormatFilter] = useState<'all' | 'fisico' | 'virtual'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const totalPhysical = books.filter(b => b.format === 'fisico').length
  const totalVirtual = books.filter(b => b.format === 'virtual').length

  const filteredBooks = useMemo(() => {
    return books.filter((book: Book) => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFormat = formatFilter === 'all' || book.format === formatFilter
      return matchesSearch && matchesFormat
    })
  }, [searchTerm, formatFilter])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, formatFilter])

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE)
  const currentBooks = filteredBooks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleAddBook = (values: Book) => {

    console.log('Nuevo libro:', values)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setIsModalOpen(false)
    }, 2000)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Inventario de Libros</h1>
          <p className="text-muted">Gestiona el stock y los formatos de tu catálogo completo.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/20 active:scale-95"
        >
          + Nuevo Libro
        </button>
      </header>


      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <button
            onClick={() => setFormatFilter('fisico')}
            className={`bg-surface border p-6 rounded-2xl shadow-sm flex items-center justify-between group transition-all ${formatFilter === 'fisico' ? 'border-orange-500 ring-1 ring-orange-500/20' : 'border-border hover:border-orange-500/30'
              }`}
          >
            <div className="text-left">
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Libros Físicos</p>
              <h3 className="text-3xl font-bold text-text">{totalPhysical}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform ${formatFilter === 'fisico' ? 'bg-orange-500 text-white scale-110' : 'bg-orange-500/10 text-orange-500 group-hover:scale-110'
              }`}>
              📚
            </div>
          </button>

          <button
            onClick={() => setFormatFilter('virtual')}
            className={`bg-surface border p-6 rounded-2xl shadow-sm flex items-center justify-between group transition-all ${formatFilter === 'virtual' ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-border hover:border-blue-500/30'
              }`}
          >
            <div className="text-left">
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Libros Virtuales</p>
              <h3 className="text-3xl font-bold text-text">{totalVirtual}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform ${formatFilter === 'virtual' ? 'bg-blue-500 text-white scale-110' : 'bg-blue-500/10 text-blue-500 group-hover:scale-110'
              }`}>
              📱
            </div>
          </button>

          <div className="flex flex-col justify-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por título o autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface border border-border rounded-xl px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">🔍</span>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="flex items-center justify-between px-2">
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider">
                {formatFilter !== 'all' && (
                  <button onClick={() => setFormatFilter('all')} className="text-primary hover:underline transition-all">
                    Ver todos los formatos
                  </button>
                )}
              </p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider">
                Encontrados: {filteredBooks.length}
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-raised/50 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Libro</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Formato</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Precio</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentBooks.map((book) => (
                <tr key={book.id} className="hover:bg-raised/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform border border-border"
                      />
                      <div>
                        <p className="text-base font-bold text-text leading-tight mb-1 group-hover:text-primary transition-colors">{book.title}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted font-medium italic">{book.author}</p>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <p className="text-[10px] text-muted font-mono uppercase tracking-tighter">ID: {book.id}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${book.format === 'fisico'
                        ? 'bg-orange-500/10 text-orange-600 border border-orange-500/20'
                        : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                      }`}>
                      {book.format === 'fisico' ? '📙 Físico' : '📄 Virtual'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-text">
                    ${book.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`text-sm font-bold ${book.stock < 5 ? 'text-error' : book.stock < 15 ? 'text-secondary' : 'text-success'
                        }`}>
                        {book.format === 'virtual' ? '∞' : book.stock}
                      </span>
                      {book.format === 'fisico' && (
                        <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${book.stock < 5 ? 'bg-error' : book.stock < 15 ? 'bg-secondary' : 'bg-success'
                              }`}
                            style={{ width: `${Math.min((book.stock / 50) * 100, 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors" title="Editar">
                        ✏️
                      </button>
                      <button className="p-2 hover:bg-error/10 text-error rounded-lg transition-colors" title="Eliminar">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBooks.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">🏜️</span>
                      <p className="text-muted italic">No se encontraron libros que coincidan con tu búsqueda.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


        <div className="p-4 bg-raised/20 border-t border-border flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xs text-muted">
              Mostrando <span className="font-bold text-text">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> a <span className="font-bold text-text">{Math.min(currentPage * ITEMS_PER_PAGE, filteredBooks.length)}</span> de <span className="font-bold text-text">{filteredBooks.length}</span> resultados
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted">
              Página <span className="font-bold text-text">{currentPage}</span> de {totalPages || 1}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-surface w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-border flex items-center justify-between bg-raised/30">
              <h2 className="text-xl font-bold text-text">Añadir Nuevo Libro</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-text text-xl">✕</button>
            </div>

            <div className="p-6">
              {showSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center text-3xl mb-4 shadow-lg shadow-success/10">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">¡Libro Guardado!</h3>
                  <p className="text-sm text-muted">Libro guardado correctamente en el sistema.</p>
                </div>
              ) : (
                <Formik
                  initialValues={{ id: '', title: '', author: '', price: 0, stock: 0, format: 'fisico' }}
                  validationSchema={BookSchema}
                  onSubmit={handleAddBook}
                >
                  {({ errors, touched, values }) => (
                    <Form className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Título del Libro</label>
                        <Field
                          name="title"
                          className={`w-full bg-raised border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.title && touched.title ? 'border-error' : 'border-border focus:border-primary'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Autor</label>
                        <Field
                          name="author"
                          className={`w-full bg-raised border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.author && touched.author ? 'border-error' : 'border-border focus:border-primary'}`}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Precio ($)</label>
                          <Field
                            name="price"
                            type="number"
                            step="0.01"
                            className={`w-full bg-raised border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.price && touched.price ? 'border-error' : 'border-border focus:border-primary'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Stock</label>
                          <Field
                            name="stock"
                            type="number"
                            disabled={values.format === 'virtual'}
                            placeholder={values.format === 'virtual' ? '∞' : ''}
                            className={`w-full bg-raised border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.stock && touched.stock ? 'border-error' : 'border-border focus:border-primary'} disabled:opacity-50`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Formato</label>
                        <div className="grid grid-cols-2 gap-2">
                          <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${values.format === 'fisico' ? 'bg-orange-500/10 border-orange-500 text-orange-600 font-bold' : 'bg-raised border-border text-muted hover:border-orange-500/30'}`}>
                            <Field type="radio" name="format" value="fisico" className="hidden" />
                            <span>📙 Físico</span>
                          </label>
                          <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${values.format === 'virtual' ? 'bg-blue-500/10 border-blue-500 text-blue-600 font-bold' : 'bg-raised border-border text-muted hover:border-blue-500/30'}`}>
                            <Field type="radio" name="format" value="virtual" className="hidden" />
                            <span>📄 Virtual</span>
                          </label>
                        </div>
                      </div>
                      <div className="pt-4 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="flex-1 py-3 rounded-xl border border-border text-text font-bold text-sm hover:bg-raised transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="flex-[2] py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm transition-all shadow-lg shadow-primary/20"
                        >
                          Guardar Libro
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
