import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Upload } from "lucide-react";
import MainLayout from '../layouts/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from '../config/axiosConfig'; // Import the Axios instance

const formSchema = z.object({
  title: z.string().min(5, {
    message: "يجب أن يحتوي العنوان على 5 أحرف على الأقل",
  }),
  address: z.string().min(5, {
    message: "يجب أن يحتوي العنوان على 5 أحرف على الأقل",
  }),
  description: z.string().min(20, {
    message: "يجب أن يحتوي الوصف على 20 حرفًا على الأقل",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "يجب أن يكون السعر رقمًا موجبًا",
  }),
  propertyType: z.string({
    required_error: "يرجى اختيار نوع العقار",
  }),
  bedrooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "يجب أن يكون عدد الغرف رقمًا موجبًا",
  }),
  bathrooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "يجب أن يكون عدد الحمامات رقمًا موجبًا",
  }),
  area: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "يجب أن تكون المساحة رقمًا موجبًا",
  }),
});

const AddProperty = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      address: "",
      description: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      propertyType: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Make an API call to submit the form data
      const response = await axios.post('/properties', values); // Adjust the endpoint as necessary
      console.log(response.data);
      toast.success("تم إضافة العقار بنجاح");
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("حدث خطأ أثناء إضافة العقار");
    }
  };

  return (
    <MainLayout>
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">إضافة عقار جديدة</h1>
            <p className="text-muted-foreground">
              أدخل تفاصيل العقار لإضافتها إلى قائمة العقارات المعروضة للبيع
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>العنوان</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: شقة فاخرة في دمشق" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>العنوان</FormLabel> <FormControl>
                            <Input placeholder="مثال: دمشق - المزة" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الوصف</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="اكتب وصفاً تفصيلياً للعقار" 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>السعر (دولار)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="مثال: 15000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نوع العقار</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر نوع العقار" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="apartment">شقة</SelectItem>
                              <SelectItem value="villa">فيلا</SelectItem>
                              <SelectItem value="house">منزل مستقل</SelectItem>
                              <SelectItem value="commercial">عقار تجاري</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>عدد الغرف</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="مثال: 3" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>عدد الحمامات</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="مثال: 2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المساحة (متر مربع)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="مثال: 120" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border border-dashed border-border rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <h3 className="font-medium">رفع صور العقار</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      قم بسحب الصور هنا أو اضغط للاختيار
                    </p>
                    <Button type="button" variant="outline">
                      اختيار الصور
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button type="submit" className="w-full max-w-md">
                    <Check className="mr-2 h-4 w-4" /> إضافة العقار
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddProperty;