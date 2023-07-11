import Image from "next/image"
import useRestaurant from "@/Hooks/useRestaurant"
import { formatMoney } from "@/helpers"
import { useState, useEffect } from "react"

export default function ModalProduct() {

    const { producto, handleModal, handleAddOrder, order } = useRestaurant()
    const [cantidad, setCantidad] = useState(1)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        if (order.some((orderState) => orderState.id === producto.id)) {
            const productEdit = order.find((orderState) => orderState.id === producto.id)
            setEdit(true)
            setCantidad(productEdit.cantidad)
        }
    }, [producto, order])


    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/3">
                <Image width={300} height={400} alt={`imagen producto ${producto.nombre}`} src={`/assets/img/${producto.imagen}.jpg`} className="rounded-md" />
            </div>
            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button onClick={() => handleModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
                <p className="mt-5 font-black text-5xl text-amber-500">{formatMoney(producto.precio)}</p>
                <div className="flex gap-4 mt-5">
                    <button type="button" onClick={() => { if (cantidad <= 1) { return } else { setCantidad(cantidad - 1) } }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <p className="text-3xl">{cantidad}</p>
                    <button type="button" onClick={() => { if (cantidad >= 10) { return } else { setCantidad(cantidad + 1) } }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <button type="button" className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded" onClick={() => handleAddOrder({ ...producto, cantidad })}>{ edit ? 'Guardar cambios' : 'Añadir al pedido'}</button>
            </div>
        </div>
    )
}
