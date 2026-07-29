import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../product/ProductCard";

import { useProducts } from "../../hooks/useProducts";

export default function BestSellersSection() {

    const { products, loading } = useProducts();

    const bestSellers = products
        .filter(product => product.featured)
        .slice(0, 8);

    if (loading) return null;

    return (

        <section className="py-24">

            <Container>

                <SectionTitle
                    subtitle="Mais Vendidos"
                    title="Os favoritos dos nossos clientes"
                    description="Os perfumes mais vendidos da loja."
                />

                <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">

                    {bestSellers.map(product => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))}

                </div>

            </Container>

        </section>

    );

}