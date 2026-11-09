import { CartItem, Product, BoutiqueSettings } from '../types';
import { formatINR } from './currency';

/**
 * Formats an itemized inquiry message for the entire cart
 */
export function formatCartEnquiryMessage(
  items: CartItem[],
  settings: BoutiqueSettings,
  customerNote?: string
): string {
  if (items.length === 0) {
    return `Hello ${settings.boutiqueName},\n\nI would like to enquire about your boutique collection.`;
  }

  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  let message = `*Enquiry - ${settings.boutiqueName}*\n`;
  message += `Date: ${dateStr}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `Hello! I am interested in placing an enquiry for the following design(s) from your digital showcase:\n\n`;

  let totalEstimate = 0;

  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    totalEstimate += itemTotal;
    
    message += `*${index + 1}. ${item.product.name}*\n`;
    message += `   • Code: ${item.product.sku}\n`;
    message += `   • Category: ${item.product.category}\n`;
    message += `   • Fabric: ${item.product.fabric}\n`;
    message += `   • Selected Size: ${item.size}\n`;
    message += `   • Quantity: ${item.quantity}\n`;
    message += `   • Sample Price: ₹${formatINR(item.product.price)}\n`;
    if (item.customNote && item.customNote.trim()) {
      message += `   • Custom Note: ${item.customNote.trim()}\n`;
    }
    message += `\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Estimated Total:* ₹${formatINR(totalEstimate)} (Demo Estimate)\n\n`;

  if (customerNote && customerNote.trim()) {
    message += `*Additional Notes / Sizing Requirement:*\n"${customerNote.trim()}"\n\n`;
  }

  message += `Please let me know about availability, bespoke stitching timeline, and next steps.\n\nThank you!`;

  return message;
}

/**
 * Formats a quick single-product enquiry message
 */
export function formatSingleProductEnquiryMessage(
  product: Product,
  selectedSize: string,
  settings: BoutiqueSettings
): string {
  let message = `*Product Enquiry - ${settings.boutiqueName}*\n\n`;
  message += `Hello! I would like to check availability and details for this outfit:\n\n`;
  message += `*${product.name}*\n`;
  message += `• Code: ${product.sku}\n`;
  message += `• Category: ${product.category}\n`;
  message += `• Fabric: ${product.fabric}\n`;
  message += `• Embroidery: ${product.embroidery}\n`;
  message += `• Size of Interest: ${selectedSize}\n`;
  message += `• Sample Price: ₹${formatINR(product.price)}\n`;
  message += `• Status: ${product.availability}\n\n`;
  message += `Could you please share details on fabric feel, customization options, and delivery timeline?\n\nThank you!`;
  return message;
}

/**
 * Cleans phone number by removing non-digits
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Constructs a WhatsApp click-to-chat URL.
 * If number is not configured, returns null so the UI can display a friendly modal instead of a broken link.
 */
export function buildWhatsAppUrl(
  phone: string,
  message: string,
  isConfigured: boolean
): { url: string | null; encodedText: string; isDemoOnly: boolean } {
  const cleaned = cleanPhoneNumber(phone);
  const encodedText = encodeURIComponent(message);
  
  if (!isConfigured || !cleaned) {
    return {
      url: null,
      encodedText,
      isDemoOnly: true,
    };
  }

  return {
    url: `https://wa.me/${cleaned}?text=${encodedText}`,
    encodedText,
    isDemoOnly: false,
  };
}
