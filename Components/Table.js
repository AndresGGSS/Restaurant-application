import useRestaurant from "@/Hooks/useRestaurant"
import { formatMoney } from "@/helpers"

export default function Table({ order }) {
    const { total } = useRestaurant()

    const iva = total * 0.13;
    const totalNeto = total + iva;

    return (
        <div className='shadow-xl rounded-md p-5 bg-slate-50'>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="border-collapse border h-10">
                        <th className="text-left pl-2">Producto</th>
                        <th className="text-center">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map(producto => (
                        <tr className="border-collapse border h-10" key={producto.id}>
                            <td className="pl-2">{producto.nombre} x {producto.cantidad}</td>
                            <td className="text-center">{formatMoney(producto.precio)}</td>
                        </tr>
                    ))}
                    <tr className="border-collapse border h-10">
                        <td className="pl-2">Subtotal</td>
                        <td className="text-center">{formatMoney(total)}</td>
                    </tr>
                    <tr className="border-collapse border h-10">
                        <td className="pl-2">Impuesto IVA (13%)</td>
                        <td className="text-center">{formatMoney(iva)}</td>
                    </tr>
                    <tr className="border-collapse border h-10">
                        <td className="pl-2">Total Neto</td>
                        <td className="text-center">{formatMoney(totalNeto)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
