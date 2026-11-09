import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanPhoneNumber,
  buildWhatsAppUrl,
  formatCartEnquiryMessage,
  formatSingleProductEnquiryMessage,
} from './whatsapp';
import { BoutiqueSettings, CartItem, Product } from '../types';

const mockSettings: BoutiqueSettings = {
  boutiqueName: 'Punjab Boutique',
  tagline: 'Elegance Woven Into Every Thread',
  whatsappNumber: '+91 98765 43210',
  isNumberConfigured: true,
  addressPlaceholder: 'Near Mall Road, Amritsar, Punjab',
  cityPlaceholder: 'Amritsar, Punjab',
  consultationHours: '11:00 AM - 8:00 PM',
  instagramPlaceholder: '@punjabboutique.official',
  currencySymbol: '₹',
};

const mockProduct: Product = {
  id: 'pb-01',
  name: 'Gulab Rani Velvet Punjabi Suit',
  category: 'Punjabi Suits',
  price: 8990,
  fabric: 'Pure Silk Velvet',
  embroidery: 'Handcrafted Tilla & Dabka Work',
  description: 'Rich wine velvet suit with antique zari detailing.',
  sizes: ['S', 'M', 'L', 'XL'],
  availability: 'In Stock',
  image: '/src/assets/images/punjabi_suit_maroon_1794219999388.jpg',
  sku: 'PB-SUIT-001',
};

test('cleanPhoneNumber strips spaces, dashes and non-digit characters', () => {
  assert.equal(cleanPhoneNumber('+91 98765-43210'), '919876543210');
  assert.equal(cleanPhoneNumber('91-987-654-3210'), '919876543210');
});

test('buildWhatsAppUrl returns null URL when isConfigured is false', () => {
  const result = buildWhatsAppUrl('919876543210', 'Hello', false);
  assert.equal(result.url, null);
  assert.equal(result.isDemoOnly, true);
  assert.equal(result.encodedText, 'Hello');
});

test('buildWhatsAppUrl constructs proper https://wa.me URL when configured', () => {
  const result = buildWhatsAppUrl('+91 98765 43210', 'Test message with spaces', true);
  assert.equal(result.isDemoOnly, false);
  assert.match(result.url ?? '', /^https:\/\/wa\.me\/919876543210\?text=/);
  assert.ok(result.url?.includes('Test%20message%20with%20spaces'));
});

test('formatCartEnquiryMessage creates itemized breakdown with estimated subtotal', () => {
  const cart: CartItem[] = [
    {
      product: mockProduct,
      size: 'M',
      quantity: 2,
      customNote: 'Slightly shorter kurti length',
    },
  ];

  const message = formatCartEnquiryMessage(cart, mockSettings, 'Need for wedding next month');
  assert.ok(message.includes('Punjab Boutique'));
  assert.ok(message.includes('Gulab Rani Velvet Punjabi Suit'));
  assert.ok(message.includes('PB-SUIT-001'));
  assert.ok(message.includes('Selected Size: M'));
  assert.ok(message.includes('Quantity: 2'));
  assert.ok(message.includes('Slightly shorter kurti length'));
  assert.ok(message.includes('₹17,980'));
  assert.ok(message.includes('Estimated Total'));
  assert.ok(message.includes('Need for wedding next month'));
});

test('formatSingleProductEnquiryMessage builds direct product inquiry', () => {
  const message = formatSingleProductEnquiryMessage(mockProduct, 'Custom Stitching', mockSettings);
  assert.ok(message.includes('PB-SUIT-001'));
  assert.ok(message.includes('Pure Silk Velvet'));
  assert.ok(message.includes('Custom Stitching'));
  assert.ok(message.includes('₹8,990'));
});
