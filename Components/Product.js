import Image from "next/image"
import { formatMoney } from "@/helpers"
import useRestaurant from "@/Hooks/useRestaurant"

export default function Product({ producto }) {
  
  const {handleProduct, handleModal} = useRestaurant()
  const { nombre, imagen, precio } = producto

  return (
    <div className="border p-3 my-4 rounded-md shadow-md">
      <Image src={`/assets/img/${imagen}.jpg`} alt={`Imagen Platillo ${nombre}`} width={400} height={500} className="rounded-md" />
      <div>
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatMoney(precio)}
        </p>
        <button type="button" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold" onClick={() =>{
          handleModal()
          handleProduct(producto)
        }}>Agregar</button>
      </div>
    </div>
  )
}
