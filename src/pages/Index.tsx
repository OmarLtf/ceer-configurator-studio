
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, Cpu } from "lucide-react";
import VehicleModels from "@/components/VehicleModels";
import ConfigurationWizard from "@/components/ConfigurationWizard";

const Index = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showConfigurator, setShowConfigurator] = useState(false);

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setShowConfigurator(true);
  };

  const handleBackToModels = () => {
    setShowConfigurator(false);
    setSelectedModel(null);
  };

  if (showConfigurator && selectedModel) {
    return (
      <ConfigurationWizard
        modelId={selectedModel}
        onBack={handleBackToModels}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              CEER
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-8">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Models</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Technology</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
              </nav>
              <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black">
                عربي
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-6 border-blue-400 text-blue-400 px-4 py-2">
            Configure Your Perfect Vehicle
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Design Your
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Dream Ceer
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of automotive customization. Build your perfect vehicle with our advanced configurator, 
            featuring real-time 3D visualization and unlimited personalization options.
          </p>
          
          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <Card className="bg-white/5 border-gray-700 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Real-time Visualization</h3>
                <p className="text-gray-400 text-sm">See your changes instantly with our advanced 3D rendering technology</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-gray-700 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Premium Quality</h3>
                <p className="text-gray-400 text-sm">Crafted with the finest materials and cutting-edge technology</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-gray-700 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Technology</h3>
                <p className="text-gray-400 text-sm">Advanced AI and connectivity features for the modern driver</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vehicle Models Section */}
      <VehicleModels onModelSelect={handleModelSelect} />

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              CEER
            </div>
            <p className="text-gray-400 mb-6">Redefining the future of mobility</p>
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
