
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
    <div className="grid lg:grid-cols-5 gap-8 h-full">
      {/* 3D Car Showcase - Larger */}
      <div className="lg:col-span-3 bg-card rounded-lg border border-border p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
            <div className="text-primary-foreground text-4xl font-bold">3D</div>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-4">Interior Showcase</h3>
          <p className="text-muted-foreground text-lg">
            Interactive 3D interior view showing your material and theme selections in real-time.
          </p>
        </div>
      </div>

      {/* Options Panel - Smaller and Scrollable */}
      <div className="lg:col-span-2 space-y-6 overflow-y-auto max-h-screen pr-4">
        {/* Interior Materials */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Interior Materials
            </h2>
            <p className="text-muted-foreground">
              Select premium materials that define your cabin's comfort and luxury. 
              Each option is meticulously crafted for both aesthetics and durability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {materials.map((material) => {
              const isSelected = configuration.interiorMaterial === material.id;
              
              return (
                <Card 
                  key={material.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                      : 'bg-card border-border hover:bg-accent/20'
                  }`}
                  onClick={() => updateConfiguration({ interiorMaterial: material.id })}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-muted to-accent rounded-lg mb-4" />
                    <h4 className="text-lg font-semibold text-foreground mb-2">{material.name}</h4>
                    <p className="text-muted-foreground text-sm mb-3">{material.description}</p>
                    <div className="text-primary font-medium">{material.price}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Dashboard Finishes */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Dashboard Finish
            </h3>
            <p className="text-muted-foreground">
              Choose the perfect dashboard finish to complement your interior style.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {dashboardFinishes.map((finish) => {
              const isSelected = configuration.dashboardFinish === finish.id;
              
              return (
                <Card 
                  key={finish.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                      : 'bg-card border-border hover:bg-accent/20'
                  }`}
                  onClick={() => updateConfiguration({ dashboardFinish: finish.id })}
                >
                  <CardContent className="p-3 text-center">
                    <div className="w-16 h-16 rounded-lg mx-auto mb-3 border-2 border-border bg-gradient-to-br from-muted to-accent" />
                    <h4 className="text-sm font-medium text-foreground mb-1">{finish.name}</h4>
                    <p className="text-xs text-muted-foreground">{finish.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Interior Themes */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Interior Theme
            </h3>
            <p className="text-muted-foreground">
              Select a cohesive color theme that reflects your personal style and preference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {colorThemes.map((theme) => {
              const isSelected = configuration.interiorTheme === theme.id;
              
              return (
                <Card 
                  key={theme.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                      : 'bg-card border-border hover:bg-accent/20'
                  }`}
                  onClick={() => updateConfiguration({ interiorTheme: theme.id })}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-2 mb-4">
                      <div 
                        className="flex-1 h-8 rounded border-2 border-border"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div 
                        className="flex-1 h-8 rounded border-2 border-border"
                        style={{ backgroundColor: theme.secondary }}
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{theme.name}</h4>
                    <p className="text-muted-foreground text-sm">{theme.description}</p>
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

export default InteriorConfiguration;
