import Image from "next/image";
import { formatMoney } from "@/helpers";
import axios from "axios";
import { toast } from "react-toastify";

export default function Order({ datos }) {
    const { id, nombre, total, pedido } = datos;
    const array = JSON.parse(pedido);

    const orderComplete = async () => {
        try {
            await axios.post(`/api/orders/${id}`)  
            toast.success('Orden completada')
        } catch (error) {
            toast.error('Hubo un error')
        }
    }

    return (
        <div className='border p-10 space-y-5 mb-5 rounded-md shadow-lg'>
            <h3 className="text-2xl font-bold">Orden: {id}</h3>
            <p className="text-lg font-bold">Cliente: {nombre}</p>

            <div>
                {array.map((orden) => (
                    <div key={orden.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                        <div className="w-32">
                            <Image
                                alt={`Imagen platillo ${orden.nombre}`}
                                src={`/assets/img/${orden.imagen}.jpg`}
                                width={400}
                                height={500}
                                className='rounded-md'
                            />
                        </div>
                        <div className="p-5 space-y-2">
                            <h4 className="text-xl font-bold text-amber-500">{orden.nombre}</h4>
                            <p className="text-lg font-bold">Cantidad: {orden.cantidad}</p>
                        </div>                        
                    </div>
                ))}
            </div>
            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-black text-4xl text-amber-500">Total a pagar: {formatMoney(total)}</p>
                <button 
                className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg" 
                type="button" 
                onClick={orderComplete}>Completar orden</button>
            </div>
        </div>
    );
}
