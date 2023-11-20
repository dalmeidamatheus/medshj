import Link from "next/link";


export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="w-full"><img src="/images/pills.png" alt="" className="object-cover w-full h-64"/> </div>
            <div className="text-center flex items-center">
                <div>
                    <h1 className="text-4xl font-bold" style={{ color: '#FFD700' }}>MedsHoje</h1>
                    <div>
                        <p className="text-xl my-2" style={{ color: 'midnightblue' }}>Sistema de agendamento de medicamentos. </p>
                        <p className="text-xl my-2" style={{ color: 'midnightblue' }}>Nunca mais esqueça de tomar seus remédios com essa enfermeira virtual. </p>
                    </div>
                </div>
            </div>
            <Link href={'/login'} className="bg-cyan-900 rounded-md p-2 text-amber-400 font-bold px-8">iniciar</Link>
        </main>
    )
}


