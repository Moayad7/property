// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '@/layouts/MainLayout';
import PropertyCard from '../components/PropertyCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PropertyRow from '@/components/PropertyRow';

const Dashboard: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const checkToken = () => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (!token) {
      // Redirect to sign in if not authenticated
      window.location.href = '/login'; // Change to your login page
    } else {
      fetchProperties(token); // Fetch properties if authenticated
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const fetchProperties = async (token: string) => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/properties', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    window.location.href = '/login'; // Redirect to login page
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <MainLayout>
      <div className="py-24 px-8 grid justify-center">
        <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>
        <Link to="/add-property" className="button-primary mb-6">
          أضف عقار
        </Link>
        
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
              <div>
                <h2 className="heading-2 mb-2">عقاراتي</h2>
                <p className="text-muted-foreground">قم بإدارة عقاراتك هنا:</p>
              </div>
            </div>
            
            <div className="grid gap-6">
              {properties.map((property, i) => (
                <div key={property.id} className="flex gap-4 animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                  <PropertyRow {...property} />
                  <div className="flex gap-4 justify-between mt-4">
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <button onClick={handleSignOut} className="button-danger mt-6">Sign Out</button>
      </div>
    </MainLayout>
  );
};

export default Dashboard;