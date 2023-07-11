import '@/styles/globals.css'
import { RestaurantProvider } from '@/Context/RestaurantProvider'

export default function App({ Component, pageProps }) {
  return (
    <RestaurantProvider>
      <Component {...pageProps}/>
    </RestaurantProvider>
  )
}
