import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Factory, Globe, Shield, Leaf, Sprout, ChevronRight, Phone, Settings, Upload, RotateCcw, ChevronDown, PlayCircle, Image as ImageIcon, Calendar, Newspaper, Lock, Package, Truck, MapPin, Mail, Facebook, Twitter, Linkedin, Youtube, Instagram, Users, Section, Coffee, FlaskConical, Dna, Sparkles, Microscope } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);
import Home from './pages/Home';
import About from './pages/About';
import Divisions from './pages/Divisions';
import Products from './pages/Products';
import Quality from './pages/Quality';
import Sustainability from './pages/Sustainability';
import VegMinus from './pages/VegMinus';
import RadishSalt from './pages/RadishSalt';
import Cocozhi from './pages/Cocozhi';
import Lemonzhi from './pages/Lemonzhi';
import ZhiMocha from './pages/ZhiMocha';
import ArjunaCapsule from './pages/ArjunaCapsule';
import ArjunaTablet from './pages/ArjunaTablet';
import ArjunaPowder from './pages/ArjunaPowder';
import AsanaPowder from './pages/AsanaPowder';
import AsthisamharakaPowder from './pages/AsthisamharakaPowder';
import AsvagandhaPowder from './pages/AsvagandhaPowder';
import AtmaguptaPowder from './pages/AtmaguptaPowder';
import BrahmiPowder from './pages/BrahmiPowder';
import GandiraPowder from './pages/GandiraPowder';
import GokshuraPowder from './pages/GokshuraPowder';
import GuduciPowder from './pages/GuduciPowder';
import HaridraPowder from './pages/HaridraPowder';
import HarithakiPowder from './pages/HarithakiPowder';
import KalameghPowder from './pages/KalameghPowder';
import KaravallakaPowder from './pages/KaravallakaPowder';
import KhadiraSaraPowder from './pages/KhadiraSaraPowder';
import KunduruPowder from './pages/KunduruPowder';
import LasunaPowder from './pages/LasunaPowder';
import ManjistaPowder from './pages/ManjistaPowder';
import MeshashringiPowder from './pages/MeshashringiPowder';
import MethikaPowder from './pages/MethikaPowder';
import NeemPowder from './pages/NeemPowder';
import ShGugguluPowder from './pages/ShGugguluPowder';
import RosellePremixPowder from './pages/RosellePremixPowder';
import SpirulinaPowder from './pages/SpirulinaPowder';
import SvarnapatriPowder from './pages/SvarnapatriPowder';
import TulasiPowder from './pages/TulasiPowder';
import YastimadhuChurnaPowder from './pages/YastimadhuChurnaPowder';
import AmalakiCapsule from './pages/AmalakiCapsule';
import AmalakiTablet from './pages/AmalakiTablet';
import AmalakiChurna from './pages/AmalakiChurna';
import AshwagandhaCapsule from './pages/AshwagandhaCapsule';
import AshwagandhaTablet from './pages/AshwagandhaTablet';
import AsthisamharakaTablet from './pages/AsthisamharakaTablet';
import AtmaguptaTablet from './pages/AtmaguptaTablet';
import DalchiniTablet from './pages/DalchiniTablet';
import GandiraTablet from './pages/GandiraTablet';
import GokshuraTablet from './pages/GokshuraTablet';
import SpirulinaTablet from './pages/SpirulinaTablet';
import ShatavariCapsule from './pages/ShatavariCapsule';
import MeshashringiTablet from './pages/MeshashringiTablet';
import HarithakiTablet from './pages/HarithakiTablet';
import LasunaTablet from './pages/LasunaTablet';
import ManjistaTablet from './pages/ManjistaTablet';
import ShGugguluTablet from './pages/ShGugguluTablet';
import TriphalaTablet from './pages/TriphalaTablet';
import TulasiTablet from './pages/TulasiTablet';
import YastimadhuTablet from './pages/YastimadhuTablet';
import BrahmiCapsule from './pages/BrahmiCapsule';
import BrahmiTablet from './pages/BrahmiTablet';
import GiloyTablet from './pages/GiloyTablet';
import GanoceliumCapsule from './pages/GanoceliumCapsule';
import GiloyCapsule from './pages/GiloyCapsule';
import HarithakiCapsule from './pages/HarithakiCapsule';
import LasunaCapsule from './pages/LasunaCapsule';
import ManjistaCapsule from './pages/ManjistaCapsule';
import MeshashringiCapsule from './pages/MeshashringiCapsule';
import NeemCapsule from './pages/NeemCapsule';
import TriphalaCapsule from './pages/TriphalaCapsule';
import TulasiCapsule from './pages/TulasiCapsule';
import YastimadhuCapsule from './pages/YastimadhuCapsule';
import AndroGCapsule from './pages/AndroGCapsule';
import AsthisamharakaCapsule from './pages/AsthisamharakaCapsule';
import AtmaguptaCapsule from './pages/AtmaguptaCapsule';
import DalchiniCapsule from './pages/DalchiniCapsule';
import GandiraCapsule from './pages/GandiraCapsule';
import GokshuraCapsule from './pages/GokshuraCapsule';
import SpirulinaCapsule from './pages/SpirulinaCapsule';
import GanoceliumPowder from './pages/GanoceliumPowder';
import LionsManeTablet from './pages/LionsManeTablet';
import LionsManeCapsule from './pages/LionsManeCapsule';
import CordycepsTablet from './pages/CordycepsTablet';
import CordycepsCapsule from './pages/CordycepsCapsule';
import FomesGCapsule from './pages/FomesGCapsule';
import FomesGTablet from './pages/FomesGTablet';
import PoriaSTablet from './pages/PoriaSTablet';
import PoriaSCapsule from './pages/PoriaSCapsule';
import PoriaSPowder from './pages/PoriaSPowder';
import ZhiMint from './pages/ZhiMint';
import ReishiGanoTablet from './pages/ReishiGanoTablet';
import ReishiGanoCapsule from './pages/ReishiGanoCapsule';
import ReishiGanoPowder from './pages/ReishiGanoPowder';
import GanoceliumTablet from './pages/GanoceliumTablet';
import Cordyceps from './pages/Cordyceps';
import Lingzhi from './pages/Lingzhi';
import HibiscusTea from './pages/HibiscusTea';
import WedeliaTea from './pages/WedeliaTea';
import ButterflyPeaTea from './pages/ButterflyPeaTea';
import Lingzhi2in1 from './pages/Lingzhi2in1';
import GanozhiSoap from './pages/GanozhiSoap';
import GanozhiShampoo from './pages/GanozhiShampoo';
import DishCleen from './pages/DishCleen';
import NutraProducts from './pages/NutraProducts';
import GanoExtract from './pages/GanoExtract';
import TomatoKetchup from './pages/TomatoKetchup';
import TomatoSauce from './pages/TomatoSauce';
import InstantUpma from './pages/InstantUpma';
import CutChilliVinegar from './pages/CutChilliVinegar';
import DBurgerPattyDough from './pages/DBurgerPattyDough';
import SaffronKombucha from './pages/SaffronKombucha';
import ButterflyKombucha from './pages/ButterflyKombucha';
import ClassicKombucha from './pages/ClassicKombucha';
import Morinzhi from './pages/Morinzhi';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import ImageGallery from './pages/ImageGallery';
import VideoGallery from './pages/VideoGallery';
import Events from './pages/Events';
import Media from './pages/Media';
import Admin from './pages/Admin';
import Team from './pages/Team';
import VendorRegistration from './pages/VendorRegistration';
import VendorAdmin from './pages/VendorAdmin';
import VendorDetailAdmin from './pages/VendorDetailAdmin';
import { ContentProvider } from './context/ContentContext';
import { COMPANY_NAME, DEFAULT_ASSETS, SHOW_ASSET_MANAGER } from './constants';

