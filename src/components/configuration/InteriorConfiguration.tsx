
import { Card, CardContent } from "@/components/ui/card";
import { ConfigurationState } from "@/components/ConfigurationWizard";

interface InteriorConfigurationProps {
  configuration: ConfigurationState;
  updateConfiguration: (updates: Partial<ConfigurationState>) => void;
  modelId: string;
}

const InteriorConfiguration = ({ configuration, updateConfiguration }: InteriorConfigurationProps) => {
  const materials = [
    { id: "fabric", name: "Premium Fabric", description: "Sustainable and comfortable", price: "Included", texture: "linear-gradient(45deg, #6B7280 25%, transparent 25%)" },
    { id: "leather", name: "Nappa Leather", description: "Luxurious full-grain leather", price: "+$3,000", texture: "linear-gradient(90deg, #8B4513 0%, #A0522D 100%)" },
    { id: "vegan", name: "Vegan Leather", description: "Eco-friendly alternative", price: "+$2,000", texture: "linear-gradient(45deg, #2D3748 0%, #4A5568 100%)" },
    { id: "alcantara", name: "Alcantara", description: "Sport-inspired suede-like material", price: "+$4,000", texture: "linear-gradient(0deg, #1A202C 0%, #2D3748 100%)" },
  ];

  const dashboardFinishes = [
    { id: "matte", name: "Matte Black", description: "Modern minimalist finish", color: "#2D3748" },
    { id: "gloss", name: "Piano Black", description: "High-gloss premium finish", color: "#000000" },
    { id: "carbon", name: "Carbon Fiber", description: "Lightweight performance material", color: "#1A1A1A" },
    { id: "wood", name: "Walnut Wood", description: "Natural wood veneer", color: "#8B4513" },
    { id: "aluminum", name: "Brushed Aluminum", description: "Metallic sport finish", color: "#A8A8A8" },
  ];

  const colorThemes = [
    { id: "light", name: "Light Theme", primary: "#F7FAFC", secondary: "#EDF2F7", description: "Clean and airy" },
    { id: "dark", name: "Dark Theme", primary: "#1A202C", secondary: "#2D3748", description: "Sophisticated and bold" },
    { id: "two-tone", name: "Two-Tone", primary: "#2D3748", secondary: "#E2E8F0", description: "Classic contrast" },
    { id: "sport", name: "Sport Theme", primary: "#1A202C", secondary: "#E53E3E", description: "Performance-inspired" },
  ];

  return (
    <div className="space-y-12">
      {/* Interior Materials */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interior Materials
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our selection of premium materials, each offering unique textures 
            and comfort levels for the ultimate driving experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material) => {
            const isSelected = configuration.interiorMaterial === material.id;
            
            return (
              <Card 
                key={material.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-400' 
                    : 'bg-white/5 border-gray-700 hover:bg-white/10'
                }`}
                onClick={() => updateConfiguration({ interiorMaterial: material.id })}
              >
                <CardContent className="p-6">
                  <div 
                    className="w-full h-24 rounded-lg mb-4 border border-gray-600"
                    style={{ background: material.texture }}
                  />
                  <h4 className="text-lg font-semibold text-white mb-2">{material.name}</h4>
                  <p className="text-gray-400 text-sm mb-3">{material.description}</p>
                  <div className="text-blue-400 font-medium">{material.price}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Dashboard Finishes */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Dashboard Finish
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            Select the dashboard finish that complements your interior style and personal taste.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {dashboardFinishes.map((finish) => {
            const isSelected = configuration.dashboardFinish === finish.id;
            
            return (
              <Card 
                key={finish.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-400' 
                    : 'bg-white/5 border-gray-700 hover:bg-white/10'
                }`}
                onClick={() => updateConfiguration({ dashboardFinish: finish.id })}
              >
                <CardContent className="p-4 text-center">
                  <div 
                    className="w-16 h-16 rounded-lg mx-auto mb-3 border border-gray-600"
                    style={{ backgroundColor: finish.color }}
                  />
                  <h4 className="text-sm font-medium text-white mb-1">{finish.name}</h4>
                  <p className="text-xs text-gray-400">{finish.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Color Themes */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Interior Color Theme
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            Choose a color theme that sets the mood and atmosphere of your cabin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {colorThemes.map((theme) => {
            const isSelected = configuration.interiorTheme === theme.id;
            
            return (
              <Card 
                key={theme.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-2 ring-blue-400 bg-blue-500/10 border-blue-400' 
                    : 'bg-white/5 border-gray-700 hover:bg-white/10'
                }`}
                onClick={() => updateConfiguration({ interiorTheme: theme.id })}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex gap-2 justify-center mb-4">
                    <div 
                      className="w-8 h-8 rounded-full border border-gray-600"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div 
                      className="w-8 h-8 rounded-full border border-gray-600"
                      style={{ backgroundColor: theme.secondary }}
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{theme.name}</h4>
                  <p className="text-gray-400 text-sm">{theme.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InteriorConfiguration;
