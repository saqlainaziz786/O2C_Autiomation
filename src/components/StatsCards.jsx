import React from "react";
import {
  Users,
  Building,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Leads",
      value: "2,847",
      change: "+18.2% from last month",
      trend: "up",
      icon: Users,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-l-blue-600",
    },
    {
      title: "Total Companies",
      value: "1,234",
      change: "+12.5% from last month",
      trend: "up",
      icon: Building,
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      borderColor: "border-l-gray-600",
    },
    {
      title: "Approved",
      value: "1,856",
      change: "+22.1% from last month",
      trend: "up",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-l-green-600",
    },
    {
      title: "Rejected",
      value: "342",
      change: "-5.3% from last month",
      trend: "down",
      icon: XCircle,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      borderColor: "border-l-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor =
          stat.trend === "up" ? "text-green-600" : "text-red-600";

        return (
          <div
            key={index}
            className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 ${stat.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-800 text-sm font-semibold uppercase tracking-wide">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stat.value}
                </p>
                <p
                  className={`text-sm mt-2 font-medium flex items-center ${trendColor}`}
                >
                  <TrendIcon className="mr-1" size={14} />
                  {stat.change}
                </p>
              </div>
              <div className={`p-4 rounded-full ${stat.bgColor}`}>
                <Icon className={stat.iconColor} size={32} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
