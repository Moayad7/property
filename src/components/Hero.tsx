
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';


const handleSearch = async (event) => {
  // منع السلوك الافتراضي للنموذج
  event.preventDefault();

  const propertyType = document.querySelector('select[name="propertyType"]').value;
  const priceRange = document.querySelector('select[name="priceRange"]').value;

  const response = await fetch('/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      propertyType,
      priceRange,
    }),
  });

  const results = await response.json();
  console.log(results); // يمكنك عرض النتائج في الواجهة الأمامية

  // كود الانتقال الى رابط صفحة عرض النتائج

};


const Hero = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background with Syrian-inspired pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-syria-sand/40 to-white z-0 overflow-hidden">
      <video className="absolute inset-0 opacity-90 w-full" autoPlay loop muted>
        <source src="../assets/video/1109472_1080p_Standard_1280x720.mp4" type="video/mp4" />
        متصفحك لا يدعم تشغيل الفيديو.
      </video>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="heading-1 mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            ابحث عن شقتك المثالية في <span className="text-[#703e3b]">سوريا</span>
          </h1>
          <p className="subtitle mb-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          مرحبًا بك في منصة العقارات الذكية
  </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Link to="/property-listings" className="button-primary">
              تصفح العقارات
            </Link>
            <Link to="/know-your-needs" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:text-[#703e3b] transition-colors">
              <span>اعرف احتياجاتك</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="glass-card p-6 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.7s' }}>
            <h2 className="text-xl font-medium mb-4">بحث سريع</h2>
            <form className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <select name='propertyType' className="w-full bg-white border border-input rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                  <option value="">بيت</option>
                  <option value="toyota">محل</option>
                  <option value="honda">فيلا</option>
                  <option value="bmw">بناء</option>
                  <option value="mercedes">شقة</option>
                  <option value="kia">شاليه</option>
                </select>
              </div>
              <div className="relative">
                <select className="w-full bg-white border border-input rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                  <option value="">نطاق السعر</option>
                  <option value="5000">أقل من 5,000$</option>
                  <option value="10000">أقل من 10,000$</option>
                  <option value="20000">أقل من 20,000$</option>
                  <option value="30000">أقل من 30,000$</option>
                </select>
              </div>
              <button className="bg-[#703e3b] text-white rounded-md py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#703e3b]/70 transition-colors">
                <Search size={16} />
                <Button onClick={handleSearch}>بحث</Button>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
