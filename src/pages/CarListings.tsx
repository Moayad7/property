import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PropertyCard from '../components/PropertyCard';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SEO from '../components/SEO';
import axios from '../config/axiosConfig'; // Import the Axios instance

// propertyMockData
const properties = [
  {
    id: "1",
    title: 'شقة فاخرة في دمشق',
    year: 2023,
    price: 400000, // السعر بالليرة السورية
    location: 'دمشق',
    area: 150, // المساحة بالمتر المربع
    imageUrl: '../assets/homes/2.jpg',
    bedrooms: 3, // عدد غرف النوم
    bathrooms: 2, // عدد الحمامات
    featured: true,
  },
  {
    id: "2",
    title: 'فيلا رائعة في حلب',
    year: 2022,
    price: 350000, // السعر بالليرة السورية
    location: 'حلب',
    area: 200, // المساحة بالمتر المربع
    imageUrl: '../assets/homes/3.jpg',
    bedrooms: 4, // عدد غرف النوم
    bathrooms: 3, // عدد الحمامات
    featured: false,
  },
  {
    id: "3",
    title: 'شقة حديثة في حمص',
    year: 2021,
    price: 250000, // السعر بالليرة السورية
    location: 'حمص',
    area: 120, // المساحة بالمتر المربع
    imageUrl: '../assets/homes/4.jpg',
    bedrooms: 2, // عدد غرف النوم
    bathrooms: 1, // عدد الحمامات
    featured: false,
  },
  {
    id: "4",
    title: 'شقة مريحة في اللاذقية',
    year: 2023,
    price: 300000, // السعر بالليرة السورية
    location: 'اللاذقية',
    area: 140, // المساحة بالمتر المربع
    imageUrl: '../assets/homes/2.jpg',
    bedrooms: 3, // عدد غرف النوم
    bathrooms: 2, // عدد الحمامات
    featured: true,
  },
  {
    id: "5",
    title: 'شقة في دمشق',
    year: 2022,
    price: 280000, // السعر بالليرة السورية
    location: 'دمشق',
    area: 130, // المساحة بالمتر المربع
    imageUrl: '../assets/homes/3.jpg',
    bedrooms: 2, // عدد غرف النوم
    bathrooms: 1, // عدد الحمامات
    featured: false,
  },
  {
    id: "6",
    title: 'فيلا فاخرة في حلب',
    year: 2021,
    price: 260000, // السعر بالليرة السورية
    location: 'حلب',
    area: 250, // المساحة بالمتر المربع
    imageUrl: '../assets/homes/4.jpg',
    bedrooms: 4, // عدد غرف النوم
    bathrooms: 3, // عدد الحمامات
    featured: true,
  }
];

const CarListings = () => {
  // const [cars, setCars] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch car data from the API
  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       const response = await axios.get('/cars'); // Adjust the endpoint as necessary
  //       setCars(response.data);
  //     } catch (err) {
  //       console.error("Error fetching cars:", err);
  //       setError("حدث خطأ أثناء تحميل العقارات");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCars();
  // }, []);

  // Structured data for the car listings page
  const propertyListingsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": properties.map((property, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Place", // أو "Apartment" إذا كان مناسبًا
        "name": property.title,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": property.location,
          "addressCountry": "SY" // رمز الدولة لسوريا
        },
        "offers": {
          "@type": "Offer",
          "price": property.price,
          "priceCurrency": "SYP" // أو "USD" حسب العملة المستخدمة
        },
        "datePosted": property.year,
        "numberOfRooms": property.bedrooms,
        "numberOfBathrooms": property.bathrooms,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": property.area,
          "unitCode": "MTK" // رمز الوحدة للمتر المربع
        }
      }
    }))
  };

  // if (loading) {
  //   return <div>Loading...</div>; // Show loading state
  // }

  // if (error) {
  //   return <div>{error}</div>; // Show error message
  // }

  return (
    <MainLayout structuredData={propertyListingsStructuredData}>
      <SEO 
        title="تصفح العقارات المتاحة في سوريا | مركز العقارات السوري"
        description="تصفح مجموعتنا الواسعة من العقارات الجديدة والمستعملة في سوريا. مجموعة متنوعة من العلامات التجارية والموديلات والأسعار."
        canonicalUrl="/car-listings"
        keywords="عقارات للبيع في سوريا, عقارات مستعملة, عقارات جديدة, شراء عقارات"
      />
      <div className="container-custom py-28">
        <h1 className="heading-2 mb-6">تصفح العقارات المتاحة</h1>
        
       {/* Search and Filters Section */}
<div className="bg-white shadow-md rounded-lg p-6 mb-8">
  <div className="flex flex-col md:flex-row gap-4">
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="ابحث عن عقار..."
        className="w-full pr-10 py-2 pl-4 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
    </div>
    <Button 
      variant="outline" 
      className="flex items-center gap-2"
      onClick={() => setShowFilters(!showFilters)}
    >
      <Filter size={18} />
      <span>فلترة</span>
      <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
    </Button>
  </div>
  
  {showFilters && (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-border/50">
      <div>
        <h3 className="font-medium mb-3">نطاق السعر</h3>
        <Slider
          defaultValue={[priceRange[0], priceRange[1]]}
          max={1000000} // يمكنك تعديل الحد الأقصى حسب الأسعار المتوقعة للعقارات
          step={10000} // يمكنك تعديل الخطوة حسب الحاجة
          onValueChange={(value) => setPriceRange([value[0], value[1]])}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{priceRange[0]} ل.س</span>
          <span>{priceRange[1]} ل.س</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">عدد الغرف</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((bedrooms) => (
            <div className="flex items-center space-x-2 rtl:space-x-reverse" key={bedrooms}>
              <Checkbox id={`bedrooms-${bedrooms}`} />
              <label htmlFor={`bedrooms-${bedrooms}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2">
                {bedrooms} غرفة
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">المدينة</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="اختر المدينة" />
          </SelectTrigger>
          <SelectContent>
            {['دمشق', 'حلب', 'حمص', 'اللاذقية', 'طرطوس'].map((city) => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )}
</div>
        
        {/* Featured Cars Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">العقارات المميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.filter(car => car.featured).map((property) => (
              <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              price={property.price}
              location={property.location}
              year={property.year}
              area={property.area} // المساحة بالمتر المربع
              bedrooms={property.bedrooms} // عدد غرف النوم
              bathrooms={property.bathrooms} // عدد الحمامات
              imageUrl={property.imageUrl}
              featured={property.featured} // إذا كان العقار مميزًا
            />
            ))}
          </div>
        </div>
        
        {/* All Cars Section */}
        <div>
          <h2 className="text-xl font-bold mb-6">جميع العقارات المتاحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              price={property.price}
              location={property.location}
              year={property.year}
              area={property.area} // المساحة بالمتر المربع
              bedrooms={property.bedrooms} // عدد غرف النوم
              bathrooms={property.bathrooms} // عدد الحمامات
              imageUrl={property.imageUrl}
              featured={property.featured} // إذا كان العقار مميزًا
            />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CarListings;