import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Calendar, MapPin, Check, Home, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const rentalProperties = [
  {
    id: 1,
    name: 'شقة فاخرة في دمشق',
    category: 'شقة',
    pricePerDay: 50,
    image: '../assets/homes/3.jpg',
    features: ['3 غرف', 'حمامان', 'تكييف هواء', 'مطبخ مجهز'],
    available: true
  },
  {
    id: 2,
    name: 'فيلا رائعة في حلب',
    category: 'فيلا',
    pricePerDay: 75,
    image: '../assets/homes/2.jpg',
    features: ['4 غرف', '3 حمامات', 'تكييف هواء', 'حديقة'],
    available: true
  },
  {
    id: 3,
    name: 'شقة حديثة في اللاذقية',
    category: 'شقة',
    pricePerDay: 120,
    image: '../assets/homes/4.jpg',
    features: ['2 غرف', 'حمام', 'تكييف هواء', 'مطبخ مجهز'],
    available: true
  },
  {
    id: 4,
    name: 'شقة مريحة في طرطوس',
    category: 'شقة',
    pricePerDay: 65,
    image: '../assets/homes/3.jpg',
    features: ['3 غرف', 'حمام', 'تكييف هواء', 'مطبخ مجهز'],
    available: true
  },
  {
    id: 5,
    name: 'شقة صغيرة في حمص',
    category: 'شقة',
    pricePerDay: 55,
    image: '../assets/homes/4.jpg',
    features: ['غرفة واحدة', 'حمام', 'تكييف هواء', 'مطبخ'],
    available: false
  },
  {
    id: 6,
    name: 'فيلا فاخرة في دمشق',
    category: 'فيلا',
    pricePerDay: 60,
    image: '../assets/homes/2.jpg',
    features: ['5 غرف', '4 حمامات', 'تكييف هواء', 'حديقة'],
    available: true
  }
];

const locations = ['دمشق', 'حلب', 'حمص', 'اللاذقية', 'طرطوس'];

const Rentals = () => {
  return (
    <MainLayout>
      <div className="container-custom py-28">
        <div className="text-center mb-12">
          <h1 className="heading-2 mb-4">استئجار عقار في سوريا</h1>
          <p className="subtitle mx-auto">أفضل الأسعار وأكبر مجموعة من العقارات للإيجار في جميع أنحاء سوريا. سهولة الحجز والدفع ودعم على مدار الساعة.</p>
        </div>
        
        {/* Search Box */}
        <Card className="mb-12 shadow-lg bg-white/95 backdrop-blur border border-border/60">
          <CardContent className="p-6">
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="daily">إيجار يومي</TabsTrigger>
                <TabsTrigger value= "monthly">إيجار شهري</TabsTrigger>
              </TabsList>
              
              <TabsContent value="daily" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">موقع الاستلام</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدينة" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تاريخ الاستلام</label>
                    <div className="relative">
                      <Input type="date" className="pr-10" />
                      <Calendar className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground" size={16} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تاريخ الإعادة</label>
                    <div className="relative">
                      <Input type="date" className="pr-10" />
                      <Calendar className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground" size={16} />
                    </div>
                  </div>
                  
                  <Button className="self-end">بحث</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="monthly" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">موقع الاستلام</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدينة" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تاريخ البدء</label>
                    <div className="relative">
                      <Input type="date" className="pr-10" />
                      <Calendar className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground" size={16} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">عدد الأشهر</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدة" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 6, 12].map(month => (
                          <SelectItem key={month} value={month.toString()}>
                            {month} {month === 1 ? 'شهر' : 'أشهر'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="self-end">بحث</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Why Choose Us */}
       {/* Why Choose Us */}
<div className="mb-16">
  <h2 className="text-2xl font-bold text-center mb-10">لماذا تختار خدماتنا في تأجير العقارات؟</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="text-center p-6 bg-white rounded-lg shadow-md border border-border/20">
      <div className="mx-auto w-14 h-14 bg-[#703e3b]/10 rounded-full flex items-center justify-center mb-4">
        <Home className="w-7 h-7 text-[#703e3b]" />
      </div>
      <h3 className="text-lg font-bold mb-2">تنوع العقارات</h3>
      <p className="text-muted-foreground">نقدم مجموعة متنوعة من العقارات، بما في ذلك الشقق، الفلل، والمنازل، لتلبية جميع احتياجاتك.</p>
    </div>
    
    <div className="text-center p-6 bg-white rounded-lg shadow-md border border-border/20">
      <div className="mx-auto w-14 h-14 bg-[#703e3b]/10 rounded-full flex items-center justify-center mb-4">
        <MapPin className="w-7 h-7 text-[#703e3b]" />
      </div>
      <h3 className="text-lg font-bold mb-2">مواقع مميزة</h3>
      <p className="text-muted-foreground">نقدم عقارات في أفضل المواقع، بالقرب من المرافق والخدمات الأساسية.</p>
    </div>
    
    <div className="text-center p-6 bg-white rounded-lg shadow-md border border-border/20">
      <div className="mx-auto w-14 h-14 bg-[#703e3b]/10 rounded-full flex items-center justify-center mb-4">
        <Clock className="w-7 h-7 text-[#703e3b]" />
      </div>
      <h3 className="text-lg font-bold mb-2">دعم على مدار الساعة</h3>
      <p className="text-muted-foreground">فريق دعم متاح على مدار الساعة لمساعدتك في أي استفسارات أو طوارئ.</p>
    </div>
  </div>
</div>
        {/* Available Properties */}
        <div>
          <h2 className="text-2xl font-bold mb-8">العقارات المتاحة للإيجار</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentalProperties.map((property) => (
              <div 
                key={property.id} 
                className={`bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg border ${!property.available ? 'opacity-75' : ''}`}
              >
                <div className="relative h-48">
                  <img src={property.image} alt={property.name} className="h-full w-full object-cover" />
                  <div className="absolute top-3 right-3 bg-[#703e3b] text-white text-xs px-2 py-1 rounded-full">
                    {property.category}
                  </div>
                  {!property.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold">غير متاح حاليًا</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{property.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#703e3b] font-bold text-lg">${property.pricePerDay}</span>
                    <span className="text-sm text-muted-foreground">في اليوم</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Check size={14} className="text-[#703e3b]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant={property.available ? "default" : "outline"} 
                    className="w-full"
                    disabled={!property.available}
                  >
                    {property.available ? 'حجز الآن' : 'غير متاح'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Rentals;