import Image from "next/image";
import Header from '@/app/components/header/header'
import PageMain from '@/app/components/pageMain/pageMain'
import Footer from "@/app/components/footer/footer";

export default async function CityPage({params}) {
  const { city } = await params;

  return (
    <div className="main">
      <Header params_city={city} />
      <PageMain params_city={city} />
      <Footer params_city={city} />
    </div>
  );
}
