
import { Card, CardContent } from "@/components/ui/card";
import { ConfigurationState } from "@/components/ConfigurationWizard";

interface ExteriorConfigurationProps {
  configuration: ConfigurationState;
  updateConfiguration: (updates: Partial<ConfigurationState>) => void;
  modelId: string;
}

const ExteriorConfiguration = ({ configuration, updateConfiguration }: ExteriorConfigurationProps) => {
  const paintColors = [
    { id: "white", name: "Arctic White", hex: "#FFFFFF", price: "Included" },
    { id: "black", name: "Midnight Black", hex: "#000000", price: "Included" },
    { id: "silver", name: "Metallic Silver", hex: "#C0C0C0", price: "+$1,500" },
    { id: "blue", name: "Electric Blue", hex: "#1E40AF", price: "+$2,000" },
    { id: "red", name: "Crimson Red", hex: "#DC2626", price: "+$2,000" },
    { id: "gray", name: "Storm Gray", hex: "#6B7280", price: "+$1,500" },
  ];

  const accentColors = [
    { id: "black", name: "Black", hex: "#000000" },
    { id: "silver", name: "Silver", hex: "#C0C0C0" },
    { id: "carbon", name: "Carbon Fiber", hex: "#2D2D2D" },
    { id: "chrome", name: "Chrome", hex: "#E5E7EB" },
  ];

  const caliperColors = [
    { id: "black", name: "Black", hex: "#000000", price: "Included" },
    { id: "red", name: "Red", hex: "#DC2626", price: "+$500" },
    { id: "blue", name: "Blue", hex: "#2563EB", price: "+$500" },
    { id: "yellow", name: "Yellow", hex: "#EAB308", price: "+$500" },
  ];

  return (
    <div className="grid lg:grid-cols-5 gap-8 h-full">
      {/* 3D Car Showcase - Larger */}
      <div className="lg:col-span-3 bg-card rounded-lg border border-border p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
            <div className="text-primary-foreground text-4xl font-bold">3D</div>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-4">3D Vehicle Showcase</h3>
          <p className="text-muted-foreground text-lg">
            Interactive 3D model will be displayed here showing your exterior color selections in real-time.
          </p>
        </div>
      </div>

      {/* Options Panel - Smaller and Scrollable */}
      <div className="lg:col-span-2 space-y-6 overflow-y-auto max-h-screen pr-4">
        {/* Paint Colors */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Exterior Color
            </h2>
            <p className="text-muted-foreground">
              Choose the perfect color to express your style. Each color is carefully crafted 
              to enhance the vehicle's distinctive design.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {paintColors.map((color) => {
              const isSelected = configuration.exteriorColor === color.id;
              
              return (
                <Card 
                  key={color.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                      : 'bg-card border-border hover:bg-accent/20'
                  }`}
                  onClick={() => updateConfiguration({ exteriorColor: color.id })}
                >
                  <CardContent className="p-3 text-center">
                    <div 
                      className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                    <h4 className="text-xs font-medium text-foreground mb-1">{color.name}</h4>
                    <p className="text-xs text-primary">{color.price}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Accent Colors */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Accent Details
            </h3>
            <p className="text-muted-foreground">
              Add distinctive touches with accent colors for trim elements and mirror caps.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {accentColors.map((color) => {
              const isSelected = configuration.accentColor === color.id;
              
              return (
                <Card 
                  key={color.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                      : 'bg-card border-border hover:bg-accent/20'
                  }`}
                  onClick={() => updateConfiguration({ accentColor: color.id })}
                >
                  <CardContent className="p-3 text-center">
                    <div 
                      className="w-10 h-10 rounded-lg mx-auto mb-2 border-2 border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                    <h4 className="text-xs font-medium text-foreground">{color.name}</h4>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Caliper Colors */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Brake Calipers
            </h3>
            <p className="text-muted-foreground">
              Make a statement with colored brake calipers that complement your vehicle's style.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {caliperColors.map((color) => {
              const isSelected = configuration.caliperColor === color.id;
              
              return (
                <Card 
                  key={color.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                      : 'bg-card border-border hover:bg-accent/20'
                  }`}
                  onClick={() => updateConfiguration({ caliperColor: color.id })}
                >
                  <CardContent className="p-3 text-center">
                    <div 
                      className="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                    <h4 className="text-xs font-medium text-foreground mb-1">{color.name}</h4>
                    <p className="text-xs text-primary">{color.price}</p>
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

export default ExteriorConfiguration;
