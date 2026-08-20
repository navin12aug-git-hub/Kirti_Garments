import { useState, useEffect } from 'react';
import { Save, Image, Star, Tag } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { images } from '../data/mockData';

export default function AdminHomepage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('kg_homepage_settings');
      return saved ? JSON.parse(saved) : {
        heroHeadline: 'Style That Defines You',
        heroDescription: 'Discover premium fashion for every occasion. From ethnic elegance to contemporary chic.',
        heroImage: images.hero,
        promoHeadline: 'New Season Collection',
        promoDescription: 'Discover the latest styles from Kirti Garments. Fresh designs that blend tradition with modern aesthetics.',
        promoImage: images.editorial?.[0] || images.store[0],
        promoButtonText: 'Shop Now',
        categoryTitle: 'Shop By Category',
        newArrivalsTitle: 'New Arrivals',
        newArrivalsSubtitle: 'Fresh drops for the new season',
        bestSellersTitle: 'Best Sellers',
        offersTitle: 'Style More. Spend Less.',
        announcementText: 'FREE SHIPPING ON ORDERS ABOVE ₹999',
        showReviews: true,
        showNewsletter: true,
        showWhatsApp: true,
      };
    } catch {
      return {};
    }
  });

  const [form, setForm] = useState(settings);

  useEffect(() => { setForm(settings); }, [settings]);

  const handleSave = () => {
    localStorage.setItem('kg_homepage_settings', JSON.stringify(form));
    setSettings(form);
    toast('Homepage settings saved successfully!');
  };

  const Input = ({ label, value, onChange, type = 'text' }) => (
    <div>
      <label className="text-sm font-medium text-neutral-700 mb-1.5 block">{label}</label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="input-field resize-none" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input-field" />
      )}
    </div>
  );

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Homepage Management</h1>
          <p className="text-sm text-neutral-500 mt-1">Customize your homepage content without touching code.</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save size={18} /> Save Changes</button>
      </div>

      {/* Announcement Bar */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Tag size={18} /> Announcement Bar</h2>
        <Input label="Announcement Text" value={form.announcementText || ''} onChange={(v) => setForm({ ...form, announcementText: v })} />
      </div>

      {/* Hero Section */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Image size={18} /> Hero Section</h2>
        <Input label="Headline" value={form.heroHeadline || ''} onChange={(v) => setForm({ ...form, heroHeadline: v })} />
        <Input label="Description" value={form.heroDescription || ''} onChange={(v) => setForm({ ...form, heroDescription: v })} type="textarea" />
        <Input label="Hero Image URL" value={form.heroImage || ''} onChange={(v) => setForm({ ...form, heroImage: v })} />
        {form.heroImage && <img src={form.heroImage} alt="Hero preview" className="w-full h-40 object-cover" />}
      </div>

      {/* Promotional Banner */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Image size={18} /> Promotional Banner</h2>
        <Input label="Headline" value={form.promoHeadline || ''} onChange={(v) => setForm({ ...form, promoHeadline: v })} />
        <Input label="Description" value={form.promoDescription || ''} onChange={(v) => setForm({ ...form, promoDescription: v })} type="textarea" />
        <Input label="Button Text" value={form.promoButtonText || ''} onChange={(v) => setForm({ ...form, promoButtonText: v })} />
        <Input label="Banner Image URL" value={form.promoImage || ''} onChange={(v) => setForm({ ...form, promoImage: v })} />
        {form.promoImage && <img src={form.promoImage} alt="Promo preview" className="w-full h-40 object-cover" />}
      </div>

      {/* Section Titles */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Star size={18} /> Section Titles</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Category Section Title" value={form.categoryTitle || ''} onChange={(v) => setForm({ ...form, categoryTitle: v })} />
          <Input label="New Arrivals Title" value={form.newArrivalsTitle || ''} onChange={(v) => setForm({ ...form, newArrivalsTitle: v })} />
          <Input label="New Arrivals Subtitle" value={form.newArrivalsSubtitle || ''} onChange={(v) => setForm({ ...form, newArrivalsSubtitle: v })} />
          <Input label="Best Sellers Title" value={form.bestSellersTitle || ''} onChange={(v) => setForm({ ...form, bestSellersTitle: v })} />
          <Input label="Offers Title" value={form.offersTitle || ''} onChange={(v) => setForm({ ...form, offersTitle: v })} />
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-white border border-neutral-200 p-5 space-y-3">
        <h2 className="text-lg font-semibold">Display Options</h2>
        <label className="flex items-center justify-between py-2">
          <span className="text-sm text-neutral-700">Show Customer Reviews</span>
          <input type="checkbox" checked={form.showReviews !== false} onChange={(e) => setForm({ ...form, showReviews: e.target.checked })} className="w-5 h-5 accent-neutral-900" />
        </label>
        <label className="flex items-center justify-between py-2 border-t border-neutral-100">
          <span className="text-sm text-neutral-700">Show Newsletter</span>
          <input type="checkbox" checked={form.showNewsletter !== false} onChange={(e) => setForm({ ...form, showNewsletter: e.target.checked })} className="w-5 h-5 accent-neutral-900" />
        </label>
        <label className="flex items-center justify-between py-2 border-t border-neutral-100">
          <span className="text-sm text-neutral-700">Show WhatsApp Button</span>
          <input type="checkbox" checked={form.showWhatsApp !== false} onChange={(e) => setForm({ ...form, showWhatsApp: e.target.checked })} className="w-5 h-5 accent-neutral-900" />
        </label>
      </div>

      <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save size={18} /> Save All Changes</button>
    </div>
  );
}
