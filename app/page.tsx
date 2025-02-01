import Image from "next/image";
import Header from "./components/general/header";
import LandingSection from "./components/landingpage/landing-section";

export default function Home() {
  return (
   <div>
    <Header></Header>
    <LandingSection></LandingSection>
   </div>  );
}
