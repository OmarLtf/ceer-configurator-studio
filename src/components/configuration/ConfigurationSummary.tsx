
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
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Configuration Summary
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Review your perfect vehicle configuration. Your selections have been carefully crafted 
          to create a unique driving experience tailored to your preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Vehicle Preview */}
        <div className="lg:col-span-2">
          <Card className="bg-white/5 border-gray-700 mb-6">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{modelId.toUpperCase()}</h3>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {getDisplayName('trim', configuration.trim)}
                  </Badge>
                </div>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  <Eye className="w-4 h-4 mr-2" />
                  3D View
                </Button>
              </div>
              
              {/* Mock 3D viewer placeholder */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-400">3D Vehicle Viewer</p>
                  <p className="text-gray-500 text-sm">Interactive visualization coming soon</p>
                </div>
              </div>

              {/* Configuration Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Exterior</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Paint Color</span>
                      <span className="text-white">{getDisplayName('exteriorColor', configuration.exteriorColor)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Accent Color</span>
                      <span className="text-white">{configuration.accentColor || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Caliper Color</span>
                      <span className="text-white">{configuration.caliperColor || 'Not selected'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Interior</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Material</span>
                      <span className="text-white">{getDisplayName('interiorMaterial', configuration.interiorMaterial)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dashboard</span>
                      <span className="text-white">{configuration.dashboardFinish || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Theme</span>
                      <span className="text-white">{getDisplayName('interiorTheme', configuration.interiorTheme)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Summary */}
          <Card className="bg-white/5 border-gray-700">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Selected Features & Options</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-medium mb-2">Performance & Features</h5>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Driveline: {getDisplayName('driveline', configuration.driveline)}</div>
                    {configuration.features?.length > 0 && (
                      <div className="text-sm text-gray-400">{configuration.features.length} Advanced Features</div>
                    )}
                    {configuration.connectivityPackage && (
                      <div className="text-sm text-gray-400">
                        Connectivity: {getDisplayName('connectivityPackage', configuration.connectivityPackage)}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-2">Accessories</h5>
                  <div className="space-y-1">
                    {configuration.accessories?.length > 0 ? (
                      <div className="text-sm text-gray-400">{configuration.accessories.length} Accessories Selected</div>
                    ) : (
                      <div className="text-sm text-gray-400">No accessories selected</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing and Actions */}
        <div className="space-y-6">
          <Card className="bg-white/5 border-gray-700">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Pricing Summary</h4>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Price</span>
                  <span className="text-white">${pricing.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Options & Features</span>
                  <span className="text-white">+${pricing.addons.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">Total Price</span>
                    <span className="text-blue-400">${pricing.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                *Prices exclude taxes, fees, and delivery charges
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Reserve Now
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
                
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card className="bg-white/5 border-gray-700">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Delivery Information</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Delivery</span>
                  <span className="text-white">12-16 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Production Location</span>
                  <span className="text-white">Saudi Arabia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Configuration ID</span>
                  <span className="text-blue-400 text-sm font-mono">CEER-{Date.now().toString().slice(-6)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationSummary;
