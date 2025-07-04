import { useRef, useEffect, useState } from 'react';
import { CarEngine, CarColor } from './CarEngine';

export interface CarEngineHook {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  carEngine: CarEngine | null;
  availableColors: CarColor[];
  isLoading: boolean;
  error: string | null;
  changeCarColor: (colorName: string) => void;
  setCameraPosition: (position: string) => void;
  toggleHeadlights: () => void;
  toggleShade: () => boolean;
  openDoor: () => void;
  closeDoor: () => void;
}

export const useCarEngine = (modelPath?: string): CarEngineHook => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const carEngineRef = useRef<CarEngine | null>(null);
  const [availableColors, setAvailableColors] = useState<CarColor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize car engine
    const engine = new CarEngine(canvasRef.current);
    carEngineRef.current = engine;

    // Start render loop
    engine.startRenderLoop();

    // Load model if provided
    if (modelPath) {
      loadModel(modelPath);
    }

    return () => {
      engine.dispose();
    };
  }, []);

  const loadModel = async (path: string) => {
    if (!carEngineRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      await carEngineRef.current.loadCarModel(path);
      setAvailableColors(carEngineRef.current.getAvailableColors());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load model');
    } finally {
      setIsLoading(false);
    }
  };

  const changeCarColor = (colorName: string) => {
    carEngineRef.current?.changeCarColor(colorName);
  };

  const setCameraPosition = (position: string) => {
    carEngineRef.current?.setCameraPosition(position);
  };

  const toggleHeadlights = () => {
    carEngineRef.current?.toggleHeadlights();
  };

  const toggleShade = (): boolean => {
    return carEngineRef.current?.toggleMeshVisibility("Shade") || false;
  };

  const openDoor = () => {
    carEngineRef.current?.openDoor();
  };

  const closeDoor = () => {
    carEngineRef.current?.closeDoor();
  };

  return {
    canvasRef,
    carEngine: carEngineRef.current,
    availableColors,
    isLoading,
    error,
    changeCarColor,
    setCameraPosition,
    toggleHeadlights,
    toggleShade,
    openDoor,
    closeDoor
  };
};