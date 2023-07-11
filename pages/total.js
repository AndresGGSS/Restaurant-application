import Layout from "@/layout/layout";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import useRestaurant from "@/Hooks/useRestaurant";
import Table from "@/Components/Table";
import Form from '@/Components/Form';

export default function Total() {
    const { order, state } = useRestaurant();

    return (
        <Layout pagina="Total y Confirmar pedido">
            <h1 className="text-4xl">Total y Confirmar pedido</h1>
            <p className="text-2xl my-5">Confirmar tu pedido a continuación</p>

            {order.length === 0 ? (
                <p className="text-center text-2xl">No hay elementos en tu pedido</p>
            ) : (
                <div className="w-full justify-center h-full items-center">
                    <h2 className="text-3xl font-black text-center mb-5">Detalles de facturación</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="my-auto">
                            <Table order={order} />
                        </div>
                        <div className='my-auto p-5 bg-slate-50 rounded-md shadow-xl'>
                            <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} />
                            <Form />
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
