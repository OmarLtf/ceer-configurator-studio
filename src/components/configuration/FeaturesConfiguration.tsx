
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ConfigurationState } from "@/components/ConfigurationWizard";
import { Shield, Zap, Smartphone, Car, Wifi, Camera } from "lucide-react";

interface FeaturesConfigurationProps {
  configuration: ConfigurationState;
  updateConfiguration: (updates: Partial<ConfigurationState>) => void;
  modelId: string;
}

const FeaturesConfiguration = ({ configuration, updateConfiguration }: FeaturesConfigurationProps) => {
  const featureCategories = [
    {
      name: "Safety & Security",
      icon: Shield,
      features: [
        { id: "adaptive-cruise", name: "Adaptive Cruise Control", price: "$2,000", description: "Automatic speed and distance control" },
        { id: "blind-spot", name: "Blind Spot Monitoring", price: "$1,500", description: "Enhanced awareness system" },
        { id: "collision-avoidance", name: "Collision Avoidance", price: "$3,000", description: "AI-powered accident prevention" },
        { id: "parking-assist", name: "Advanced Parking Assist", price: "$2,500", description: "Automated parking capabilities" },
      ]
    },
    {
      name: "Performance",
      icon: Zap,
      features: [
        { id: "sport-mode", name: "Sport+ Mode", price: "$1,500", description: "Enhanced performance tuning" },
        { id: "air-suspension", name: "Adaptive Air Suspension", price: "$4,000", description: "Dynamic ride height adjustment" },
        { id: "performance-brakes", name: "Performance Brake Package", price: "$3,500", description: "High-performance braking system" },
        { id: "track-mode", name: "Track Mode", price: "$2,000", description: "Circuit-optimized settings" },
      ]
    },
    {
      name: "Technology",
      icon: Smartphone,
      features: [
        { id: "premium-audio", name: "Premium Audio System", price: "$2,500", description: "High-fidelity sound experience" },
        { id: "head-up-display", name: "Augmented HUD", price: "$1,800", description: "Advanced heads-up display" },
        { id: "wireless-charging", name: "Wireless Charging Pad", price: "$500", description: "Convenient device charging" },
        { id: "ambient-lighting", name: "Ambient Lighting Package", price: "$800", description: "Customizable interior lighting" },
      ]
    }
  ];

  const connectivityPackages = [
    {
      id: "basic",
      name: "Basic Connectivity",
      description: "Essential connected services",
      price: "$29/month",
      features: ["Real-time Traffic", "Remote Monitoring", "Emergency Services"]
    },
    {
      id: "premium",
      name: "Premium Connectivity",
      description: "Enhanced features and entertainment",
      price: "$59/month",
      features: ["All Basic Features", "Streaming Services", "Advanced Navigation", "Vehicle Analytics"],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise Package",
      description: "Business-grade connectivity",
      price: "$99/month",
      features: ["All Premium Features", "Fleet Management", "Advanced Security", "Priority Support"]
    }
  ];

  const accessories = [
    { id: "floor-mats", name: "All-Weather Floor Mats", price: "$200", icon: Car },
    { id: "roof-rack", name: "Roof Rack System", price: "$800", icon: Car },
    { id: "cargo-organizer", name: "Cargo Organizer", price: "$150", icon: Car },
    { id: "dash-cam", name: "Integrated Dash Cam", price: "$400", icon: Camera },
    { id: "sunshades", name: "Custom Sunshades", price: "$250", icon: Car },
    { id: "wireless-hotspot", name: "5G Wireless Hotspot", price: "$300", icon: Wifi },
  ];

  const toggleFeature = (featureId: string) => {
    const currentFeatures = configuration.features || [];
    const updatedFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter(id => id !== featureId)
      : [...currentFeatures, featureId];
    updateConfiguration({ features: updatedFeatures });
  };

  const toggleAccessory = (accessoryId: string) => {
    const currentAccessories = configuration.accessories || [];
    const updatedAccessories = currentAccessories.includes(accessoryId)
      ? currentAccessories.filter(id => id !== accessoryId)
      : [...currentAccessories, accessoryId];
    updateConfiguration({ accessories: updatedAccessories });
  };

  return (
    <div className="space-y-12">
      {/* Features */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Advanced Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Enhance your vehicle with cutting-edge technology and performance features 
            designed to elevate your driving experience.
          </p>
        </div>

        <div className="space-y-8">
          {featureCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.name}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {category.features.map((feature) => {
                    const isSelected = configuration.features?.includes(feature.id) || false;
                    
                    return (
                      <Card 
                        key={feature.id}
                        className={`cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-400' 
                            : 'bg-white/5 border-gray-700 hover:bg-white/10'
                        }`}
                        onClick={() => toggleFeature(feature.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Checkbox 
                              checked={isSelected}
                              onChange={() => toggleFeature(feature.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-white">{feature.name}</h4>
                                <span className="text-blue-400 font-medium">{feature.price}</span>
                              </div>
                              <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connectivity Packages */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Connectivity Packages
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            Stay connected with our range of connectivity packages offering various levels of features and services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {connectivityPackages.map((pkg) => {
            const isSelected = configuration.connectivityPackage === pkg.id;
            
            return (
              <Card 
                key={pkg.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 relative ${
                  isSelected 
                    ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-400' 
                    : 'bg-white/5 border-gray-700 hover:bg-white/10'
                }`}
                onClick={() => updateConfiguration({ connectivityPackage: pkg.id })}
              >
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    Popular
                  </Badge>
                )}
                
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2">{pkg.name}</h4>
                  <p className="text-gray-400 mb-4">{pkg.description}</p>
                  
                  <div className="text-2xl font-bold text-blue-400 mb-4">{pkg.price}</div>
                  
                  <div className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Accessories */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Accessories
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            Complete your vehicle with our selection of premium accessories designed for convenience and style.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {accessories.map((accessory) => {
            const isSelected = configuration.accessories?.includes(accessory.id) || false;
            const IconComponent = accessory.icon;
            
            return (
              <Card 
                key={accessory.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-400' 
                    : 'bg-white/5 border-gray-700 hover:bg-white/10'
                }`}
                onClick={() => toggleAccessory(accessory.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1">{accessory.name}</h4>
                  <p className="text-blue-400 text-sm font-medium">{accessory.price}</p>
                  
                  <div className="mt-2">
                    <Checkbox 
                      checked={isSelected}
                      onChange={() => toggleAccessory(accessory.id)}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesConfiguration;
