import { getStatisticsFromSheet } from '@/lib/googleSheets';
import StatItem from './StatItem';

interface StatsSectionProps {
  title?: string;
}

export default async function StatsSection({ title = "Our Journey So Far" }: StatsSectionProps) {
  // Fetch statistics from Google Sheets (server-side)
  let statistics;
  try {
    statistics = await getStatisticsFromSheet();
  } catch (error) {
    console.error('Failed to load statistics:', error);
    // Fallback to default values
    statistics = {
      happyCustomers: 1205,
      totalOrders: 5000,
      citiesServed: 42
    };
  }

  const stats = [
    { label: "Happy Customers", value: statistics.happyCustomers },
    { label: "Total Orders Till Now", value: statistics.totalOrders },
    { label: "Cities Served", value: statistics.citiesServed }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary-cream via-primary-gold/10 to-primary-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-brown mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-primary-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
}