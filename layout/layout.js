import Head from "next/head"
import SideBar from "@/Components/SideBar"
import Modal from "react-modal"
import useRestaurant from "@/Hooks/useRestaurant";
import ModalProduct from "@/Components/ModalProduct";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Steps from "@/Components/Steps";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#__next');


export default function layout({ children, pagina }) {

    const { modal } = useRestaurant()

    return (
        <>
            <Head>
                <title>Good Taste - {pagina}</title>
                <meta name="description" content="Menu Restaurant" />
            </Head>
            <div className="md:flex">
                <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
                    <SideBar />
                </aside>
                <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                    <div className="p-10">
                        <Steps/>
                        {children}
                    </div>
                </main>
            </div>
            {modal && (
                <Modal isOpen={modal} style={customStyles}>
                    <ModalProduct/>
                </Modal>
            )}
            <ToastContainer/>
        </>
    )
}
