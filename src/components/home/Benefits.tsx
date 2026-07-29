import {
    Truck,
    ShieldCheck,
    Gift,
    Headset
} from "lucide-react";

export default function Benefits() {

    const items = [

        {
            icon: Truck,
            title: "Frete Grátis",
            description: "Acima de R$199"
        },

        {
            icon: Gift,
            title: "Embalagem Premium",
            description: "Ideal para presente"
        },

        {
            icon: ShieldCheck,
            title: "Compra Segura",
            description: "Pagamento protegido"
        },

        {
            icon: Headset,
            title: "Atendimento",
            description: "Suporte especializado"
        }

    ];

    return (

        <section className="bg-black pb-16">

            <div className="max-w-7xl mx-auto px-6">

                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 grid md:grid-cols-2 lg:grid-cols-4">

                    {

                        items.map((item, index) => {

                            const Icon = item.icon;

                            return (

                                <div
                                    key={index}
                                    className="flex items-center gap-5 p-8 border-b lg:border-b-0 lg:border-r border-zinc-800 last:border-r-0"
                                >

                                    <Icon
                                        size={34}
                                        className="text-yellow-500"
                                    />

                                    <div>

                                        <h3 className="text-white font-semibold">

                                            {item.title}

                                        </h3>

                                        <p className="text-zinc-400 text-sm">

                                            {item.description}

                                        </p>

                                    </div>

                                </div>

                            )

                        })

                    }

                </div>

            </div>

        </section>

    )

}