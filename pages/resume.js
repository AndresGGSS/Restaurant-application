import Layout from "@/layout/layout";
import useRestaurant from "@/Hooks/useRestaurant";
import ResumeProduct from "@/Components/ResumeProduct";

export default function Resume() {
    const { order } = useRestaurant();

    return (
        <Layout pagina="Resumen">
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisa tu pedido</p>
            {order.length === 0 ? (
                <p className="text-center text-2xl">No hay elementos en tu pedido</p>
            ) : (
                order.map((producto) => (<ResumeProduct key={producto.id} product={producto}/>))
            )}
        </Layout>
    );
}
