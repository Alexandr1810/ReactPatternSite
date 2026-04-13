import Image from "next/image";
import Header from '@/app/components/header/header'
import PageMain from '@/app/components/pageMain/pageMain'
import Footer from "./components/footer/footer";

export default function Home() {
    
  return (
    <div className="main">
      <Header />
      <PageMain />
      <Footer />
    </div>
  );
}
