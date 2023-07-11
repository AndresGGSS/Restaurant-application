import AdminLayout from "@/layout/AdminLayout"
import  useSWR from "swr"
import axios from "axios"
import Order from "@/Components/Order"

export default function Admin() {

    const fetcher = () => axios('/api/orders').then(datos => datos.data)
    const { data, error, isLoading} = useSWR('/api/orders',fetcher,{refreshInterval: 100})

    return (
        <AdminLayout pagina={'Admin'}>
            <h1 className="text-4xl font-black">Panel de administración</h1>
            <p className="text-2xl my-10">Administra las ordenes</p>
            {data && data.length ? data.map(datos => <Order key={datos.id} datos={datos}/>) : <p>No hay ordenes pendientes</p> }
        </AdminLayout>
    )
}
