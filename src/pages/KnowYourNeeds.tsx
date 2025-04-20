import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: 'ما هو نوع العقار الذي تبحث عنه؟',
    options: [
      { id: 'a', text: 'شقة' },
      { id: 'b', text: 'فيلا' },
      { id: 'c', text: 'منزل مستقل' },
      { id: 'd', text: 'عقار تجاري' },
    ],
  },
  {
    id: 2,
    text: 'ما هو موقع العقار المفضل لديك؟',
    options: [
      { id: 'a', text: 'داخل المدينة' },
      { id: 'b', text: 'خارج المدينة' },
      { id: 'c', text: 'قريب من المدارس' },
      { id: 'd', text: 'قريب من المرافق العامة' },
    ],
  },
  {
    id: 3,
    text: 'كم عدد الغرف التي تحتاجها؟',
    options: [
      { id: 'a', text: 'غرفة واحدة' },
      { id: 'b', text: 'غرفتين' },
      { id: 'c', text: 'ثلاث غرف' },
      { id: 'd', text: 'أكثر من ثلاث غرف' },
    ],
  },
  {
    id: 4,
    text: 'ما هي ميزانيتك لشراء العقار؟',
    options: [
      { id: 'a', text: 'أقل من 50,000 دولار' },
      { id: 'b', text: '50,000 - 100,000 دولار' },
      { id: 'c', text: '100,000 - 150,000 دولار' },
      { id: 'd', text: 'أكثر من 150,000 دولار' },
    ],
  },
];

const propertyRecommendations: Record<string, any[]> = {
  'aa': [
    { name: 'شقة في دمشق', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=400', price: '45,000$' },
    { name: 'شقة في حلب', image: 'https://images.unsplash.com/photo-1617814076067-da0dcc9407a9?auto=format&fit=crop&q=80&w=400', price: '50,000$' },
  ],
  'ab': [
    { name: 'فيلا في اللاذقية', image: 'https://images.unsplash.com/photo-1631144482731-a19b0f78f98c?auto=format&fit=crop&q=80&w=400', price: '120,000$' },
    { name: 'فيلا في طرطوس', image: 'https://images.unsplash.com/photo-1634807064328-78bc82b3f8e9?auto=format&fit=crop&q=80&w=400', price: '130,000$' },
  ],
  'bc': [
    { name: 'منزل مستقل في حمص', image: 'https://images.unsplash.com/photo-1623843146476-616d9833cd9a?auto=format&fit=crop&q=80&w=400', price: '80,000$' },
    { name: 'منزل مستقل في دمشق', image: 'https://images.unsplash.com/photo-1563720223523-110fd0a81c2e?auto=format&fit=crop&q=80&w=400', price: '90,000$' },
  ],
  'cd': [
    { name: 'عقار تجاري في حلب', image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=400', price: '200,000$' },
    { name: 'عقار تجاري في دمشق', image: 'https://images.unsplash.com/photo-1623869675184-d9ec98537a2d?auto=format&fit=crop&q=80&w=400', price: '220,000$' },
  ],
};

const defaultRecommendations = [
  { name: 'شقة في منطقة هادئة', image: 'https://images.unsplash.com/photo-1622551957961-b8a74fe36dd6?auto=format&fit=crop&q=80&w=400', price: '60,000$' },
  { name: 'منزل مستقل في ضاحية', image: 'https://images.unsplash.com/photo-1623869675184-d9ec98537a2d?auto=format&fit=crop&q=80&w=400', price: '75,000$' },
];

const KnowYourNeeds = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId });
  };
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const getRecommendations = () => {
    if (Object.keys(answers).length !== questions.length) {
      return defaultRecommendations;
    }
    
    const answerKey = questions.map(q => answers[q.id]).join('');
    return propertyRecommendations[answerKey] || defaultRecommendations;
  };
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  return (
    <MainLayout>
      <div className="container-custom py-28">
        <div className="text-center mb-12">
          <h1 className="heading-2 mb-4">اعرف احتياجاتك</h1>
          <p className="subtitle mx-auto">أجب على الأسئلة البسيطة التالية لمساعدتك في اختيار العقار المناسب لاحتياجاتك وميزانيتك.</p>
        </div>
        
        {!showResults ? (
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span>السؤال {currentQuestion + 1} من {questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-6">{questions[currentQuestion].text}</h2>
                
                <RadioGroup 
                  value={answers[questions[currentQuestion].id]} 
                  onValueChange={(value) => handleAnswer(questions[currentQuestion].id, value)}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option) => (
                    <div 
                      key={option.id}
                      className={`flex items-center space-x-2 rtl:space-x-reverse rounded-lg border p-4 cursor-pointer transition-all ${
                        answers[questions[currentQuestion].id] === option.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/30 hover:bg-primary/5'
                      }`}
                      onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
                    >
                      <RadioGroupItem 
                        value={option.id} 
                        id={`option-${option.id}`} 
                        className="ml-3 rtl:mr-3 rtl:ml-0" 
                      />
                      <label 
                        htmlFor={`option-${option.id}`}
                        className="flex-1 cursor-pointer font-medium"
                      >
                        {option.text}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  disabled={currentQuestion === 0}
                >
                  السابق
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!answers[questions[currentQuestion].id]}
                >
                  {currentQuestion === questions.length - 1 ? 'إظهار النتائج' : ' التالي'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">توصياتنا لك</h2>
                    <p className="text-muted-foreground">بناءً على إجاباتك، نعتقد أن هذه العقارات ستناسب احتياجاتك.</p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getRecommendations().map((property, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-border/30">
                      <div className="relative h-48">
                        <img src={property.image} alt={property.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{property.name}</h3>
                        <div className="flex justify-between mb-4">
                          <span className="text-primary font-bold">{property.price}</span>
                        </div>
                        <Button className="w-full">عرض التفاصيل</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">ملاحظة مهمة</h3>
                <p className="text-muted-foreground">
                  هذه التوصيات مبنية على إجاباتك فقط وتعتبر توجيهية. ننصح بزيارة المعارض العقارية والتأكد من العقار قبل اتخاذ القرار النهائي.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Button variant="outline" onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers({});
              }}>
                البدء من جديد
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default KnowYourNeeds; 