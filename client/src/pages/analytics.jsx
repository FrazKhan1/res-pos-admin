import { Header } from "@/components/layout/header";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { DistributionChart } from "@/components/charts/distribution-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign, Store, Users, Clock } from "lucide-react";
import { mockStats } from "@/lib/mock-data";

export default function Analytics() {
  const additionalStats = [
    {
      title: "Average Order Value",
      value: "$42.50",
      icon: DollarSign,
      growth: "+8.2%",
      trend: "up",
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Peak Hours",
      value: "6-8 PM",
      icon: Clock,
      growth: "80% orders",
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Orders",
      value: "12,486",
      icon: Store,
      growth: "+15.3%",
      trend: "up",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      icon: Users,
      growth: "+0.2",
      trend: "up",
      color: "text-yellow-600",
      bgColor: "bg-yellow-500/10",
    },
  ];

  const topPerformingRestaurants = [
    { name: "Tokyo Sushi Bar", revenue: "52,180", growth: "+18%" },
    { name: "Mario's Italian Bistro", revenue: "45,230", growth: "+12%" },
    { name: "Casa Mexico", revenue: "28,450", growth: "-5%" },
    { name: "Le Petit Café", revenue: "15,670", growth: "+8%" },
  ];

  const categoryPerformance = [
    { name: "Italian", restaurants: 25, revenue: "580,000", growth: "+12%" },
    { name: "American", restaurants: 30, revenue: "720,000", growth: "+8%" },
    { name: "Mexican", restaurants: 22, revenue: "450,000", growth: "+15%" },
    { name: "Japanese", restaurants: 18, revenue: "390,000", growth: "+20%" },
    { name: "French", restaurants: 12, revenue: "280,000", growth: "+5%" },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Analytics Dashboard"
        subtitle="Detailed insights and performance metrics"
      />

      <div className="p-6 space-y-6">
        {/* Date Range Filter */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Performance Overview</h3>
          <div className="flex gap-4">
            <Select defaultValue="30d">
              <SelectTrigger className="w-40" data-testid="select-date-range">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40" data-testid="select-restaurant-filter">
                <SelectValue placeholder="Filter restaurants" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Restaurants</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="top">Top Performers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalStats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold" data-testid={`metric-${stat.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        {stat.value}
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`${stat.color} w-6 h-6`} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendIcon className={`w-4 h-4 mr-1 ${stat.color}`} />
                    <span className={stat.color}>{stat.growth}</span>
                    <span className="text-muted-foreground ml-2">from last period</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <DistributionChart />
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Restaurants */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Restaurants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingRestaurants.map((restaurant, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium" data-testid={`top-restaurant-${index}`}>{restaurant.name}</p>
                      <p className="text-sm text-muted-foreground">${restaurant.revenue}</p>
                    </div>
                    <div className={`text-sm font-medium ${
                      restaurant.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {restaurant.growth}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryPerformance.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium" data-testid={`category-${index}`}>{category.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {category.restaurants} restaurants • ${category.revenue}
                      </p>
                    </div>
                    <div className={`text-sm font-medium ${
                      category.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {category.growth}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Peak Order Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Lunch (12-2 PM)</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">Dinner (6-8 PM)</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">Late Night (9-11 PM)</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Geographic Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { city: "New York", count: 35 },
                  { city: "Los Angeles", count: 28 },
                  { city: "Chicago", count: 22 },
                  { city: "Miami", count: 18 },
                  { city: "Other", count: 24 },
                ].map((location, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{location.city}</span>
                    <span className="text-sm font-medium">{location.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monthly Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">+18.5%</p>
                  <p className="text-sm text-muted-foreground">Revenue Growth</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">+12%</p>
                  <p className="text-sm text-muted-foreground">New Restaurants</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">95.2%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
