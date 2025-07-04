
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
    <div className="grid lg:grid-cols-2 gap-8 h-full">
      {/* 3D Car Showcase */}
      <div className="bg-card rounded-lg border border-border p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
            <div className="text-primary-foreground text-3xl font-bold">3D</div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Feature Preview</h3>
          <p className="text-muted-foreground">
            Interactive view showing advanced features and technology integrations.
          </p>
        </div>
      </div>

      {/* Options Panel */}
      <div className="space-y-8 overflow-y-auto">
        {/* Features */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Advanced Features
            </h2>
            <p className="text-muted-foreground">
              Enhance your vehicle with cutting-edge technology and performance features 
              designed to elevate your driving experience.
            </p>
          </div>

          <div className="space-y-6">
            {featureCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.name}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                  </div>
                  
                  <div className="grid gap-3">
                    {category.features.map((feature) => {
                      const isSelected = configuration.features?.includes(feature.id) || false;
                      
                      return (
                        <Card 
                          key={feature.id}
                          className={`cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                              : 'bg-card border-border hover:bg-accent/20'
                          }`}
                          onClick={() => toggleFeature(feature.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                              <Checkbox 
                                checked={isSelected}
                                onChange={() => toggleFeature(feature.id)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-foreground text-sm">{feature.name}</h4>
                                  <span className="text-primary font-medium text-sm">{feature.price}</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{feature.description}</p>
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
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Connectivity Packages
            </h3>
            <p className="text-muted-foreground">
              Stay connected with our range of connectivity packages offering various levels of features and services.
            </p>
          </div>

          <div className="grid gap-4">
            {connectivityPackages.map((pkg) => {
              const isSelected = configuration.connectivityPackage === pkg.id;
              
              return (
                <Card 
                  key={pkg.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 relative ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                      : 'bg-card border-border hover:bg-accent/20'
                  }`}
                  onClick={() => updateConfiguration({ connectivityPackage: pkg.id })}
                >
                  {pkg.popular && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                      Popular
                    </Badge>
                  )}
                  
                  <CardContent className="p-4">
                    <h4 className="text-lg font-bold text-foreground mb-2">{pkg.name}</h4>
                    <p className="text-muted-foreground mb-3 text-sm">{pkg.description}</p>
                    
                    <div className="text-xl font-bold text-primary mb-3">{pkg.price}</div>
                    
                    <div className="space-y-1">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
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
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Accessories
            </h3>
            <p className="text-muted-foreground">
              Complete your vehicle with our selection of premium accessories designed for convenience and style.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {accessories.map((accessory) => {
              const isSelected = configuration.accessories?.includes(accessory.id) || false;
              const IconComponent = accessory.icon;
              
              return (
                <Card 
                  key={accessory.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                      : 'bg-card border-border hover:bg-accent/20'
                  }`}
                  onClick={() => toggleAccessory(accessory.id)}
                >
                  <CardContent className="p-3 text-center">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
                      <IconComponent className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h4 className="text-xs font-medium text-foreground mb-1">{accessory.name}</h4>
                    <p className="text-primary text-xs font-medium">{accessory.price}</p>
                    
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
    </div>
  );
};

export default FeaturesConfiguration;
