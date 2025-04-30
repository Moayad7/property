
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Car, ShoppingBag, Clock, HelpCircle, PlusCircle, Home, Settings, LogOut, LogIn, User, UserCircle, BellRing } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    window.location.href = '/'; // Redirect to login page
  };


  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'معرض عقارات', path: '/property-listings', icon: <Home size={16} /> },
    { name: 'إيجار عقارات', path: '/rentals', icon: <Clock size={16} /> },
    // { name: 'قطع غيار', path: '/spare-parts', icon: <ShoppingBag size={16} /> },
    { name: 'اعرف احتياجاتك', path: '/know-your-needs', icon: <HelpCircle size={16} /> },
  ];
  
  // Conditionally add the dashboard link if the token is set
  if (token) {
    navLinks.push({ name: 'لوحة التحكم', path: '/dashboard', icon: <Settings size={16} /> });
  }

  return (
    <header
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300  backdrop-blur-md',
        scrolled || isOpen ? 'bg-background/90 shadow-sm border-b border-border/50' : 'bg-transparent'
      )}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={closeMenu}
          >
            <span className="font-serif text-xl font-bold text-[#703e3b]">معرض</span>
            <span className="font-serif text-xl font-bold">العقارات السوري</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center gap-1.5 py-1 font-medium text-sm transition-colors',
                  location.pathname === link.path
                    ? 'text-[#703e3b]'
                    : 'text-foreground/80 hover:text-[#703e3b]'
                )}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {!token ? <Link
              to="/login"
              className="px-4 py-2 flex gap-1.5 text-sm font-medium text-foreground/80 hover:text-[#703e3b] transition-colors"
            >
              <LogIn size={16} />
              تسجيل الدخول
            </Link>
            :
            <div className='flex gap-4'>
              <Link to="/profile" className="button-secondary flex items-center hover:text-[#703e3b]">
          <UserCircle  size={24} className="mr-2" />
          <span className="hidden md:block"></span>
        </Link>
        <Link to="/notifications" className="button-secondary flex items-center hover:text-[#703e3b]">
          <BellRing  size={24} className="mr-2" />
          <span className="hidden md:block"></span>
        </Link>
            <button
            onClick={handleSignOut}
            className="px-4 py-2 flex gap-1.5 text-sm font-medium text-foreground/80 hover:text-[#703e3b] transition-colors"
          >
            <LogOut size={16} />
            تسجيل الخروج
          </button>
          </div>
          }
            {/* {token &&  */}
            <Link
              to="/add-property"
              className="button-primary text-sm flex items-center gap-1.5"
            >
              <PlusCircle size={16} />
              <span>أضف عقارك</span>
            </Link>
            {/* } */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center text-foreground"
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border/50 shadow-md animate-fade-in">
            <div className="container-custom py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'flex items-center gap-2 py-2 font-medium transition-colors',
                    location.pathname === link.path
                      ? 'text-[#703e3b]'
                      : 'text-foreground/80'
                  )}
                  onClick={closeMenu}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                <Link
                  to="/login"
                  className="py-2 font-medium text-foreground/80"
                  onClick={closeMenu}
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/add-car"
                  className="button-primary flex items-center gap-2 justify-center"
                  onClick={closeMenu}
                >
                  <PlusCircle size={16} />
                  <span>أضف عقارك</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
