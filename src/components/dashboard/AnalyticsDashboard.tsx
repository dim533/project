import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { LineChart, BarChart } from '../ui/charts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { supabase } from '../../lib/supabase';

interface AnalyticsData {
  views: number[];
  leads: number[];
  reviews: number[];
  dates: string[];
}

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeframe]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data: analyticsData, error } = await supabase
        .from('analytics')
        .select('*')
        .order('date', { ascending: true })
        .limit(timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365);

      if (error) throw error;

      // Process data for charts
      const processed = {
        views: analyticsData.map(d => d.views),
        leads: analyticsData.map(d => d.leads),
        reviews: analyticsData.map(d => d.reviews),
        dates: analyticsData.map(d => new Date(d.date).toLocaleDateString())
      };

      setData(processed);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <Tabs value={timeframe} onValueChange={(v: any) => setTimeframe(v)}>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/5 border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Profile Views</h3>
          <LineChart
            data={{
              labels: data?.dates || [],
              datasets: [{
                label: 'Views',
                data: data?.views || [],
                borderColor: 'rgb(16, 185, 129)',
                tension: 0.3
              }]
            }}
          />
        </Card>

        <Card className="p-6 bg-white/5 border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Leads Generated</h3>
          <BarChart
            data={{
              labels: data?.dates || [],
              datasets: [{
                label: 'Leads',
                data: data?.leads || [],
                backgroundColor: 'rgb(16, 185, 129)',
              }]
            }}
          />
        </Card>
      </div>
    </div>
  );
} 