import { useRouter } from "next/router";
import useRestaurant from "@/Hooks/useRestaurant";

const steps = [
    { step: 1, name: "Menú", url: "/" },
    { step: 2, name: "Resumen", url: "/resume" },
    { step: 3, name: "Datos y total", url: "/total" },
];

export default function Steps() {

    const router = useRouter();
    const { handleStep } = useRestaurant()

    const calProgress = () => {
        let value
        if(router.pathname === '/'){
            value = 2
        } else if(router.pathname === '/resume'){
            value = 50
        } else {
            value = 100
        }
        return value
    }

    return (
        <>
            <div className="flex justify-between mb-5">
                {steps.map((step) => (
                    <buttom key={step.step} className="text-2xl font-bold" onClick={() => { router.push(step.url); handleStep(step.step) }}>
                        {step.name}
                    </buttom>
                ))}
            </div>
            <div className="bg-gray-100 mb-10">
                <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white" style={{ width: `${calProgress()}%` }}></div>
            </div>
        </>
    );
}
