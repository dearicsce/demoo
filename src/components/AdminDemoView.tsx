import React, { useState } from 'react';
import { Product, Category, Availability, BoutiqueSettings } from '../types';
import { formatINR } from '../utils/currency';
import { Plus, Edit2, Trash2, RotateCcw, Save, ShieldAlert, Phone, Check, Sparkles, Building, Clock } from 'lucide-react';

interface AdminDemoViewProps {
  products: Product[];
  settings: BoutiqueSettings;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateSettings: (settings: BoutiqueSettings) => void;
  onResetToDefaults: () => void;
  onExitAdmin: () => void;
}

export const AdminDemoView: React.FC<AdminDemoViewProps> = ({
  products,
  settings,
  onUpdateProducts,
  onUpdateSettings,
  onResetToDefaults,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  
  // Settings Form state
  const [settingsForm, setSettingsForm] = useState<BoutiqueSettings>({ ...settings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Product Editing state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const categories: Category[] = [
    'Punjabi Suits',
    'Salwar Kameez',
    'Kurtis',
    'Party Wear',
    'Festive Collection',
    'Dupattas',
  ];

  const emptyProduct: Product = {
    id: `pb-custom-${Date.now()}`,
    name: '',
    category: 'Punjabi Suits',
    price: 6500,
    fabric: 'Pure Georgette',
    embroidery: 'Handmade Tilla Work',
    description: 'Custom boutique design sample.',
    sizes: ['S', 'M', 'L', 'XL', 'Custom Stitching'],
    availability: 'In Stock',
    image: '/src/assets/images/punjabi_suit_maroon_1794219999388.jpg',
    sku: `PB-NEW-${Math.floor(100 + Math.random() * 900)}`,
  };

  const [formProduct, setFormProduct] = useState<Product>(emptyProduct);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleStartAdd = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
    setFormProduct({
      ...emptyProduct,
      id: `pb-custom-${Date.now()}`,
      sku: `PB-NEW-${Math.floor(100 + Math.random() * 900)}`,
    });
  };

  const handleStartEdit = (product: Product) => {
    setIsAddingNew(false);
    setEditingProduct(product);
    setFormProduct({ ...product });
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Delete this sample outfit from the demo catalogue?')) {
      const updated = products.filter((p) => p.id !== id);
      onUpdateProducts(updated);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProduct.name.trim()) return;

    if (isAddingNew) {
      onUpdateProducts([formProduct, ...products]);
    } else if (editingProduct) {
      const updated = products.map((p) => (p.id === formProduct.id ? formProduct : p));
      onUpdateProducts(updated);
    }

    setIsAddingNew(false);
    setEditingProduct(null);
  };

  return (
    <div className="py-10 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header & Security Disclosure */}
        <div className="bg-white border border-[#E6DCce] rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E6DCce]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#BA8E35] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Concept Demo Admin Console</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#420A16]">
                Boutique Management Demo
              </h1>
              <p className="text-xs text-[#736863] mt-1">
                Demonstrating how boutique owners can update prices, manage stock status, and set their WhatsApp number.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onResetToDefaults}
                className="px-3.5 py-2 text-xs font-semibold text-[#851831] hover:bg-[#851831]/10 border border-[#851831]/30 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset all sample products and settings to default demo state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>

              <button
                onClick={onExitAdmin}
                className="px-4 py-2 bg-[#420A16] hover:bg-[#540D1E] text-[#DFC282] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                View Customer Lookbook
              </button>
            </div>
          </div>

          {/* Technical Honesty Callout */}
          <div className="mt-4 p-3.5 bg-[#F3ECE1] border border-[#DFC282]/50 rounded-xl flex items-start gap-3 text-xs text-[#540D1E]">
            <ShieldAlert className="w-4 h-4 text-[#BA8E35] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Technical Implementation Note for Sales Pitch:</strong> Changes made here are saved in your local browser storage for demonstration purposes. In a full production deployment, this admin panel would be protected by Firebase Authentication / Role-Based Access Control and connected to a persistent cloud database.
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#420A16] text-[#DFC282]'
                  : 'bg-[#FAF7F2] text-[#4A423F] hover:bg-[#EDE4D8]'
              }`}
            >
              Sample Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#420A16] text-[#DFC282]'
                  : 'bg-[#FAF7F2] text-[#4A423F] hover:bg-[#EDE4D8]'
              }`}
            >
              WhatsApp &amp; Boutique Settings
            </button>
          </div>
        </div>

        {/* Tab 1: Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-[#420A16]">
                Product Catalogue ({products.length} Items)
              </h2>
              <button
                onClick={handleStartAdd}
                className="px-4 py-2 bg-[#BA8E35] hover:bg-[#9E7422] text-[#420A16] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Sample Outfit</span>
              </button>
            </div>

            {/* Product Add/Edit Form Modal */}
            {(isAddingNew || editingProduct) && (
              <div className="bg-white border-2 border-[#BA8E35] rounded-2xl p-6 shadow-xl animate-in fade-in">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6DCce]">
                  <h3 className="font-serif text-lg font-bold text-[#420A16]">
                    {isAddingNew ? 'Add New Sample Outfit' : `Edit: ${editingProduct?.name}`}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingNew(false);
                      setEditingProduct(null);
                    }}
                    className="text-xs text-[#8C807A] hover:text-[#420A16]"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#420A16] mb-1">
                      Outfit Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formProduct.name}
                      onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                      placeholder="e.g. Royal Maroon Velvet Punjabi Suit"
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#420A16] mb-1">
                      SKU / Style Code
                    </label>
                    <input
                      type="text"
                      value={formProduct.sku}
                      onChange={(e) => setFormProduct({ ...formProduct, sku: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#420A16] mb-1">
                      Category
                    </label>
                    <select
                      value={formProduct.category}
                      onChange={(e) => setFormProduct({ ...formProduct, category: e.target.value as Category })}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#420A16] mb-1">
                      Sample Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formProduct.price}
                      onChange={(e) => setFormProduct({ ...formProduct, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#420A16] mb-1">
                      Fabric Details
                    </label>
                    <input
                      type="text"
                      value={formProduct.fabric}
                      onChange={(e) => setFormProduct({ ...formProduct, fabric: e.target.value })}
                      placeholder="e.g. Pure Silk Velvet with Georgette"
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#420A16] mb-1">
                      Availability Status
                    </label>
                    <select
                      value={formProduct.availability}
                      onChange={(e) => setFormProduct({ ...formProduct, availability: e.target.value as Availability })}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                    >
                      <option value="In Stock">In Stock (Ready to Ship)</option>
                      <option value="Made to Order">Made to Order</option>
                      <option value="Few Pieces Left">Few Pieces Left</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-semibold text-[#420A16] mb-1">
                      Embroidery &amp; Craft Details
                    </label>
                    <input
                      type="text"
                      value={formProduct.embroidery}
                      onChange={(e) => setFormProduct({ ...formProduct, embroidery: e.target.value })}
                      placeholder="e.g. Handcrafted Golden Tilla & Dabka Work"
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-semibold text-[#420A16] mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={formProduct.description}
                      onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNew(false);
                        setEditingProduct(null);
                      }}
                      className="px-4 py-2 border border-[#E6DCce] rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#420A16] text-[#DFC282] font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Outfit</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white border border-[#E6DCce] rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#E6DCce] text-[#736863] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Outfit</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Sample Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Fabric</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6DCce]/60">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF7F2]/50">
                        <td className="py-3 px-4 font-medium text-[#221B19]">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-12 object-cover rounded bg-[#EDE4D8]"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="font-semibold text-sm text-[#420A16]">{p.name}</div>
                              <div className="text-[10px] text-[#8C807A]">SKU: {p.sku}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#5A514D]">{p.category}</td>
                        <td className="py-3 px-4 font-serif font-bold text-[#420A16] tabular-nums">
                          ₹{formatINR(p.price)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            p.availability === 'In Stock'
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.availability === 'Made to Order'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {p.availability}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#736863] max-w-xs truncate">{p.fabric}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => handleStartEdit(p)}
                              className="p-1.5 text-[#4A423F] hover:text-[#420A16] hover:bg-[#F3ECE1] rounded cursor-pointer"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 text-[#8C807A] hover:text-[#851831] hover:bg-rose-50 rounded cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: WhatsApp & Boutique Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-[#E6DCce] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xs">
            <h2 className="font-serif text-xl font-bold text-[#420A16] mb-1">
              Boutique Contact &amp; WhatsApp Configuration
            </h2>
            <p className="text-xs text-[#736863] mb-6">
              When pitching to the boutique owner, they can enter their own real WhatsApp number here to test real click-to-chat on their phone!
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              
              {/* WhatsApp Toggle & Number */}
              <div className="p-4 bg-[#F3ECE1] border border-[#DFC282]/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-bold text-[#420A16] block">
                      Enable Live WhatsApp Click-to-Chat
                    </label>
                    <p className="text-[11px] text-[#736863]">
                      When enabled, customer clicks will open a real chat with this number.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.isNumberConfigured}
                    onChange={(e) => setSettingsForm({ ...settingsForm, isNumberConfigured: e.target.checked })}
                    className="w-5 h-5 accent-[#6B1226] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#420A16] mb-1">
                    WhatsApp Business Number (with country code, e.g. 919876543210)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C807A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      placeholder="e.g. 919876543210"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#E6DCce] rounded-lg font-mono text-xs text-[#221B19] focus:outline-none focus:border-[#BA8E35]"
                    />
                  </div>
                  <span className="text-[10px] text-[#8C807A] mt-1 block">
                    No hyphens or plus signs needed (digits only). Example: 919876543210
                  </span>
                </div>
              </div>

              {/* Boutique Name & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#420A16] mb-1">
                    Boutique Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.boutiqueName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, boutiqueName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#420A16] mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                  />
                </div>
              </div>

              {/* Address Placeholder */}
              <div>
                <label className="block font-semibold text-[#420A16] mb-1">
                  Store Address Placeholder
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#8C807A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={settingsForm.addressPlaceholder}
                    onChange={(e) => setSettingsForm({ ...settingsForm, addressPlaceholder: e.target.value })}
                    placeholder="e.g. Heritage Lane, Near Golden Temple / Mall Road"
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                  />
                </div>
              </div>

              {/* Consultation Hours */}
              <div>
                <label className="block font-semibold text-[#420A16] mb-1">
                  Consultation &amp; Store Hours
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#8C807A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={settingsForm.consultationHours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, consultationHours: e.target.value })}
                    placeholder="e.g. 11:00 AM – 7:30 PM (IST), Mon – Sat"
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E6DCce] rounded-lg"
                  />
                </div>
              </div>

              {/* Save Feedback */}
              {settingsSaved && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Settings updated locally! Now test adding items and sending an enquiry.</span>
                </div>
              )}

              {/* Save Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#420A16] hover:bg-[#540D1E] text-[#DFC282] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Boutique Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
