import AboutSection from "../components/homepage/AboutSection";
import BlogPreview from "../components/homepage/BlogPreview";
import ContactSection from "../components/homepage/ContactSection";
import FeaturesSection from "../components/homepage/FeaturesSection";
import PopularTrips from "../components/homepage/PopularTrips";
import SearchTripSection from "../components/homepage/SearchTripSection";
import { destinationService } from "@/services/destinationService";
import { Destination } from "@/types/destination";

export default async function Home() {
  const destinations = await destinationService.getAllTrips('published');
  const regions = destinations.map((t: Destination) => t.region)

  return (
    <div className="flex flex-col items-center">

      <SearchTripSection regionsList={regions} />

      <div className="w-full h-12 bg-contain bg-repeat-x relative z-20 border-dirt-brown -mb-12 bg-[url('/assets/border.webp')] filter-sable"></div>
      <FeaturesSection background="bg-green-900 bg-[url('/assets/heightmap.png')]" textColor="text-white" />

      <div className="w-full h-12 bg-contain bg-repeat-x relative z-20 -scale-y-[1] border-dirt-brown -mt-12 bg-[url('/assets/border.webp')] filter-sable"></div>
      <BlogPreview background="bg-sable" textColor="text-green-900" />

      <div className="w-full h-12 bg-contain bg-repeat-x relative z-20 border-dirt-brown -mb-12 bg-[url('/assets/border.webp')] filter-sable"></div>
      <PopularTrips background="bg-green-900 bg-[url('/assets/heightmap.png')]" textColor="text-white" destinations={destinations} />

      <div className="w-full h-12 bg-contain bg-repeat-x relative z-20 -scale-y-[1] border-dirt-brown -mt-12 bg-[url('/assets/border.webp')] filter-sable"></div>
      <AboutSection background="bg-sable" textColor="text-gray-900"></AboutSection>

      <ContactSection background="bg-green-900 bg-[url('/assets/heightmap.png')]" textColor="text-white"></ContactSection>
    </div>
  );
}
