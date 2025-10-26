import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import WhyChooseUs from "./components/WhyChooseUs";
import ProcessWork from "./components/ProcessWork";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Fixed positioning with proper z-index */}
      <Header />
      
      {/* Main Content - Proper spacing from fixed header */}
      <main className="relative">
        {/* Hero Section */}
        <section className="relative">
          <Hero />
        </section>
        
        {/* Services Section - Consistent spacing */}
        <section className="relative">
          <Services />
        </section>
        
        {/* Portfolio Section - Smooth transition */}
        <section className="relative bg-gray-50">
          <Portfolio />
        </section>
        
        {/* Why Choose Us Section - Clean background transition */}
        <section className="relative bg-white">
          <WhyChooseUs />
        </section>
        
        {/* Process Work Section - Gradient background */}
        <section className="relative">
          <ProcessWork />
        </section>
      </main>
      
      {/* Footer - Consistent bottom spacing */}
      <Footer />
    </div>
  );
}
