import apiClient from './apiClient'

class CategoriaService {
    
    // Obtener todas las categorías
    async obtenerCategorias() {
        try {
            const response = await apiClient.get('/categorias')
            return {
                success: true,
                data: response.data.data
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al obtener categorías',
                error: error
            }
        }
    }

    // Obtener una categoría por ID
    async obtenerCategoria(id) {
        try {
            const response = await apiClient.get(`/categorias/${id}`)
            return {
                success: true,
                data: response.data.data
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.error || 'Error al obtener la categoría',
                error: error
            }
        }
    }

    // Crear nueva categoría
    async crearCategoria(datos) {
        try {
            const response = await apiClient.post('/categorias', datos)
            return {
                success: true,
                message: 'Categoría creada exitosamente',
                data: response.data
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.mensaje || 'Error al crear la categoría',
                error: error
            }
        }
    }

    // Actualizar categoría
    async actualizarCategoria(id, datos) {
        try {
            const response = await apiClient.put(`/categorias/${id}`, datos)
            return {
                success: true,
                message: 'Categoría actualizada exitosamente',
                data: response.data
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.mensaje || 'Error al actualizar la categoría',
                error: error
            }
        }
    }

    // Eliminar categoría
    async eliminarCategoria(id) {
        try {
            const response = await apiClient.delete(`/categorias/${id}`)
            return {
                success: true,
                message: 'Categoría eliminada exitosamente',
                data: response.data
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al eliminar la categoría',
                error: error
            }
        }
    }
}

export default new CategoriaService()
