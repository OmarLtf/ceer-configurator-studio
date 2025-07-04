import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfigurationState } from "@/components/ConfigurationWizard";
import { Download, Share2, Save, ShoppingCart, Eye } from "lucide-react";

interface ConfigurationSummaryProps {
  configuration: ConfigurationState;
  updateConfiguration: (updates: Partial<ConfigurationState>) => void;
  modelId: string;
}

const ConfigurationSummary = ({ configuration, modelId }: ConfigurationSummaryProps) => {
  // Mock pricing logic
  const calculatePricing = () => {
    let basePrice = 85000; // Base price for the model
    let totalAddons = 0;

    // Trim pricing
    const trimPrices = { standard: 0, premium: 15000, sport: 25000, executive: 40000 };
    totalAddons += trimPrices[configuration.trim as keyof typeof trimPrices] || 0;

    // Driveline pricing
    const drivelinePrices = { rwd: 0, awd: 8000, performance: 20000 };
    totalAddons += drivelinePrices[configuration.driveline as keyof typeof drivelinePrices] || 0;

    // Paint and options
    if (configuration.exteriorColor === 'blue' || configuration.exteriorColor === 'red') totalAddons += 2000;
    if (configuration.exteriorColor === 'silver' || configuration.exteriorColor === 'gray') totalAddons += 1500;
    if (configuration.caliperColor !== 'black') totalAddons += 500;

    // Interior materials
    const materialPrices = { fabric: 0, leather: 3000, vegan: 2000, alcantara: 4000 };
    totalAddons += materialPrices[configuration.interiorMaterial as keyof typeof materialPrices] || 0;

    // Features (simplified)
    totalAddons += (configuration.features?.length || 0) * 2000;

    return {
      basePrice,
      addons: totalAddons,
      total: basePrice + totalAddons
    };
  };

  const pricing = calculatePricing();
  
  const getDisplayName = (key: string, value: string) => {
    const displayNames: Record<string, Record<string, string>> = {
      trim: { standard: "Standard", premium: "Premium", sport: "Sport", executive: "Executive" },
      driveline: { rwd: "Rear-Wheel Drive", awd: "All-Wheel Drive", performance: "Performance Variant" },
      exteriorColor: { white: "Arctic White", black: "Midnight Black", silver: "Metallic Silver", blue: "Electric Blue", red: "Crimson Red", gray: "Storm Gray" },
      interiorMaterial: { fabric: "Premium Fabric", leather: "Nappa Leather", vegan: "Vegan Leather", alcantara: "Alcantara" },
      interiorTheme: { light: "Light Theme", dark: "Dark Theme", "two-tone": "Two-Tone", sport: "Sport Theme" },
      connectivityPackage: { basic: "Basic Connectivity", premium: "Premium Connectivity", enterprise: "Enterprise Package" }
    };
    
    return displayNames[key]?.[value] || value;
  };

  return (
    <div className="grid lg:grid-cols-5 gap-8 h-full">
      {/* 3D Car Showcase - Larger */}
      <div className="lg:col-span-3 bg-card rounded-lg border border-border p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
            <div className="text-primary-foreground text-4xl font-bold">3D</div>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-4">Final Configuration</h3>
          <p className="text-muted-foreground text-lg">
            Complete 3D visualization of your configured vehicle with all selected options.
          </p>
          <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Eye className="w-4 h-4 mr-2" />
            360° View
          </Button>
        </div>
      </div>

      {/* Summary Panel - Smaller and Scrollable */}
      <div className="lg:col-span-2 space-y-6 overflow-y-auto max-h-screen pr-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Configuration Summary
          </h2>
          <p className="text-muted-foreground">
            Review your perfect vehicle configuration. Your selections have been carefully crafted 
            to create a unique driving experience tailored to your preferences.
          </p>
        </div>

        {/* Vehicle Overview */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{modelId.toUpperCase()}</h3>
                <Badge className="bg-primary text-primary-foreground">
                  {getDisplayName('trim', configuration.trim)}
                </Badge>
              </div>
            </div>
            
            {/* Configuration Details */}
            <div className="grid gap-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Exterior</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paint Color</span>
                    <span className="text-foreground">{getDisplayName('exteriorColor', configuration.exteriorColor)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accent Color</span>
                    <span className="text-foreground">{configuration.accentColor || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Caliper Color</span>
                    <span className="text-foreground">{configuration.caliperColor || 'Not selected'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Interior</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material</span>
                    <span className="text-foreground">{getDisplayName('interiorMaterial', configuration.interiorMaterial)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dashboard</span>
                    <span className="text-foreground">{configuration.dashboardFinish || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Theme</span>
                    <span className="text-foreground">{getDisplayName('interiorTheme', configuration.interiorTheme)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Summary */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-foreground mb-4">Selected Features & Options</h4>
            <div className="grid gap-4">
              <div>
                <h5 className="text-foreground font-medium mb-2">Performance & Features</h5>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Driveline: {getDisplayName('driveline', configuration.driveline)}</div>
                  {configuration.features?.length > 0 && (
                    <div className="text-sm text-muted-foreground">{configuration.features.length} Advanced Features</div>
                  )}
                  {configuration.connectivityPackage && (
                    <div className="text-sm text-muted-foreground">
                      Connectivity: {getDisplayName('connectivityPackage', configuration.connectivityPackage)}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-foreground font-medium mb-2">Accessories</h5>
                <div className="space-y-1">
                  {configuration.accessories?.length > 0 ? (
                    <div className="text-sm text-muted-foreground">{configuration.accessories.length} Accessories Selected</div>
                  ) : (
                    <div className="text-sm text-muted-foreground">No accessories selected</div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Summary */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-foreground mb-4">Pricing Summary</h4>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Price</span>
                <span className="text-foreground">${pricing.basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Options & Features</span>
                <span className="text-foreground">+${pricing.addons.toLocaleString()}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total Price</span>
                  <span className="text-primary">${pricing.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground mb-4">
              *Prices exclude taxes, fees, and delivery charges
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Reserve Now
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="border-border text-muted-foreground hover:bg-accent">
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" className="border-border text-muted-foreground hover:bg-accent">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
              
              <Button variant="outline" className="w-full border-border text-muted-foreground hover:bg-accent">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-foreground mb-4">Delivery Information</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span className="text-foreground">12-16 weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Production Location</span>
                <span className="text-foreground">Saudi Arabia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Configuration ID</span>
                <span className="text-primary text-sm font-mono">CEER-{Date.now().toString().slice(-6)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfigurationSummary;