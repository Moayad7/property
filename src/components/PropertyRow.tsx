// src/components/PropertyRow.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  Heart,
  MapPin,
  Calendar,
  AreaChart,
  Bed,
  Bath,
} from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { usePropertyContext } from '../components/PropertyProvider'; // Import the context
import { Button } from "./ui/button";
import { getPropertyById } from "@/config/axiosConfig";

interface PropertyRowProps {
  id: string;
  title: string;
  price: number;
  location: string;
  year: number;
  area: number; // المساحة بالمتر المربع
  bedrooms: number; // عدد غرف النوم
  bathrooms: number; // عدد الحمامات
  imageUrl: string;
  featured?: boolean;
  className?: string;
}

const PropertyRow = ({
  id,
  title,
  price,
  location,
  year,
  area, // المساحة بالمتر المربع
  bedrooms, // عدد غرف النوم
  bathrooms, // عدد الحمامات
  imageUrl,
  featured = false,
  className,
}: PropertyRowProps) => {

   const navigate = useNavigate();
   const [propertyItem, setPropertyItem] = useState<any>('')
   const { setPropertyData } = usePropertyContext(); // Get the context
  const property = {
    id,
    title,
    price,
    location,
    year,
    area, // المساحة بالمتر المربع
    bedrooms, // عدد غرف النوم
    bathrooms, // عدد الحمامات
    imageUrl,
    featured,
    className,
  }
  const handleEditProperty = (Id: string) =>{
    fetchPropertyData(Id)
    
  }


    const fetchPropertyData = async (id: string) => {
          try {
            const response = await getPropertyById(id); // Adjust the endpoint as necessary
            // setPropertyItem(response.data);
            // Reset the form with the fetched property data
            // form.reset(response.data);
            setPropertyData(response.data)
            // console.log(propertyItem)
            navigate(`/updateProperty/${id}`)
          } catch (error) {
            console.error("Error fetching property data:", error);
          }
        };

  return (
    <div
      className={cn(
        "w-full flex items-center p-4 border-b border-border/50 transition-all duration-300",
        featured ? "bg-syria-gold/10" : "bg-white",
        className
      )}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-24 h-24  object-cover rounded-md mr-4"
        loading="lazy"
      />

      <div className="flex-grow ps-4">
        <div className="grid justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{title}</h3>
          <span className="font-semibold text-lg text-[#703e3b]">
            ${price.toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 mb-2 ">
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
          <div className="flex flex-col items-center">
            <Calendar size={16} className="text-muted-foreground mb-1" />
            <span className="text-xs font-medium">{year}</span>
          </div>
          <div className="flex flex-col items-center">
            <AreaChart size={16} className="text-muted-foreground mb-1" />
            <span className="text-xs font-medium">
              {area.toLocaleString()} م²
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Bed size={16} className="text-muted-foreground mb-1" />
            <span className="text-xs font-medium">{bedrooms} غرف</span>
          </div>
          <div className="flex flex-col items-center">
            <Bath size={16} className="text-muted-foreground mb-1" />
            <span className="text-xs font-medium">{bathrooms} حمامات</span>
          </div>
        </div>
      </div>

      <div className="grid gap-2 px-4">
        <Link
          to={`/property/${id}`}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          تفاصيل
        </Link>
        <Button 
          onClick={() =>
            handleEditProperty(id)
          }
          className="button-primary"
        >
          تعديل
        </Button>
        <button
          // onClick={() => handleDeleteProperty(property.id)}
          className="bg-red-700 py-2 rounded-lg text-white hover:bg-red-400 duration-200"
        >
          حذف
        </button>
        {/* <button 
            className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-700"
            aria-label="Add to favorites"
          >
            <Heart size={20} />
          </button>
          <button 
            className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-700"
            aria-label="View details"
          >
            <Eye size={20} />
          </button> */}
      </div>
    </div>
  );
};

export default PropertyRow;
