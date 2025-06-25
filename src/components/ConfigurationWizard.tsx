
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TrimSelection from "@/components/configuration/TrimSelection";
import ExteriorConfiguration from "@/components/configuration/ExteriorConfiguration";
import InteriorConfiguration from "@/components/configuration/InteriorConfiguration";
import FeaturesConfiguration from "@/components/configuration/FeaturesConfiguration";
import ConfigurationSummary from "@/components/configuration/ConfigurationSummary";

interface ConfigurationWizardProps {
  modelId: string;
  onBack: () => void;
}

export interface ConfigurationState {
  trim: string;
  driveline: string;
  exteriorColor: string;
  accentColor: string;
  caliperColor: string;
  interiorMaterial: string;
  dashboardFinish: string;
  interiorTheme: string;
  features: string[];
  connectivityPackage: string;
  accessories: string[];
}

const ConfigurationWizard = ({ modelId, onBack }: ConfigurationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [configuration, setConfiguration] = useState<ConfigurationState>({
    trim: "",
    driveline: "",
    exteriorColor: "",
    accentColor: "",
    caliperColor: "",
    interiorMaterial: "",
    dashboardFinish: "",
    interiorTheme: "",
    features: [],
    connectivityPackage: "",
    accessories: [],
  });

  const steps = [
    { name: "Trim", component: TrimSelection },
    { name: "Exterior", component: ExteriorConfiguration },
    { name: "Interior", component: InteriorConfiguration },
    { name: "Features", component: FeaturesConfiguration },
    { name: "Summary", component: ConfigurationSummary },
  ];

  const updateConfiguration = (updates: Partial<ConfigurationState>) => {
    setConfiguration(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Models
              </Button>
              <div className="h-6 w-px bg-gray-700" />
              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                CEER
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </div>
              <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black text-sm">
                عربي
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-gray-300">Configuration Progress</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div 
                key={step.name}
                className={`flex flex-col items-center cursor-pointer transition-colors ${
                  index <= currentStep ? 'text-blue-400' : 'text-gray-500'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium mb-2 transition-colors ${
                  index < currentStep 
                    ? 'bg-blue-400 border-blue-400 text-black' 
                    : index === currentStep
                    ? 'border-blue-400 text-blue-400'
                    : 'border-gray-500 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <span className="text-xs hidden sm:block">{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <CurrentStepComponent 
          configuration={configuration}
          updateConfiguration={updateConfiguration}
          modelId={modelId}
        />
      </main>

      {/* Navigation Footer */}
      <footer className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-white">
                {steps[currentStep].name}
              </div>
              <div className="text-sm text-gray-400">
                Configuring {modelId.toUpperCase()}
              </div>
            </div>
            
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConfigurationWizard;
