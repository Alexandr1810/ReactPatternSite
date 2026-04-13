import Image from "next/image";
import Header from '@/app/components/header/header'
import PageOffer from '@/app/components/pageOffer/pageOffer'
import Footer from "@/app/components/footer/footer";

export default async function OfferPage({params}) {
  const { city } = await params;
  const { name } = await params;

  return (
    <div className="main">
      <Header params_city={city} />
      <PageOffer params_city={city} url_name={name} />
      <Footer params_city={city} />
    </div>
  );
}
