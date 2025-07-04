
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Car, Truck } from "lucide-react";

interface VehicleModelsProps {
  onModelSelect: (modelId: string) => void;
}

const VehicleModels = ({ onModelSelect }: VehicleModelsProps) => {
  const models = [
    {
      id: "ceer-s1",
      name: "CEER S1",
      type: "Sedan",
      description: "Luxury electric sedan with advanced autonomous features",
      price: "Starting at $85,000",
      features: ["500km Range", "0-100 in 3.2s", "Level 4 Autonomous"],
      gradient: "from-blue-600 to-purple-600",
      icon: Car,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    },
    {
      id: "ceer-x1",
      name: "CEER X1",
      type: "SUV",
      description: "Premium electric SUV designed for families and adventure",
      price: "Starting at $95,000",
      features: ["600km Range", "7-Seat Capacity", "Off-Road Capable"],
      gradient: "from-emerald-600 to-teal-600",
      icon: Truck,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    },
    {
      id: "ceer-r1",
      name: "CEER R1",
      type: "Sport",
      description: "High-performance electric sports car with track capabilities",
      price: "Starting at $125,000",
      features: ["450km Range", "0-100 in 2.8s", "Track Mode"],
      gradient: "from-red-600 to-orange-600",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=800&h=600&fit=crop",
    },
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Choose Your Model
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select from our range of premium electric vehicles, each designed to deliver 
            uncompromising performance and luxury.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {models.map((model) => {
            const IconComponent = model.icon;
            return (
              <Card 
                key={model.id}
                className="group bg-card border-border backdrop-blur-sm hover:bg-accent/20 transition-all duration-500 hover:scale-[1.02] overflow-hidden shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={model.image} 
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${model.gradient} opacity-10`} />
                  <Badge className={`absolute top-4 left-4 bg-primary text-primary-foreground border-none`}>
                    {model.type}
                  </Badge>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-primary rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{model.name}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {model.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {model.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground">{model.price}</span>
                    <Button 
                      onClick={() => onModelSelect(model.id)}
                      className={`bg-primary hover:bg-primary/90 text-primary-foreground group`}
                    >
                      Configure
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VehicleModels;