const DXN_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/9/97/Dxn_logo.png?20130918112846";

import { AssetProvider } from './context/AssetContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState<string | null>(null);
  const [activeDeepNestedDropdown, setActiveDeepNestedDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const [mobileActiveNestedDropdown, setMobileActiveNestedDropdown] = useState<string | null>(null);
  const [mobileActiveDeepNestedDropdown, setMobileActiveDeepNestedDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) {
      setMobileActiveDropdown(null);
      setMobileActiveNestedDropdown(null);
      setMobileActiveDeepNestedDropdown(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Leadership', path: '/team' },
    { name: 'Divisions', path: '/divisions' },
    {
      name: 'Products',
      path: '/products',
      dropdown: [
        { 
          name: 'Nutraceuticals', 
          path: '/products?category=Nutraceuticals', 
          icon: Dna,
          dropdown: [
            {
              name: 'Capsules',
              path: '/nutra-products?type=Capsules',
              icon: Package
            },
            {
              name: 'Tablet',
              path: '/nutra-products?type=Tablets',
              icon: Package
            },
            {
              name: 'Powder',
              path: '/nutra-products?type=Powders',
              icon: Package
            }
          ]
        },
        {
          name: 'Coffee',
          path: '/products?category=Coffee',
          icon: Coffee,
          dropdown: [
            { name: 'DXN Lingzhi 3 in 1', path: '/products/lingzhi', icon: Package },
            { name: 'DXN Lingzhi 2 in 1', path: '/products/lingzhi-2in1', icon: Package },
            { name: 'DXN Cocozhi', path: '/products/cocozhi', icon: Package },
            { name: 'DXN Lemonzhi', path: '/products/lemonzhi', icon: Package },
            { name: 'DXN Zhi Mocha', path: '/products/zhi-mocha', icon: Package },
            { name: 'DXN Cordyceps Coffee', path: '/products/codyceps', icon: Package },
            { name: 'DXN Hibiscus Floral Tea', path: '/products/hibiscus-tea', icon: Package },
            { name: 'DXN Wedelia Floral Tea', path: '/products/wedelia-tea', icon: Package },
            { name: 'DXN Butterfly Pea Floral Tea', path: '/products/butterfly-pea-tea', icon: Package }
          ]
        },
        {
          name: 'Cosmetics',
          path: '/products?category=Cosmetics',
          icon: Sparkles,
          dropdown: [
            { name: 'DXN Ganozhi Soap', path: '/products/ganozhi-soap', icon: Package },
            { name: 'DXN Ganozhi Shampoo', path: '/products/ganozhi-shampoo', icon: Package },
            { name: 'DXN Dish Cleen', path: '/products/dish-cleen', icon: Package }
          ]
        },
        {
          name: 'Wetfood',
          path: '/products?category=Wetfood',
          icon: FlaskConical,
          dropdown: [
            { name: 'Saffron Kombucha', path: '/products/saffron-kombucha', icon: Package },
            { name: 'Butterfly Kombucha', path: '/products/butterfly-kombucha', icon: Package },
            { name: 'Classic Kombucha', path: '/products/classic-kombucha', icon: Package },
            { name: 'Morinzhi', path: '/products/morinzhi', icon: Package }
          ]
        },
        {
          name: 'Agro',
          path: '/products?category=agro',
          icon: Leaf,
          dropdown: [
            { name: 'Veg Mayonnaise', path: '/products/veg-minus', icon: Sprout },
            { name: 'DXN Tomato Ketchup', path: '/products/tomato-ketchup', icon: Package },
            { name: 'DXN Tomato Sauce', path: '/products/tomato-sauce', icon: Package },
            { name: 'DXN Instant Upma', path: '/products/instant-upma', icon: Package },
            { name: 'DXN Cut Chilli Vinegar', path: '/products/cut-chilli-vinegar', icon: Package },
            { name: "D'Burger Patty Dough", path: '/products/dburger-patty-dough', icon: Package },
            { name: 'DXN Radish Salt', path: '/products/radish-salt', icon: Package },
            { name: 'DXN GANO EXTRACT', path: '/products/gano-extract', icon: Package }
          ]
        },

      ]
    },
    {
      name: 'Media',
      path: '/gallery/images',
      dropdown: [
        { name: 'Image Gallery', path: '/gallery/images', icon: ImageIcon },
        { name: 'Video Gallery', path: '/gallery/videos', icon: PlayCircle },
        { name: 'Corporate Events', path: '/events', icon: Calendar },
        { name: 'News & Press', path: '/media', icon: Newspaper },
      ]
    },
    {
      name: 'Partners',
      path: '/vendor/register',
      dropdown: [
        { name: 'Vendor Portal', path: '/vendor/register', icon: Truck },
      ]
    },
    { name: 'Quality', path: '/quality' },
    { name: 'Careers', path: '/careers' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[110] transition-all duration-300 ${scrolled || isOpen ? 'bg-black/60 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center relative z-[110]">
          <Link to="/" className="flex items-center gap-4 group" onClick={() => setIsOpen(false)}>
            <div className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center group-hover:scale-105 transition-transform bg-white p-1.5 rounded-sm shadow-lg shadow-black/20">
              <img src={DXN_LOGO_URL} alt="DXN Logo" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-tighter block leading-none uppercase text-white">DXN Manufacturing India</span>
              <span className="text-[10px] text-neutral-400 tracking-widest uppercase font-medium">Global Flagship Hub</span>
            </div>
            <div className="sm:hidden">
              <span className="text-lg font-bold tracking-tighter block leading-none uppercase text-white">DXN India</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`text-sm font-medium tracking-wide flex items-center gap-1.5 hover:text-red-500 py-2 transition-colors ${location.pathname === link.path ? 'text-red-500' : 'text-neutral-300'}`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </Link>

                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-neutral-900 border border-white/10 p-4 shadow-2xl">
                      <div className="grid gap-2">
                        {link.dropdown.map((sub: any) => (
                          <div
                            key={sub.name + sub.path}
                            className="relative"
                            onMouseEnter={() => sub.dropdown && setActiveNestedDropdown(sub.name)}
                            onMouseLeave={() => setActiveNestedDropdown(null)}
                          >
                            <Link
                              to={sub.path}
                              onClick={() => {
                                setActiveDropdown(null);
                                setActiveNestedDropdown(null);
                              }}
                              className={`flex items-center justify-between p-3 text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-all`}
                            >
                              <div className="flex items-center gap-3">
                                <sub.icon className="w-4 h-4 text-red-600" />
                                {sub.name}
                              </div>
                              {sub.dropdown && <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${activeNestedDropdown === sub.name ? 'text-white' : 'text-neutral-600'}`} />}
                            </Link>

                            {sub.dropdown && activeNestedDropdown === sub.name && (
                              <div className="absolute top-0 left-full pl-1 w-48 animate-in fade-in slide-in-from-left-2 duration-200 z-[120]">
                                <div className="bg-neutral-900 border border-white/10 p-3 shadow-2xl">
                                  <div className="grid gap-2">
                                    {sub.dropdown.map((nested: any) => (
                                      <div
                                        key={nested.name + nested.path}
                                        className="relative"
                                        onMouseEnter={() => nested.dropdown && setActiveDeepNestedDropdown(nested.name)}
                                        onMouseLeave={() => setActiveDeepNestedDropdown(null)}
                                      >
                                        <Link
                                          to={nested.path}
                                          onClick={() => {
                                            setActiveDropdown(null);
                                            setActiveNestedDropdown(null);
                                            setActiveDeepNestedDropdown(null);
                                          }}
                                          className="flex items-center justify-between p-2 text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                                        >
                                          <div className="flex items-center gap-3">
                                            <nested.icon className="w-3 h-3 text-red-600" />
                                            {nested.name}
                                          </div>
                                          {nested.dropdown && <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDeepNestedDropdown === nested.name ? 'text-white' : 'text-neutral-600'}`} />}
                                        </Link>
                                        
                                        {nested.dropdown && activeDeepNestedDropdown === nested.name && (
                                          <div className={`absolute top-0 left-full pl-1 ${nested.dropdown.length > 15 ? 'w-[450px]' : 'w-48'} animate-in fade-in slide-in-from-left-2 duration-200 z-[120]`}>
                                            <div className="bg-neutral-900 border border-white/10 p-3 shadow-2xl max-h-[70vh] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#525252 transparent' }}>
                                              <div className={`grid gap-2 ${nested.dropdown.length > 15 ? 'grid-cols-2 gap-x-4' : 'grid-cols-1'}`}>
                                                {nested.dropdown.map((deepNested: any) => (
                                                  <Link
                                                    key={deepNested.name + deepNested.path}
                                                    to={deepNested.path}
                                                    onClick={() => {
                                                      setActiveDropdown(null);
                                                      setActiveNestedDropdown(null);
                                                      setActiveDeepNestedDropdown(null);
                                                    }}
                                                    className="flex items-center gap-3 p-2 text-[10px] text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                                                  >
                                                    <deepNested.icon className="w-2.5 h-2.5 text-red-600" />
                                                    {deepNested.name}
                                                  </Link>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center gap-4 ml-4">
              <Link
                to="/admin"
                className="p-2.5 text-neutral-400 hover:text-white hover:bg-white/5 transition-all rounded-full"
                title="Admin Login"
              >
                <Lock className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all rounded-sm flex items-center gap-2">
                Visit Facility <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Mobile Nav Trigger */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2 hover:bg-white/10 rounded transition-colors focus:outline-none">
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-[105] lg:hidden transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none invisible'}`} style={{ top: '72px' }}>
        <div className="flex flex-col h-full overflow-y-auto pb-24 px-6 sm:px-12 bg-black border-t border-white/10">
          <div className="flex flex-col pt-8">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col border-b border-white/10 last:border-0">
                {link.dropdown ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMobileActiveDropdown((prev) => prev === link.name ? null : link.name);
                    }}
                    className="text-lg sm:text-xl font-bold uppercase tracking-widest text-white hover:text-red-600 transition-colors py-4 flex justify-between items-center w-full text-left"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform duration-300 ${mobileActiveDropdown === link.name ? 'rotate-180 text-white' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg sm:text-xl font-bold uppercase tracking-widest text-white hover:text-red-600 transition-colors py-4 flex justify-between items-center"
                  >
                    {link.name}
                    <ChevronRight className="w-4 h-4 text-neutral-600" />
                  </Link>
                )}

                {link.dropdown && mobileActiveDropdown === link.name && (
                  <div className="pl-4 flex flex-col gap-2 pb-4 border-l border-white/10 ml-1">
                    {link.dropdown.map((sub: any) => (
                      <div key={sub.name + sub.path} className="flex flex-col">
                        {sub.dropdown ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setMobileActiveNestedDropdown((prev) => prev === sub.name ? null : sub.name);
                            }}
                            className="font-medium uppercase tracking-wider text-neutral-400 hover:text-white flex items-center justify-between py-2 text-xs sm:text-sm w-full text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                              {sub.name}
                            </div>
                            <ChevronDown className={`w-3.5 h-3.5 text-neutral-600 transition-transform duration-300 ${mobileActiveNestedDropdown === sub.name ? 'rotate-180 text-white' : ''}`} />
                          </button>
                        ) : (
                          <Link
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className={`font-medium uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-3 py-2 text-xs sm:text-sm`}
                          >
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                            {sub.name}
                          </Link>
                        )}

                        {sub.dropdown && mobileActiveNestedDropdown === sub.name && (
                          <div className="pl-6 flex flex-col gap-2 border-l border-white/5 ml-1 mt-1">
                            {sub.dropdown.map((nested: any) => (
                              <div key={nested.name + nested.path} className="flex flex-col">
                                {nested.dropdown ? (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setMobileActiveDeepNestedDropdown((prev) => prev === nested.name ? null : nested.name);
                                    }}
                                    className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-neutral-500 hover:text-white flex items-center justify-between py-1.5 w-full text-left"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                      {nested.name}
                                    </div>
                                    <ChevronDown className={`w-3.5 h-3.5 text-neutral-600 transition-transform duration-300 ${mobileActiveDeepNestedDropdown === nested.name ? 'rotate-180 text-white' : ''}`} />
                                  </button>
                                ) : (
                                  <Link
                                    to={nested.path}
                                    onClick={() => {
                                      setIsOpen(false);
                                      setMobileActiveDropdown(null);
                                      setMobileActiveNestedDropdown(null);
                                      setMobileActiveDeepNestedDropdown(null);
                                    }}
                                    className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-neutral-500 hover:text-white flex items-center gap-3 py-1.5"
                                  >
                                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                    {nested.name}
                                  </Link>
                                )}

                                {nested.dropdown && mobileActiveDeepNestedDropdown === nested.name && (
                                  <div className="pl-6 flex flex-col gap-2 border-l border-white/5 ml-1 mt-1">
                                    {nested.dropdown.map((deepNested: any) => (
                                      <Link
                                        key={deepNested.name + deepNested.path}
                                        to={deepNested.path}
                                        onClick={() => {
                                          setIsOpen(false);
                                          setMobileActiveDropdown(null);
                                          setMobileActiveNestedDropdown(null);
                                          setMobileActiveDeepNestedDropdown(null);
                                        }}
                                        className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-neutral-600 hover:text-white flex items-center gap-3 py-1"
                                      >
                                        <div className="w-0.5 h-0.5 bg-red-400 rounded-full"></div>
                                        {deepNested.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 flex flex-col gap-4">
            <Link to="/contact" onClick={() => setIsOpen(false)} className="bg-red-600 text-white w-full py-4 font-black uppercase tracking-widest text-xs text-center hover:bg-white hover:text-black transition-colors rounded-sm shadow-lg shadow-red-900/20">
              Book Factory Visit
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="text-neutral-500 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 py-4 hover:text-white transition-colors"
            >
              <Lock className="w-3 h-3" /> Management Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 relative z-10">

        {/* Col 1: Brand (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 flex items-center justify-center bg-white p-1.5 rounded-sm">
              <img src={DXN_LOGO_URL} alt="DXN Logo" className="max-h-full max-w-full" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tighter uppercase leading-none text-white">DXN Manufacturing<br />(India) Pvt. Ltd.</h2>
            </div>
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
            The World's Largest Ganoderma Manufacturing Facility.
            Engineered for global excellence, sustainability, and human wellness.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center text-white hover:bg-red-600 transition-all rounded-sm">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Quick Links (2 cols) */}
        <div className="lg:col-span-2">
          <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs border-b border-red-600 inline-block pb-2">Quick Links</h4>
          <ul className="space-y-4 text-neutral-400 text-sm font-medium">
            {['Home', 'About', 'Team', 'Divisions', 'Products', 'section', 'Quality', 'Careers'].map(item => (
              <li key={item}><Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="hover:text-red-500 transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>

        {/* Col 3: Resources (2 cols) */}
        <div className="lg:col-span-2">
          <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs border-b border-red-600 inline-block pb-2">Resources</h4>
          <ul className="space-y-4 text-neutral-400 text-sm font-medium">
            <li><Link to="/vendor/register" className="hover:text-red-500 transition-colors">Vendor Portal</Link></li>
            <li><Link to="/gallery/images" className="hover:text-red-500 transition-colors">Image Gallery</Link></li>
            <li><Link to="/gallery/videos" className="hover:text-red-500 transition-colors">Video Gallery</Link></li>
            <li><Link to="/media" className="hover:text-red-500 transition-colors">Press & News</Link></li>
            <li><Link to="/admin" className="hover:text-red-500 transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact (4 cols) */}
        <div className="lg:col-span-4">
          <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs border-b border-red-600 inline-block pb-2">Global Hub</h4>
          <ul className="space-y-6 text-neutral-400 text-sm">
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-1" />
              <span className="leading-relaxed">
                Siddipet Industrial Park, Mandapally,<br />
                Siddipet, Telangana – 502 267, India
              </span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-red-600 shrink-0" />
              <span>+91 40 2354 XXXX / +91 99XXXX XXXX</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-red-600 shrink-0" />
              <a href="mailto:info@dxn2u.com" className="hover:text-white transition-colors">info@dxn2u.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-600 uppercase tracking-widest font-bold">
        <p>&copy; {new Date().getFullYear()} DXN Manufacturing (India) Pvt. Ltd. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
        <Route path="/divisions" element={<PageTransition><Divisions /></PageTransition>} />
        <Route path="/products/" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/nutra-products" element={<PageTransition><NutraProducts /></PageTransition>} />
        <Route path="/products/arjuna-capsule" element={<PageTransition><ArjunaCapsule /></PageTransition>} />
        <Route path="/products/arjuna-tablet" element={<PageTransition><ArjunaTablet /></PageTransition>} />
        <Route path="/products/arjuna-powder" element={<PageTransition><ArjunaPowder /></PageTransition>} />
        <Route path="/products/asana-powder" element={<PageTransition><AsanaPowder /></PageTransition>} />
        <Route path="/products/asthisamharaka-powder" element={<PageTransition><AsthisamharakaPowder /></PageTransition>} />
        <Route path="/products/asvagandha-powder" element={<PageTransition><AsvagandhaPowder /></PageTransition>} />
        <Route path="/products/atmagupta-powder" element={<PageTransition><AtmaguptaPowder /></PageTransition>} />
        <Route path="/products/brahmi-powder" element={<PageTransition><BrahmiPowder /></PageTransition>} />
        <Route path="/products/gandira-powder" element={<PageTransition><GandiraPowder /></PageTransition>} />
        <Route path="/products/gokshura-powder" element={<PageTransition><GokshuraPowder /></PageTransition>} />
        <Route path="/products/guduci-powder" element={<PageTransition><GuduciPowder /></PageTransition>} />
        <Route path="/products/haridra-powder" element={<PageTransition><HaridraPowder /></PageTransition>} />
        <Route path="/products/harithaki-powder" element={<PageTransition><HarithakiPowder /></PageTransition>} />
        <Route path="/products/kalamegh-powder" element={<PageTransition><KalameghPowder /></PageTransition>} />
        <Route path="/products/karavallaka-powder" element={<PageTransition><KaravallakaPowder /></PageTransition>} />
        <Route path="/products/khadira-sara-powder" element={<PageTransition><KhadiraSaraPowder /></PageTransition>} />
        <Route path="/products/kunduru-powder" element={<PageTransition><KunduruPowder /></PageTransition>} />
        <Route path="/products/lasuna-powder" element={<PageTransition><LasunaPowder /></PageTransition>} />
        <Route path="/products/manjista-powder" element={<PageTransition><ManjistaPowder /></PageTransition>} />
        <Route path="/products/meshashringi-powder" element={<PageTransition><MeshashringiPowder /></PageTransition>} />
        <Route path="/products/methika-powder" element={<PageTransition><MethikaPowder /></PageTransition>} />
        <Route path="/products/neem-powder" element={<PageTransition><NeemPowder /></PageTransition>} />
        <Route path="/products/sh-guggulu-powder" element={<PageTransition><ShGugguluPowder /></PageTransition>} />
        <Route path="/products/roselle-premix-powder" element={<PageTransition><RosellePremixPowder /></PageTransition>} />
        <Route path="/products/spirulina-powder" element={<PageTransition><SpirulinaPowder /></PageTransition>} />
        <Route path="/products/svarnapatri-powder" element={<PageTransition><SvarnapatriPowder /></PageTransition>} />
        <Route path="/products/tulasi-powder" element={<PageTransition><TulasiPowder /></PageTransition>} />
        <Route path="/products/yastimadhu-churna" element={<PageTransition><YastimadhuChurnaPowder /></PageTransition>} />
        <Route path="/products/amalaki-capsule" element={<PageTransition><AmalakiCapsule /></PageTransition>} />
        <Route path="/products/amalaki-tablet" element={<PageTransition><AmalakiTablet /></PageTransition>} />
        <Route path="/products/amalaki-churna" element={<PageTransition><AmalakiChurna /></PageTransition>} />
        <Route path="/products/ashwagandha-capsule" element={<PageTransition><AshwagandhaCapsule /></PageTransition>} />
        <Route path="/products/ashwagandha-tablet" element={<PageTransition><AshwagandhaTablet /></PageTransition>} />
        <Route path="/products/asthisamharaka-tablet" element={<PageTransition><AsthisamharakaTablet /></PageTransition>} />
        <Route path="/products/atmagupta-tablet" element={<PageTransition><AtmaguptaTablet /></PageTransition>} />
        <Route path="/products/meshashringi-tablet" element={<PageTransition><MeshashringiTablet /></PageTransition>} />
        <Route path="/products/harithaki-tablet" element={<PageTransition><HarithakiTablet /></PageTransition>} />
        <Route path="/products/lasuna-tablet" element={<PageTransition><LasunaTablet /></PageTransition>} />
        <Route path="/products/manjista-tablet" element={<PageTransition><ManjistaTablet /></PageTransition>} />
        <Route path="/products/sh-guggulu-tablet" element={<PageTransition><ShGugguluTablet /></PageTransition>} />
        <Route path="/products/triphala-tablet" element={<PageTransition><TriphalaTablet /></PageTransition>} />
        <Route path="/products/tulasi-tablet" element={<PageTransition><TulasiTablet /></PageTransition>} />
        <Route path="/products/yastimadhu-tablet" element={<PageTransition><YastimadhuTablet /></PageTransition>} />
        <Route path="/products/brahmi-capsule" element={<PageTransition><BrahmiCapsule /></PageTransition>} />
        <Route path="/products/brahmi-tablet" element={<PageTransition><BrahmiTablet /></PageTransition>} />
        <Route path="/products/dalchini-tablet" element={<PageTransition><DalchiniTablet /></PageTransition>} />
        <Route path="/products/gandira-tablet" element={<PageTransition><GandiraTablet /></PageTransition>} />
        <Route path="/products/giloy-tablet" element={<PageTransition><GiloyTablet /></PageTransition>} />
        <Route path="/products/gokshura-tablet" element={<PageTransition><GokshuraTablet /></PageTransition>} />
        <Route path="/products/spirulina-tablet" element={<PageTransition><SpirulinaTablet /></PageTransition>} />
        <Route path="/products/ganocelium-capsule" element={<PageTransition><GanoceliumCapsule /></PageTransition>} />
        <Route path="/products/giloy-capsule" element={<PageTransition><GiloyCapsule /></PageTransition>} />
        <Route path="/products/harithaki-capsule" element={<PageTransition><HarithakiCapsule /></PageTransition>} />
        <Route path="/products/lasuna-capsule" element={<PageTransition><LasunaCapsule /></PageTransition>} />
        <Route path="/products/manjista-capsule" element={<PageTransition><ManjistaCapsule /></PageTransition>} />
        <Route path="/products/meshashringi-capsule" element={<PageTransition><MeshashringiCapsule /></PageTransition>} />
        <Route path="/products/neem-capsule" element={<PageTransition><NeemCapsule /></PageTransition>} />
        <Route path="/products/triphala-capsule" element={<PageTransition><TriphalaCapsule /></PageTransition>} />
        <Route path="/products/tulasi-capsule" element={<PageTransition><TulasiCapsule /></PageTransition>} />
        <Route path="/products/yastimadhu-capsule" element={<PageTransition><YastimadhuCapsule /></PageTransition>} />
        <Route path="/products/andro-g-capsule" element={<PageTransition><AndroGCapsule /></PageTransition>} />
        <Route path="/products/asthisamharaka-capsule" element={<PageTransition><AsthisamharakaCapsule /></PageTransition>} />
        <Route path="/products/atmagupta-capsule" element={<PageTransition><AtmaguptaCapsule /></PageTransition>} />
        <Route path="/products/dalchini-capsule" element={<PageTransition><DalchiniCapsule /></PageTransition>} />
        <Route path="/products/gandira-capsule" element={<PageTransition><GandiraCapsule /></PageTransition>} />
        <Route path="/products/gokshura-capsule" element={<PageTransition><GokshuraCapsule /></PageTransition>} />
        <Route path="/products/spirulina-capsule" element={<PageTransition><SpirulinaCapsule /></PageTransition>} />
        <Route path="/products/shatavari-capsule" element={<PageTransition><ShatavariCapsule /></PageTransition>} />
        <Route path="/products/lions-mane-capsule" element={<PageTransition><LionsManeCapsule /></PageTransition>} />
        <Route path="/products/cordyceps-capsule" element={<PageTransition><CordycepsCapsule /></PageTransition>} />
        <Route path="/products/fomes-g-capsule" element={<PageTransition><FomesGCapsule /></PageTransition>} />
        <Route path="/products/poria-s-capsule" element={<PageTransition><PoriaSCapsule /></PageTransition>} />
        <Route path="/products/reishi-gano-capsule" element={<PageTransition><ReishiGanoCapsule /></PageTransition>} />
        <Route path="/products/ganocelium-capsule" element={<PageTransition><GanoceliumCapsule /></PageTransition>} />
        <Route path="/products/ganocelium-powder" element={<PageTransition><GanoceliumPowder /></PageTransition>} />
        <Route path="/products/reishi-gano-powder" element={<PageTransition><ReishiGanoPowder /></PageTransition>} />
        <Route path="/products/lions-mane-tablet" element={<PageTransition><LionsManeTablet /></PageTransition>} />
        <Route path="/products/cordyceps-tablet" element={<PageTransition><CordycepsTablet /></PageTransition>} />
        <Route path="/products/fomes-g-tablet" element={<PageTransition><FomesGTablet /></PageTransition>} />
        <Route path="/products/poria-s-tablet" element={<PageTransition><PoriaSTablet /></PageTransition>} />
        <Route path="/products/poria-s-powder" element={<PageTransition><PoriaSPowder /></PageTransition>} />
        <Route path="/products/zhi-mint" element={<PageTransition><ZhiMint /></PageTransition>} />
        <Route path="/products/reishi-gano-tablet" element={<PageTransition><ReishiGanoTablet /></PageTransition>} />
        <Route path="/products/ganocelium-tablet" element={<PageTransition><GanoceliumTablet /></PageTransition>} />
        <Route path="/products/veg-minus" element={<PageTransition><VegMinus /></PageTransition>} />
        <Route path="/products/radish-salt" element={<PageTransition><RadishSalt /></PageTransition>} />
        <Route path="/products/cocozhi" element={<PageTransition><Cocozhi /></PageTransition>} />
        <Route path="/products/lemonzhi" element={<PageTransition><Lemonzhi /></PageTransition>} />
        <Route path="/products/zhi-mocha" element={<PageTransition><ZhiMocha /></PageTransition>} />
        <Route path="/products/hibiscus-tea" element={<PageTransition><HibiscusTea /></PageTransition>} />
        <Route path="/products/wedelia-tea" element={<PageTransition><WedeliaTea /></PageTransition>} />
        <Route path="/products/butterfly-pea-tea" element={<PageTransition><ButterflyPeaTea /></PageTransition>} />
        <Route path="/products/codyceps" element={<PageTransition><Cordyceps /></PageTransition>} />
        <Route path="/products/lingzhi" element={<PageTransition><Lingzhi /></PageTransition>} />
        <Route path="/products/lingzhi-2in1" element={<PageTransition><Lingzhi2in1 /></PageTransition>} />
        <Route path="/products/cordyceps" element={<PageTransition><Cordyceps /></PageTransition>} />
        <Route path="/products/ganozhi-soap" element={<PageTransition><GanozhiSoap /></PageTransition>} />
        <Route path="/products/ganozhi-shampoo" element={<PageTransition><GanozhiShampoo /></PageTransition>} />
        <Route path="/products/dish-cleen" element={<PageTransition><DishCleen /></PageTransition>} />
        <Route path="/products/gano-extract" element={<PageTransition><GanoExtract /></PageTransition>} />
        <Route path="/products/tomato-ketchup" element={<PageTransition><TomatoKetchup /></PageTransition>} />
        <Route path="/products/tomato-sauce" element={<PageTransition><TomatoSauce /></PageTransition>} />
        <Route path="/products/instant-upma" element={<PageTransition><InstantUpma /></PageTransition>} />
        <Route path="/products/cut-chilli-vinegar" element={<PageTransition><CutChilliVinegar /></PageTransition>} />
        <Route path="/products/dburger-patty-dough" element={<PageTransition><DBurgerPattyDough /></PageTransition>} />
        <Route path="/products/saffron-kombucha" element={<PageTransition><SaffronKombucha /></PageTransition>} />
        <Route path="/products/butterfly-kombucha" element={<PageTransition><ButterflyKombucha /></PageTransition>} />
        <Route path="/products/classic-kombucha" element={<PageTransition><ClassicKombucha /></PageTransition>} />
        <Route path="/products/morinzhi" element={<PageTransition><Morinzhi /></PageTransition>} />
        <Route path="/quality" element={<PageTransition><Quality /></PageTransition>} />
        <Route path="/future" element={<PageTransition><Sustainability /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/gallery/images" element={<PageTransition><ImageGallery /></PageTransition>} />
        <Route path="/gallery/videos" element={<PageTransition><VideoGallery /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        <Route path="/admin/vendors" element={<PageTransition><VendorAdmin /></PageTransition>} />
        <Route path="/admin/vendors/:id" element={<PageTransition><VendorDetailAdmin /></PageTransition>} />
        <Route path="/vendor/register" element={<PageTransition><VendorRegistration /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ContentProvider>
        <AssetProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </AssetProvider>
      </ContentProvider>
    </Router>
  );
};

export default App;

