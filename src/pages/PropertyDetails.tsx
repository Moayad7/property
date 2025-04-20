import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Settings, 
  Users, 
  Heart, 
  Share2, 
  Phone 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios from '../config/axiosConfig'; // Import the Axios instance

// Mock data for a single property
const property = {
  id: "1",
  title: "شقة فاخرة في دمشق",
  price: 400000,
  location: "دمشق",
  year: 2023,
  area: 150, // المساحة بالمتر المربع
  bedrooms: 3,
  bathrooms: 2,
  description: "شقة فاخرة بحالة ممتازة، قريبة من جميع الخدمات.",
  seller: {
    name: "أحمد محمد",
    phone: "+963 934 567 890",
    memberSince: "2021",
    otherListings: 5
  },
  images: [
    "../assets/homes/2.jpg",
    "../assets/homes/3.jpg",
    "../assets/homes/4.jpg",
    "../assets/homes/2.jpg"
  ]
};

const PropertyDetails = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState<string>(property.images[0]);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const { toast } = useToast();

  // Fetch property data from the API
  // useEffect(() => {
  //   const fetchPropertyData = async () => {
  //     try {
  //       const response = await axios.get(`/properties/${id}`); // Adjust the endpoint as necessary
  //       setProperty(response.data);
  //       setMainImage(response.data.images[0]); // Set the first image as the main image
  //     } catch (error) {
  //       console.error("Error fetching property data:", error);
  //       toast({
  //         title: "خطأ",
  //         description: "حدث خطأ أثناء تحميل بيانات العقار.",
  //       });
  //     }
  //   };

  //   fetchPropertyData();
  // }, [id]);

  const handleImageClick = (image: string) => {
    setMainImage(image);
  };

  const handleSaveClick = () => {
    toast({
      title: "تمت الإضافة إلى المفضلة",
      description: "تمت إضافة العقار إلى قائمة المفضلة الخاصة بك.",
    });
  };

  const handleShareClick = () => {
    toast({
      title: "تمت مشاركة الإعلان",
      description: "تم نسخ رابط الإعلان إلى الحافظة.",
    });
  };

  const handleContactClick = () => {
    setPhoneVisible(true);
  };

  if (!property) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <MainLayout>
      <div className="container-custom py-28">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <ChevronRight size={16} />
          <Link to="/property-listings" className="hover:text-primary">العقارات</Link>
          <ChevronRight size={16} />
          <span className="text-foreground">{property.title}</span>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 {/* Gallery section (2/3 width on desktop) */}">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-lg mb-4">
              <img 
                src={mainImage} 
                alt={property.title} 
                className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {property.images.map((image: string, index: number) => (
                <div 
                  key={index}
                  className={`overflow-hidden rounded-lg cursor-pointer border-2 ${mainImage === image ? 'border-[#703e3b]' : 'border-transparent'}`}
                  onClick={() => handleImageClick(image)}
                >
                  <img 
                    src={image} 
                    alt={`صورة ${index + 1}`} 
                    className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Property details tab section */}
            <div className="mt-8">
              <Tabs defaultValue="details" dir="rtl" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="details">التفاصيل</TabsTrigger>
                  <TabsTrigger value="features">المواصفات</TabsTrigger>
                  <TabsTrigger value="seller">معلومات البائع</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="mt-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border/50">
                    <h3 className="text-lg font-bold mb-4">معلومات العقار</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">سنة البناء</p>
                          <p className="font-medium">{property.year}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">الموقع</p>
                          <p className="font-medium">{property.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">عدد الغرف</p>
                          <p className="font-medium">{property.bedrooms}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Settings size={18} className="text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">عدد الحمامات</p>
                          <p className="font-medium">{property.bathrooms}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="text-sm text-muted-foreground">المساحة</p>
                          <p className="font-medium">{property.area} م²</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="text-lg font-bold mb-4">وصف العقار</h3>
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border/50">
                    <h3 className="text-lg font-bold mb-4">مميزات العقار</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                      {/* Add features specific to the property here */}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="seller" className="mt-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border/50">
                    <h3 className="text-lg font-bold mb-4">معلومات البائع</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <div className ="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                        {property.seller.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium">{property.seller.name}</h4>
                        <p className="text-sm text-muted-foreground">عضو منذ {property.seller.memberSince}</p>
                        <p className="text-sm text-muted-foreground">{property.seller.otherListings} إعلانات أخرى</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="secondary" 
                      className="w-full mb-4"
                      onClick={handleContactClick}
                    >
                      {phoneVisible ? property.seller.phone : "عرض رقم الهاتف"}
                    </Button>
                    
                    <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                      <h4 className="font-medium mb-3">اتصل بالبائع</h4>
                      <Input placeholder="الاسم" className="mb-3" />
                      <Input placeholder="البريد الإلكتروني" className="mb-3" />
                      <Input placeholder="رقم الهاتف" className="mb-3" />
                      <textarea 
                        placeholder="الرسالة" 
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 mb-3"
                        rows={4}
                      ></textarea>
                      <Button className="w-full"> إرسال</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Sidebar (1/3 width on desktop) */}
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold">{property.title}</h2>
                </div>
                <div className="text-3xl font-bold text-[#703e3b] mb-4">
                  {property.price.toLocaleString()} ل.س
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <MapPin size={14} />
                  <span>{property.location}</span>
                </div>
                
                <div className="flex gap-3 mb-6">
                  <Button className="flex-1" onClick={handleContactClick}>
                    <Phone size={18} className="mr-2" />
                    {phoneVisible ? property.seller.phone : "اتصل الآن"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleSaveClick}
                  >
                    <Heart size={18} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleShareClick}
                  >
                    <Share2 size={18} />
                  </Button>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">سنة البناء</span>
                    <span className="font-medium">{property.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المساحة</span>
                    <span className="font-medium">{property.area} م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">عدد الغرف</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">عدد الحمامات</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border/50">
              <h3 className="font-bold mb-4">عقارات مشابهة</h3>
              
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3">
                    <img 
                      src={`../assets/homes/2.jpg`} 
                      alt=" عقار مشابه" 
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-medium text-sm">شقة في دمشق {2020 + item}</h4>
                      <p className="text-[#703e3b] font-bold text-sm">{(350000 + item * 10000).toLocaleString()} ل.س</p>
                      <p className="text-xs text-muted-foreground">{item * 1000} م² • {property.location}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                عرض المزيد
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PropertyDetails;