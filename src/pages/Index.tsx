import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Hero from '../components/Hero';
import CarCard from '../components/PropertyCard';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Clock, Car, HelpCircle, Home } from 'lucide-react';
import SEO from '../components/SEO';
import axios, { fetchRecentProperties, getFeaturedProperties, getRecentProperties } from '../config/axiosConfig'; // Import the Axios instance
import PropertyCard from '../components/PropertyCard';


const token = localStorage.getItem("token")
// Sample property data (in a real app, this would come from an API or state management)
// const featuredProperties = [
//   {
//     id: '1',
//     title: 'شقة فاخرة في دمشق 2020',
//     price: 200000,
//     location: 'دمشق، سوريا',
//     year: 2020,
//     area: 120, // المساحة بالمتر المربع
//     bedrooms: 3,
//     bathrooms: 2,
//     imageUrl: '../assets/homes/2.jpg',
//     featured: true,
//   },
//   {
//     id: '2',
//     title: 'فيلا رائعة في حلب 2019',
//     price: 185000,
//     location: 'حلب، سوريا',
//     year: 2019,
//     area: 250, // المساحة بالمتر المربع
//     bedrooms: 4,
//     bathrooms: 3,
//     imageUrl: '../assets/homes/3.jpg',
//     featured: true,
//   },
//   {
//     id: '3',
//     title: 'شقة حديثة في دمشق 2021',
//     price: 230000,
//     location: 'دمشق، سوريا',
//     year: 2021,
//     area: 100, // المساحة بالمتر المربع
//     bedrooms: 2,
//     bathrooms: 1,
//     imageUrl: '../assets/homes/4.jpg',
//     featured: true,
//   },
// ];

