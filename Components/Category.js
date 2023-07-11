import Image from "next/image"
import useRestaurant from "@/Hooks/useRestaurant"

export default function Category({categoria}) {
    const {nombre, icono, id} = categoria
    const {handleClickCategoria,categActual} = useRestaurant()

    return (
      <div className={`${categActual?.id === id ? 'bg-amber-400':''} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
        <Image alt="Imagen Icono" width={70} height={70} src={`/assets/img/icono_${icono}.svg`}/>
        <button type="button" className="text-2xl font-bold hover:cursor-pointer" onClick={() => handleClickCategoria(id)}>{nombre}</button>
      </div>
    )
}


