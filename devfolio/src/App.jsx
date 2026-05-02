import React, { useState } from 'react'

// TopAppBar Component
const TopAppBar = () => {
  return (
    <header className="bg-slate-950/95 backdrop-blur-sm fixed full-width top-0 sticky z-50 border-b border-slate-800 w-full">
      <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-widest uppercase text-amber-500">IRON & OAK</div>
        <div className="hidden md:flex gap-8 items-center">
          <a className="text-amber-500 border-b-2 border-amber-500 pb-1 font-serif tracking-tight text-sm hover:text-amber-400 transition-colors" href="#services">Services</a>
          <a className="text-slate-400 hover:text-amber-400 transition-colors duration-300 font-serif tracking-tight text-sm" href="#book">Book</a>
          <a className="text-slate-400 hover:text-amber-400 transition-colors duration-300 font-serif tracking-tight text-sm" href="#shop">Shop</a>
          <a className="text-slate-400 hover:text-amber-400 transition-colors duration-300 font-serif tracking-tight text-sm" href="#journal">Journal</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-amber-500 cursor-pointer hover:text-amber-400 transition-colors">shopping_bag</span>
          <span className="material-symbols-outlined text-amber-500 cursor-pointer hover:text-amber-400 transition-colors">account_circle</span>
        </div>
      </nav>
    </header>
  )
}

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative h-[921px] flex items-center justify-center overflow-hidden mt-20">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover opacity-40" 
          alt="Barbershop interior" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYp5UgISFD9qSDnb5xNNgVfXlJ3XWX29I06knT6TITFsb2fYsCT2CgHRW79WylEEXXYwjba_6IXQs9JTH-uYXqFDmZrHv2fuY95g0bXJ70oGlgBcpTHx-lKOHyyMCyG9uA6ZLRqFq8T6gh44Mi88MrpJ2yzNUftAzLvVMjmC__68l4gWWEzaKAf7lDx-meQgupkXkpoRXhlOuhAWvYN-Mce-mcuPvx7OihoyZvZyC6z5zm389FxjKGxdtQ3zCfuSWyPpxa5DBZVfR3"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.3em] mb-6 block">Est. 2014 — London, UK</span>
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">Crafting the Modern Legacy of Grooming.</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">Experience the intersection of heritage craftsmanship and contemporary style in our exclusive members-only atmosphere.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary text-on-primary font-label-caps text-label-caps py-4 px-10 rounded-none hover:bg-primary-fixed transition-all tracking-[0.2em] uppercase">Book Your Chair</button>
          <button className="border border-primary text-primary font-label-caps text-label-caps py-4 px-10 rounded-none hover:bg-primary/10 transition-all tracking-[0.2em] uppercase">View Services</button>
        </div>
      </div>
    </section>
  )
}

// Story Section Component
const StorySection = () => {
  return (
    <section className="py-section-gap px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 bg-surface-container border border-outline-variant p-12 flex flex-col justify-center">
          <div className="w-16 h-[2px] bg-primary mb-8"></div>
          <h2 className="font-headline-lg text-headline-lg mb-6">The Craft, The Heritage, The Hands.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">IRON & OAK was born from a singular vision: to restore the dignity of the barbering tradition. In an age of fast fashion and fleeting trends, we stand for the permanent and the precise.</p>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-80">Every cut is a signature. Every shave is a ceremony. We don't just provide grooming; we provide a sanctuary for the modern man to pause, reflect, and emerge refined.</p>
        </div>
        <div className="md:col-span-5 h-[500px]">
          <img 
            className="w-full h-full object-cover border border-outline-variant" 
            alt="Barber with straight razor"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfTcOVF-kjMrsYISR4t_OU1EQLEfjOYX7m01JHvqVXMPDMFTnFeSwcl2Klpv099WnA7V1LPcOsRgFHZNn4ZmeBxT8Yu7AMpbOg5hfS9r5-hIt6OfVyvoBc5NDTzo8QB4Uaj36T9GCcpn1rBdEk3iCGLPkq01PLoxBnQzhBzlgUHMYobFR6n7lgzPIQtlWduWTgUac7--JW0cV90wFhMSWC5RIa16c9J7D-WzkZfmkNoOPvA8RxUHNDfSO3fdFJF6C3j603ejccYnkk"
          />
        </div>
      </div>
    </section>
  )
}

