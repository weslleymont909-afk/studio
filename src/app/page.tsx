import { products } from '@/lib/products';
import { ProductList } from '@/components/products/product-list';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';
import { Header } from '@/components/layout/header';


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Catálogo de Roupas Cirúrgicas
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Cuidado e conforto para a recuperação do seu pet.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <ProductList allProducts={products} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
