
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
    <div className="space-y-12">
      {/* Paint Colors */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Exterior Color
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect color to express your style. Each color is carefully crafted 
            to enhance the vehicle's distinctive design.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {paintColors.map((color) => {
            const isSelected = configuration.exteriorColor === color.id;
            
            return (
              <Card 
                key={color.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-400' 
                    : 'bg-white/5 border-gray-700 hover:bg-white/10'
                }`}
                onClick={() => updateConfiguration({ exteriorColor: color.id })}
              >
                <CardContent className="p-4 text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-gray-600"
                    style={{ backgroundColor: color.hex }}
                  />
                  <h4 className="text-sm font-medium text-white mb-1">{color.name}</h4>
                  <p className="text-xs text-blue-400">{color.price}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Accent Colors */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Accent Details
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            Add distinctive touches with accent colors for trim elements and mirror caps.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {accentColors.map((color) => {
            const isSelected = configuration.accentColor === color.id;
            
            return (
              <Card 
                key={color.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-400' 
                    : 'bg-white/5 border-gray-700 hover:bg-white/10'
                }`}
                onClick={() => updateConfiguration({ accentColor: color.id })}
              >
                <CardContent className="p-4 text-center">
                  <div 
                    className="w-12 h-12 rounded-lg mx-auto mb-3 border-2 border-gray-600"
                    style={{ backgroundColor: color.hex }}
                  />
                  <h4 className="text-sm font-medium text-white">{color.name}</h4>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Caliper Colors */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Brake Calipers
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            Make a statement with colored brake calipers that complement your vehicle's style.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {caliperColors.map((color) => {
            const isSelected = configuration.caliperColor === color.id;
            
            return (
              <Card 
                key={color.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-400' 
                    : 'bg-white/5 border-gray-700 hover:bg-white/10'
                }`}
                onClick={() => updateConfiguration({ caliperColor: color.id })}
              >
                <CardContent className="p-4 text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-3 border-2 border-gray-600"
                    style={{ backgroundColor: color.hex }}
                  />
                  <h4 className="text-sm font-medium text-white mb-1">{color.name}</h4>
                  <p className="text-xs text-blue-400">{color.price}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExteriorConfiguration;
