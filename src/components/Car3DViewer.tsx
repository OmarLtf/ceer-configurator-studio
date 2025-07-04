import React from 'react';
import { useCarEngine } from '@/car_engine/useCarEngine';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Camera, Lightbulb, DoorOpen, DoorClosed } from 'lucide-react';

interface Car3DViewerProps {
  modelPath?: string;
  className?: string;
  showControls?: boolean;
  onColorChange?: (colorName: string) => void;
}

const Car3DViewer: React.FC<Car3DViewerProps> = ({ 
  modelPath, 
  className = "", 
  showControls = false,
  onColorChange 
}) => {
  console.log("Car3DViewer - modelPath:", modelPath);
  
  const {
    canvasRef,
    availableColors,
    isLoading,
    error,
    changeCarColor,
    setCameraPosition,
    toggleHeadlights,
    toggleShade,
    openDoor,
    closeDoor
  } = useCarEngine(modelPath);

  const handleColorChange = (colorName: string) => {
    changeCarColor(colorName);
    onColorChange?.(colorName);
  };

  if (error) {
    return (
      <Card className={`bg-card border-border ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="text-destructive text-lg font-semibold mb-2">
            Failed to Load 3D Model
          </div>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-card border-border ${className}`}>
      <CardContent className="p-0 relative">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full min-h-[400px] rounded-lg"
          style={{ display: 'block' }}
        />
        
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
                <div className="text-primary-foreground text-xl font-bold">3D</div>
              </div>
              <p className="text-muted-foreground">Loading 3D model...</p>
            </div>
          </div>
        )}

        {!modelPath && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
                <div className="text-primary-foreground text-4xl font-bold">3D</div>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">3D Vehicle Showcase</h3>
              <p className="text-muted-foreground text-lg">
                Interactive 3D model will be displayed here showing your configuration in real-time.
              </p>
            </div>
          </div>
        )}

        {/* Camera controls overlay */}
        {showControls && modelPath && !isLoading && (
          <div className="absolute top-4 right-4 space-y-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-card/90 backdrop-blur-sm border-border"
              onClick={() => setCameraPosition('outside')}
            >
              <Camera className="w-3 h-3 mr-1" />
              Outside
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-card/90 backdrop-blur-sm border-border"
              onClick={() => setCameraPosition('inside')}
            >
              <Eye className="w-3 h-3 mr-1" />
              Inside
            </Button>
          </div>
        )}

        {/* Action controls overlay */}
        {showControls && modelPath && !isLoading && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-card/90 backdrop-blur-sm border-border"
              onClick={toggleHeadlights}
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              Lights
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-card/90 backdrop-blur-sm border-border"
              onClick={openDoor}
            >
              <DoorOpen className="w-3 h-3 mr-1" />
              Open
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-card/90 backdrop-blur-sm border-border"
              onClick={closeDoor}
            >
              <DoorClosed className="w-3 h-3 mr-1" />
              Close
            </Button>
          </div>
        )}

        {/* Available colors indicator */}
        {availableColors.length > 0 && (
          <div className="absolute top-4 left-4">
            <Badge variant="outline" className="bg-card/90 backdrop-blur-sm border-border">
              {availableColors.length} Colors Available
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Car3DViewer;