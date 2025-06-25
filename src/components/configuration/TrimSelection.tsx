
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfigurationState } from "@/components/ConfigurationWizard";
import { Crown, Zap, Trophy, Gem } from "lucide-react";

interface TrimSelectionProps {
  configuration: ConfigurationState;
  updateConfiguration: (updates: Partial<ConfigurationState>) => void;
  modelId: string;
}

const TrimSelection = ({ configuration, updateConfiguration }: TrimSelectionProps) => {
  const trims = [
    {
      id: "standard",
      name: "Standard",
      description: "Essential features with premium quality",
      price: "+$0",
      features: ["LED Headlights", "Premium Audio", "Wireless Charging"],
      icon: Crown,
      gradient: "from-gray-600 to-gray-800",
    },
    {
      id: "premium",
      name: "Premium",
      description: "Enhanced comfort and advanced technology",
      price: "+$15,000",
      features: ["Panoramic Roof", "Premium Interior", "Advanced Driver Assistance"],
      icon: Zap,
      gradient: "from-blue-600 to-indigo-600",
      popular: true,
    },
    {
      id: "sport",
      name: "Sport",
      description: "Performance-focused with dynamic styling",
      price: "+$25,000",
      features: ["Sport Suspension", "Performance Brakes", "Sport Interior"],
      icon: Trophy,
      gradient: "from-red-600 to-orange-600",
    },
    {
      id: "executive",
      name: "Executive",
      description: "Ultimate luxury and comfort",
      price: "+$40,000",
      features: ["Massage Seats", "Premium Sound System", "Executive Lounge"],
      icon: Gem,
      gradient: "from-purple-600 to-pink-600",
    },
  ];

  const drivelineOptions = [
    {
      id: "rwd",
      name: "Rear-Wheel Drive",
      description: "Balanced performance and efficiency",
      price: "Included",
    },
    {
      id: "awd",
      name: "All-Wheel Drive",
      description: "Enhanced traction and control",
      price: "+$8,000",
    },
    {
      id: "performance",
      name: "Performance Variant",
      description: "Maximum power and acceleration",
      price: "+$20,000",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Trim Selection */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Trim Level
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the trim level that best suits your lifestyle and preferences. 
            Each trim offers a unique combination of features and styling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trims.map((trim) => {
            const IconComponent = trim.icon;
            const isSelected = configuration.trim === trim.id;
            
            return (
              <Card 
                key={trim.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                  isSelected 
                    ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-400' 
                    : 'bg-white/5 border-gray-700 hover:bg-white/10'
                }`}
                onClick={() => updateConfiguration({ trim: trim.id })}
              >
                {trim.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white z-10">
                    Popular
                  </Badge>
                )}
                
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${trim.gradient} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{trim.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{trim.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {trim.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <span className="text-xs text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-lg font-semibold text-white">{trim.price}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Driveline Selection */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Select Driveline
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            Choose the driveline configuration that matches your driving needs and performance expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {drivelineOptions.map((option) => {
            const isSelected = configuration.driveline === option.id;
            
            return (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-400' 
                    : 'bg-white/5 border-gray-700 hover:bg-white/10'
                }`}
                onClick={() => updateConfiguration({ driveline: option.id })}
              >
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">{option.name}</h4>
                  <p className="text-gray-400 text-sm mb-4">{option.description}</p>
                  <div className="text-blue-400 font-medium">{option.price}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrimSelection;
