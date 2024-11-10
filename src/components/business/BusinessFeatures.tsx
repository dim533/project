import { Check } from "lucide-react";

const features = [
  "Custom business profile",
  "Photo gallery management",
  "Business hours & contact info",
  "Customer reviews & ratings",
  "Amenities showcase",
  "Class schedule management",
  "Direct customer messaging",
  "Analytics dashboard"
];

export function BusinessFeatures() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {features.map((feature, i) => (
        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
          <Check className="w-5 h-5 text-emerald-400 mt-0.5" />
          <span className="text-white/80">{feature}</span>
        </div>
      ))}
    </div>
  );
} 