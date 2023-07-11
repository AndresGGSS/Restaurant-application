import Image from "next/image";
import useRestaurant from "@/Hooks/useRestaurant";
import Category from "./Category";

export default function SideBar() {
    const { categorias } = useRestaurant()
    return (
        <>
            <Image width={300} height={100} src="/assets/img/logo.svg" alt="Imagen Logotipo" className="mx-auto"/>
            <nav className="mt-10">
                {categorias.map(categoria => (
                    <Category
                        key={categoria.id}
                        categoria={categoria}
                    />
                ))}
            </nav>
        </>
    )
}
