import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";

const RestaurantContext = createContext()

const RestaurantProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [categActual, setCatActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [order, setOrder] = useState([])
    const [step, setStep] = useState(1)
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    })
    const [boolean, setBoolean] = useState(true)
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCatActual(categorias[0])
    }, [categorias])


    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCatActual(categoria[0])
        router.push('/')
    }

    const handleProduct = (producto) => {
        setProducto(producto)
    }

    const handleModal = () => {
        setModal(!modal)
    }

    const handleAddOrder = ({ categoriaId, ...orders }) => {
        if (order.some(productState => productState.id === orders.id)) {
            const orderUpdated = order.map(productState => productState.id === orders.id ? orders : productState)
            setOrder(orderUpdated)
            toast.success('Guardado Correctamente')
        } else {
            setOrder([...order, orders])
            toast.success('Agregado al pedido')
        }

        setModal(false)
    }

    const handleStep = paso => {
        setStep(paso)
    }

    const handleEditCuanties = id => {
        const productUpdated = order.filter(product => product.id === id)
        setProducto(productUpdated[0])
        setModal(!modal)
    }

    const handleDelete = id => {
        const orderUpdated = order.filter(product => product.id !== id)
        setOrder(orderUpdated)
        toast.success('Eliminando...')
    }

    useEffect(() => {
        const newtotal = order.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(newtotal)
    }, [order])


    const validateForm = () => {
        const isFormValid =
            state.number !== '' &&
            state.expiry !== '' &&
            state.cvc !== '' &&
            state.name !== '';

        if (isFormValid) {
            setBoolean(true)
            return true
        } else {
            setBoolean(false); // Actualizar el estado para mostrar un mensaje de error o tomar otras acciones
            return false
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Evitar el envío del formulario
        if (validateForm()) {
            try {
                const nombre = state.name.toString();
                const pedido = JSON.stringify(order); 
                await axios.post('/api/orders', { pedido, nombre, total, fecha: Date.now().toString()}); 

                setCatActual(categorias[0])
                setOrder([])
                setTotal(0)
                setState({
                    number: '',
                    expiry: '',
                    cvc: '',
                    name: '',
                    focus: '',
                })

                toast.success('Pedido realizado correctamente')

                setTimeout(() => {
                    router.push('/')
                }, 3000);

            } catch (error) {
                console.log(error);
            }
        }
    };
        
    return (
        <RestaurantContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categActual,
                handleProduct,
                producto,
                handleModal,
                modal,
                handleAddOrder,
                order,
                step,
                handleStep,
                handleEditCuanties,
                handleDelete,
                setState,
                state,
                setTotal,
                total,
                handleFormSubmit,
                boolean
            }}
        >
            {children}
        </RestaurantContext.Provider>
    )
}

export {
    RestaurantProvider
}
export default RestaurantContext