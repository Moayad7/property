import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the property data
interface PropertyData {
  title?: string;
  location?: string;
  year?: number;
  price?: number;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  imageUrl?: string;
  featured?: boolean;
  className?: string;
}

// Define the context type
interface PropertyContextType {
  propertyData: PropertyData | null;
  setPropertyData: React.Dispatch<React.SetStateAction<PropertyData | null>>;
}

// Create the context
const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

// Create a provider component
export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);

  return (
    <PropertyContext.Provider value={{ propertyData, setPropertyData }}>
      {children}
    </PropertyContext.Provider>
  );
};

// Create a custom hook to use the PropertyContext
export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("usePropertyContext must be used within a PropertyProvider");
  }
  return context;
};