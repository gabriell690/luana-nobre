import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../product/ProductCard";

import { useProducts } from "../../hooks/useProducts";

export default function FeaturedProductsSection() {

    const {
        products,
        loading,
        error
    } = useProducts(true);

    if (loading) {
        return (
            <section className="py-24">
                <Container>
                    <p>Carregando produtos...</p>
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-24">
                <Container>
                    <p>{error}</p>
                </Container>
            </section>
        );
    }

    return (

        <section className="py-24">

            <Container>

                <SectionTitle
                    subtitle="Destaques"
                    title="Produtos em Destaque"
                    description="Selecionamos os produtos mais desejados para você."
                />

                <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">

                    {products.map(product => (

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