// Sample recent properties
// const recentProperties = [
//   {
//     id: '4',
//     title: 'شقة فاخرة في اللاذقية 2018',
//     price: 270000, // السعر بالليرة السورية
//     location: 'اللاذقية، سوريا',
//     year: 2018,
//     area: 150, // المساحة بالمتر المربع
//     bedrooms: 3, // عدد غرف النوم
//     bathrooms: 2, // عدد الحمامات
//     imageUrl: '../assets/homes/2.jpg',
//   },
//   {
//     id: '5',
//     title: 'فيلا رائعة في دمشق 2019',
//     price: 290000, // السعر بالليرة السورية
//     location: 'دمشق، سوريا',
//     year: 2019,
//     area: 250, // المساحة بالمتر المربع
//     bedrooms: 4, // عدد غرف النوم
//     bathrooms: 3, // عدد الحمامات
//     imageUrl: '../assets/homes/3.jpg',
//   },
//   {
//     id: '6',
//     title: 'شقة حديثة في حمص 2020',
//     price: 210000, // السعر بالليرة السورية
//     location: 'حمص، سوريا',
//     year: 2020,
//     area: 100, // المساحة بالمتر المربع
//     bedrooms: 2, // عدد غرف النوم
//     bathrooms: 1, // عدد الحمامات
//     imageUrl: '../assets/homes/4.jpg',
//   },
//   {
//     id: '7',
//     title: 'شقة مريحة في دمشق 2017',
//     price: 180000, // السعر بالليرة السورية
//     location: 'دمشق، سوريا',
//     year: 2017,
//     area: 120, // المساحة بالمتر المربع
//     bedrooms: 3, // عدد غرف النوم
//     bathrooms: 2, // عدد الحمامات
//     imageUrl: '../assets/homes/2.jpg',
//   },
// ];

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [recentProperties, setRecentProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured and recent cars from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const [featuredResponse, recentResponse] = await Promise.all([
          getFeaturedProperties(), // Replace with your API endpoint for featured cars
          getRecentProperties(),   // Replace with your API endpoint for recent cars
        ]);
        setFeaturedProperties(featuredResponse);
        setRecentProperties(recentResponse);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("حدث خطأ أثناء تحميل العقارات");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Structured data for the homepage
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "مركز العقارات السوري",
    "url": "https://syrianautohub.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://syrianautohub.com/car-listings?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>; // Show loading state
  // }

  // if (error) {
  //   return <div>{error}</div>; // Show error message
  // }

  return (
    <MainLayout structuredData={homeStructuredData}>
      <SEO 
        title="مركز العقارات السوري - سوق العقارات الرائد في سوريا"
        description="أكبر سوق للعقارات الجديدة والمستعملة في سوريا. تصفح آلاف العقارات من الوكلاء الموثوقين والبائعين الخاصين."
        canonicalUrl="/"
        keywords="عقارات سوريا, بيع عقارات, شراء عقارات, عقارات مستعملة, عقارات جديدة, سوق العقارات"
      />
      <div className="flex flex-col">
        <Hero />
        
        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">خدماتنا</h2>
              <p className="subtitle mx-auto">كل ما تحتاجه في عالم العقارات في مكان واحد.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: <Home className="h-8 w-8 text-[#703e3b]" />,
                  title: "عقارات جديدة ",
                  description: "تصفح مجموعتنا الواسعة من العقارات الجديدة من وكلاء موثوقين.",
                  link: "/property-listings"
                },
                {
                  icon: <Clock className="h-8 w-8 text-[#703e3b]" />,
                  title: "تأجير العقارات",
                  description: "استأجر عقار ليوم أو أسبوع أو أكثر من شبكة مزودي خدمة التأجير لدينا.",
                  link: "/rentals"
                },
                
                {
                  icon: <HelpCircle className="h-8 w-8 text-syria-gold" />,
                  title: "اعرف احتياجاتك",
                  description: "أجب على بعض الأسئلة وسنساعدك في العثور على العقار المناسب لك.",
                  link: "/know-your-needs"
                }
              ].map((service, i) => (
                <div 
                  key={i} 
                  className="glass-card p-6 premium-hover animate-fade-up flex flex-col h-full"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                  <Link 
                    to={service.link}
                    className="inline-flex items-center text-sm font-medium text-[#703e3b] hover:text-[#703e3b]/80 transition-colors mt-auto"
                  >
                    المزيد <ArrowRight size={16} className="mr-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Cars Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
              <div>
                <h2 className="heading-2 mb-2">عقارات مميزة</h2>
                <p className="text-muted-foreground">عقارات فاخرة مختارة خصيصاً لك</p>
              </div>
              <Link 
                to="/car-listings"
                className="button-primary mt-4 sm:mt-0"
              >
                عرض الكل
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property, i) => (
                <div key={property.id} className="animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                  <PropertyCard {...property} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 bg-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-25 bg-home bg-cover bg-center"></div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">لماذا تختار مركز العقارات السوري</h2>
              <p className="subtitle mx-auto">سوق العقارات الموثوق في سوريا لأكثر من عقد.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'بائعون موثوقون',
                  description: 'يتم التحقق من جميع الوكلاء والبائعين الخاصين لضمان معاملة آمنة وموثوقة.'
                },
                {
                  title: 'تشكيلة واسعة',
                  description: 'من الفاخرة إلى الاقتصادية، اعثر على أوسع مجموعة منالعقارات المتاحة في سوريا.'
                },
                {
                  title: 'أسعار تنافسية',
                  description: 'قارن الأسعار من عدة بائعين للتأكد من حصولك على أفضل صفقة ممكنة.'
                },
                {
                  title: 'دعم من الخبراء',
                  description: 'خبراؤنا في العقارات متاحون لإرشادك خلال رحلة الشراء الخاصة بك.'
                },
                {
                  title: 'ضمان الجودة',
                  description: 'تخضع جميعالعقارات لعملية فحص شاملة قبل إدراجها.'
                },
                {
                  title: 'تغطية على مستوى البلاد',
                  description: 'اعثر على العقارات والخدمات في جميع المدن والم ناطق الرئيسية في سوريا.'
                }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="p-6 border border-border/40 rounded-lg premium-hover animate-fade-up bg-[#f8f1e9]"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Recent Listings */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
              <div>
                <h2 className="heading-2 mb-2">إعلانات حديثة</h2>
                <p className="text-muted-foreground">أحدث الإضافات إلى سوقنا</p>
              </div>
              <Link 
                to="/property-listings"
                className="button-primary mt-4 sm:mt-0"
              >
                عرض الكل
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProperties.map((car, i) => (
                <div key={car.id} className="animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                  <PropertyCard {...car} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-[#703e3b]/95 to-[#703e3b]/75 text-[white]">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 max-w-2xl mx-auto">هل أنت مستعد لبيع عقارك؟ أضفها اليوم وتواصل مع آلاف المشترين المحتملين.</h2>
            <Link 
              to="/add-car"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#703e3b] rounded-md font-medium hover:bg-white/90 transition-colors"
            >
              أضف عقارك
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;