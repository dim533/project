import { SEO } from "../components/SEO";
import { Header } from "../components/Header";
import { BusinessTypes } from "../components/business/BusinessTypes";
import { BusinessFeatures } from "../components/business/BusinessFeatures";

export default function ListYourBusinessPage() {
  return (
    <>
      <SEO 
        title="List Your Business | FitFinder"
        description="Join FitFinder and showcase your fitness business to thousands of potential customers."
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-24">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Grow Your Fitness Business
            </h1>
            <p className="text-xl text-white/70">
              Join thousands of fitness businesses that trust FitFinder to connect with new customers and manage their online presence.
            </p>
          </div>
          
          <BusinessFeatures />
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Choose Your Business Type
            </h2>
            <BusinessTypes />
          </div>
        </div>
      </main>
    </>
  );
} 