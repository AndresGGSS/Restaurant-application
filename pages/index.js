
import { PrismaClient } from '.prisma/client'
import Layout from '@/layout/layout'
import useRestaurant from '@/Hooks/useRestaurant'
import Product from '@/Components/Product'

export default function Home({ categorias }) {
  const { categActual } = useRestaurant()

  return (
    <Layout pagina={`Menu ${categActual?.nombre}`}>
      <h1 className='text-4xl font-black'>{categActual?.nombre}</h1>
      <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuación</p>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {categActual?.productos?.map(producto => (
          <Product key={producto.id} producto={producto} />
        ))}
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const prisma = new PrismaClient()
  const categorias = await prisma.categoria.findMany()
  return {
    props: {
      categorias,
    }
  }
}