// Services Section Component
const ServicesSection = () => {
  const services = [
    {
      name: "The Signature Haircut",
      price: "£45",
      description: "A precision cut tailored to your head shape and lifestyle. Includes consultation, wash, and styling."
    },
    {
      name: "Beard Sculpt & Shave",
      price: "£35",
      description: "Full beard reshaping with hot towel treatment and straight razor finish on the neck and cheeks."
    },
    {
      name: "The Royal Treatment",
      price: "£75",
      description: "The ultimate experience: Signature Haircut, Beard Sculpt, and an Essential Facial Treatment."
    }
  ]

  return (
    <section className="bg-surface-container-lowest py-section-gap relative overflow-hidden" id="services">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg mb-4">Grooming Services</h2>
          <div className="double-divider w-24 mx-auto mb-8"></div>
        </div>
        <div className="space-y-12">
          {services.map((service, index) => (
            <div key={index} className="flex justify-between items-end group cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-headline-md text-headline-md group-hover:text-primary transition-colors">{service.name}</h3>
                  <div className="flex-1 border-b border-dotted border-outline-variant mb-2"></div>
                  <span className="font-headline-md text-primary">{service.price}</span>
                </div>
                <p className="font-body-md text-on-surface-variant opacity-70">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <span className="inline-block bg-surface-variant text-on-surface px-4 py-1 font-label-caps text-[10px] uppercase tracking-widest border border-outline-variant mb-8">Premium Products Used Throughout</span>
          <div className="mt-4">
            <button className="bg-primary text-on-primary font-label-caps text-label-caps py-4 px-12 rounded-none hover:bg-primary-fixed transition-all tracking-[0.2em] uppercase">Full Menu</button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "James Davenport",
      service: "The Signature Cut",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfTcOVF-kjMrsYISR4t_OU1EQLEfjOYX7m01JHvqVXMPDMFTnFeSwcl2Klpv099WnA7V1LPcOsRgFHZNn4ZmeBxT8Yu7AMpbOg5hfS9r5-hIt6OfVyvoBc5NDTzo8QB4Uaj36T9GCcpn1rBdEk3iCGLPkq01PLoxBnQzhBzlgUHMYobFR6n7lgzPIQtlWduWTgUac7--JW0cV90wFhMSWC5RIa16c9J7D-WzkZfmkNoOPvA8RxUHNDfSO3fdFJF6C3j603ejccYnkk",
      quote: "A ritual of precision. I walk in a client and walk out a new man. Every single time.",
      grayscale: true
    },
    {
      name: "Julian De Silva",
      service: "Beard Sculpt & Shave",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaVKJST6kVU2N92v1NJqFlr9BHQP0mzcJ9A3S2rKpTbLROTQcNVDrXebPadatU5j6rqUmlmK6NjsRVZQac2-3gim_MVQ4T_onkI7AEwqstQkbgz2AAQhc_PrsqqPS1ovf3QBMEBSBBdzbbObq6U_vdwfmcjCRLsEqUlo11OgyYKkuBN2A7MZqGDVa_VPWURZ_BMyjqqx8mqvUyFCpbXxFcJmZWabv7vRywVCkCcEd6cbyd2BJXjVk6d-JOUnjHk72-PtY5HhzP7k81",
      quote: "The hot towel shave is pure luxury. My beard has never looked this sharp or felt this healthy.",
      featured: true
    },
    {
      name: "Arthur Wellesley",
      service: "The Royal Treatment",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYp5UgISFD9qSDnb5xNNgVfXlJ3XWX29I06knT6TITFsb2fYsCT2CgHRW79WylEEXXYwjba_6IXQs9JTH-uYXqFDmZrHv2fuY95g0bXJ70oGlgBcpTHx-lKOHyyMCyG9uA6ZLRqFq8T6gh44Mi88MrpJ2yzNUftAzLvVMjmC__68l4gWWEzaKAf7lDx-meQgupkXkpoRXhlOuhAWvYN-Mce-mcuPvx7OihoyZvZyC6z5zm389FxjKGxdtQ3zCfuSWyPpxa5DBZVfR3",
      quote: "More than just a cut; it's a sanctuary in Mayfair. The attention to detail is truly unparalleled.",
      grayscale: true
    }
  ]

  return (
    <section className="py-section-gap px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg mb-4">What Our Clients Say</h2>
          <div className="double-divider w-24 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`group bg-surface-container border overflow-hidden flex flex-col ${testimonial.featured ? 'border-primary md:-translate-y-4 shadow-2xl z-10' : 'border-outline-variant'}`}>
              <div className="h-64 overflow-hidden">
                <img 
                  alt={testimonial.name}
                  className={`w-full h-full object-cover ${testimonial.featured ? 'group-hover:scale-105 transition-all duration-700' : 'grayscale group-hover:grayscale-0 transition-all duration-500'}`}
                  src={testimonial.image}
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <span className="font-label-caps text-[10px] text-primary uppercase tracking-widest mb-2">{testimonial.service}</span>
                <h3 className="font-headline-md text-on-surface mb-4">{testimonial.name}</h3>
                <p className={`font-body-md italic text-on-surface-variant mb-6 ${testimonial.grayscale ? 'opacity-80' : ''}`}>"{testimonial.quote}"</p>
                <div className="mt-auto">
                  <div className={`w-8 h-[1px] ${testimonial.featured ? 'bg-primary' : 'bg-outline-variant'}`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Booking CTA Section Component
const BookingCTASection = () => {
  return (
    <section className="py-section-gap relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img 
          className="w-full h-full object-cover" 
          alt="Barber shop floor"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaVKJST6kVU2N92v1NJqFlr9BHQP0mzcJ9A3S2rKpTbLROTQcNVDrXebPadatU5j6rqUmlmK6NjsRVZQac2-3gim_MVQ4T_onkI7AEwqstQkbgz2AAQhc_PrsqqPS1ovf3QBMEBSBBdzbbObq6U_vdwfmcjCRLsEqUlo11OgyYKkuBN2A7MZqGDVa_VPWURZ_BMyjqqx8mqvUyFCpbXxFcJmZWabv7vRywVCkCcEd6cbyd2BJXjVk6d-JOUnjHk72-PtY5HhzP7k81"
        />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10" id="book">
        <h2 className="font-headline-xl text-headline-xl mb-8">Ready for Perfection?</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">Appointments are limited. We recommend booking at least 48 hours in advance to secure your preferred barber and time.</p>
        <div className="inline-flex flex-col md:flex-row gap-6 items-center">
          <button className="bg-primary text-on-primary font-label-caps text-label-caps py-6 px-16 rounded-none hover:bg-primary-fixed transition-all tracking-[0.3em] uppercase text-lg shadow-xl">Secure My Appointment</button>
        </div>
        <div className="mt-12 flex justify-center gap-12 text-on-surface-variant opacity-60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">schedule</span>
            <span className="font-label-caps text-[10px] uppercase">Mon-Sat: 9am - 8pm</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">pin_drop</span>
            <span className="font-label-caps text-[10px] uppercase">Mayfair, London</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-slate-950 w-full py-12 border-t border-double border-slate-800">
      <div className="flex flex-col items-center justify-center w-full gap-6 text-center max-w-7xl mx-auto px-6 pb-20 md:pb-12">
        <div className="text-amber-500 font-bold tracking-widest text-2xl uppercase">IRON & OAK</div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-slate-500 hover:text-amber-200 transition-colors font-serif text-sm" href="#privacy">Privacy</a>
          <a className="text-slate-500 hover:text-amber-200 transition-colors font-serif text-sm" href="#terms">Terms</a>
          <a className="text-slate-500 hover:text-amber-200 transition-colors font-serif text-sm" href="#careers">Careers</a>
          <a className="text-slate-500 hover:text-amber-200 transition-colors font-serif text-sm" href="#locations">Locations</a>
        </div>
        <div className="font-serif text-sm text-slate-500 mt-4">© 2024 IRON & OAK BARBERING CO.</div>
      </div>
    </footer>
  )
}

// Bottom Navigation Component (Mobile Only)
const BottomNav = () => {
  const navItems = [
    { icon: "home", label: "Home", href: "#" },
    { icon: "event", label: "Book", href: "#book" },
    { icon: "storefront", label: "Shop", href: "#shop" },
    { icon: "menu_book", label: "Journal", href: "#journal" }
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-slate-900 border-t border-slate-800 flex justify-around items-center px-4 py-3 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
      {navItems.map((item, index) => (
        <a 
          key={index}
          className={`flex flex-col items-center justify-center text-slate-500 hover:text-amber-400 transition-colors ${index === 0 ? 'text-amber-500 bg-slate-800/50 rounded-xl px-3 py-1 scale-95' : ''}`}
          href={item.href}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="font-serif text-[10px] uppercase tracking-tighter">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

// Main App Component
const App = () => {
  return (
    <div className="bg-background text-on-surface font-body-md">
      <TopAppBar />
      <HeroSection />
      <StorySection />
      <ServicesSection />
      <TestimonialsSection />
      <BookingCTASection />
      <Footer />
      <BottomNav />
    </div>
  )
}

export default App





