/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, BoutiqueSettings, Category } from './types';
import { INITIAL_PRODUCTS, DEFAULT_SETTINGS } from './data/initialProducts';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { ProductGrid } from './components/ProductGrid';
import { WhyUsSection } from './components/WhyUsSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { EnquiryCartDrawer } from './components/EnquiryCartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AppointmentModal } from './components/AppointmentModal';
import { WhatsAppPreviewModal } from './components/WhatsAppPreviewModal';
import { AdminDemoView } from './components/AdminDemoView';
import { OwnerWalkthroughModal } from './components/OwnerWalkthroughModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';
import {
  formatCartEnquiryMessage,
  formatSingleProductEnquiryMessage,
  buildWhatsAppUrl,
} from './utils/whatsapp';

export default function App() {
  // 1. Persistent Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('punjab_boutique_products_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved products:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // 2. Persistent Settings state
  const [settings, setSettings] = useState<BoutiqueSettings>(() => {
    try {
      const saved = localStorage.getItem('punjab_boutique_settings_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  // 3. Persistent Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('punjab_boutique_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved cart:', e);
    }
    return [];
  });

  // 4. Persistent Wishlist state
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('punjab_boutique_wishlist_v1');
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      console.warn('Failed to load saved wishlist:', e);
    }
    return new Set<string>();
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('punjab_boutique_products_v1', JSON.stringify(products));
    } catch (e) {
      console.warn(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('punjab_boutique_settings_v1', JSON.stringify(settings));
    } catch (e) {
      console.warn(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('punjab_boutique_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.warn(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('punjab_boutique_wishlist_v1', JSON.stringify(Array.from(wishlistIds)));
    } catch (e) {
      console.warn(e);
    }
  }, [wishlistIds]);

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // WhatsApp preview modal state
  const [previewModalData, setPreviewModalData] = useState<{
    isOpen: boolean;
    messageText: string;
    url: string | null;
  }>({
    isOpen: false,
    messageText: '',
    url: null,
  });

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: string,
    quantity: number,
    customNote?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        if (customNote) copy[existingIndex].customNote = customNote;
        return copy;
      }
      return [...prev, { product, size, quantity, customNote }];
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(product.id)) {
        copy.delete(product.id);
      } else {
        copy.add(product.id);
      }
      return copy;
    });
  };

  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, product.sizes[0] || 'Standard', 1);
    setIsCartOpen(true);
  };

  // WhatsApp Actions
  const handleSendCartWhatsApp = (customerNote?: string) => {
    const message = formatCartEnquiryMessage(cart, settings, customerNote);
    const { url, isDemoOnly } = buildWhatsAppUrl(
      settings.whatsappNumber,
      message,
      settings.isNumberConfigured
    );

    if (!isDemoOnly && url) {
      // In a real environment, this opens WhatsApp directly
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    // Always show preview modal as well so user sees the formatted text clearly
    setPreviewModalData({
      isOpen: true,
      messageText: message,
      url,
    });
  };

  const handlePreviewCartMessage = (customerNote?: string) => {
    const message = formatCartEnquiryMessage(cart, settings, customerNote);
    const { url } = buildWhatsAppUrl(
      settings.whatsappNumber,
      message,
      settings.isNumberConfigured
    );
    setPreviewModalData({
      isOpen: true,
      messageText: message,
      url,
    });
  };

  const handleSingleProductWhatsApp = (product: Product, size?: string) => {
    const resolvedSize = size || product.sizes[0] || 'Standard';
    const message = formatSingleProductEnquiryMessage(product, resolvedSize, settings);
    const { url, isDemoOnly } = buildWhatsAppUrl(
      settings.whatsappNumber,
      message,
      settings.isNumberConfigured
    );

    if (!isDemoOnly && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    setPreviewModalData({
      isOpen: true,
      messageText: message,
      url,
    });
  };

  const handleQuickGeneralWhatsApp = () => {
    const message = `Hello ${settings.boutiqueName}!\n\nI was browsing your digital catalogue and would like to ask about your newest Punjabi suits and customization options.`;
    const { url, isDemoOnly } = buildWhatsAppUrl(
      settings.whatsappNumber,
      message,
      settings.isNumberConfigured
    );
    if (!isDemoOnly && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setPreviewModalData({
      isOpen: true,
      messageText: message,
      url,
    });
  };

  const handleCustomStitchingWhatsApp = () => {
    const message = `Hello ${settings.boutiqueName}!\n\nI have a custom tailoring requirement (Punjabi suit / bridal fitting) and would like to consult your master tailor regarding measurements and timelines.`;
    const { url, isDemoOnly } = buildWhatsAppUrl(
      settings.whatsappNumber,
      message,
      settings.isNumberConfigured
    );
    if (!isDemoOnly && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setPreviewModalData({
      isOpen: true,
      messageText: message,
      url,
    });
  };

  // Navigation helper
  const handleNavigate = (sectionId: string) => {
    if (isAdminView) {
      setIsAdminView(false);
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  // Reset to default sample data
  const handleResetToDefaults = () => {
    if (confirm('Reset catalogue and settings back to original demo samples?')) {
      setProducts(INITIAL_PRODUCTS);
      setSettings(DEFAULT_SETTINGS);
      setCart([]);
      setWishlistIds(new Set());
      localStorage.removeItem('punjab_boutique_products_v1');
      localStorage.removeItem('punjab_boutique_settings_v1');
      localStorage.removeItem('punjab_boutique_cart_v1');
      localStorage.removeItem('punjab_boutique_wishlist_v1');
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#221B19] flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        settings={settings}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
        onNavigate={handleNavigate}
        isAdminView={isAdminView}
        onToggleAdmin={() => setIsAdminView(!isAdminView)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isAdminView ? (
          <AdminDemoView
            products={products}
            settings={settings}
            onUpdateProducts={setProducts}
            onUpdateSettings={setSettings}
            onResetToDefaults={handleResetToDefaults}
            onExitAdmin={() => setIsAdminView(false)}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              settings={settings}
              onExploreCollections={() => handleNavigate('collections')}
              onBookAppointment={() => setIsAppointmentOpen(true)}
              onQuickWhatsApp={handleQuickGeneralWhatsApp}
            />

            {/* Category Showcase Section */}
            <CategoryShowcase
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                handleNavigate('collections');
              }}
            />

            {/* New Arrivals Section */}
            <NewArrivalsSection
              products={products}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={setSelectedProduct}
              onQuickWhatsApp={handleSingleProductWhatsApp}
              onQuickAddToCart={(p) => handleAddToCart(p, p.sizes[0] || 'Standard', 1)}
              onViewAll={() => {
                setSelectedCategory('All');
                handleNavigate('collections');
              }}
            />

            {/* Complete Product Grid & Search */}
            <ProductGrid
              products={products}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={setSelectedProduct}
              onQuickWhatsApp={handleSingleProductWhatsApp}
              onQuickAddToCart={(p) => handleAddToCart(p, p.sizes[0] || 'Standard', 1)}
            />

            {/* Why Shop With Us / Atelier Standard Section */}
            <WhyUsSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
        onToggleAdmin={() => setIsAdminView(!isAdminView)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* Mobile Bottom Navigation (thumb-zone ergonomics) */}
      <MobileBottomNav
        activeTab="home"
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp
        settings={settings}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onQuickGeneralWhatsApp={handleQuickGeneralWhatsApp}
        onCustomStitchingWhatsApp={handleCustomStitchingWhatsApp}
      />

      {/* Modals and Slide-Over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onDirectWhatsApp={(prod, sz) => handleSingleProductWhatsApp(prod, sz)}
      />

      <EnquiryCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        settings={settings}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onSendWhatsAppEnquiry={handleSendCartWhatsApp}
        onPreviewMessage={handlePreviewCartMessage}
        onExploreCollections={() => handleNavigate('collections')}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
        onSelectProduct={setSelectedProduct}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        boutiqueName={settings.boutiqueName}
      />

      <WhatsAppPreviewModal
        isOpen={previewModalData.isOpen}
        onClose={() => setPreviewModalData((prev) => ({ ...prev, isOpen: false }))}
        messageText={previewModalData.messageText}
        settings={settings}
        whatsappUrl={previewModalData.url}
        onOpenAdminSettings={() => {
          setIsAdminView(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <OwnerWalkthroughModal
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        onOpenAdmin={() => {
          setIsAdminView(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
