import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, SceneLoader, Material, Mesh, SpotLight, Color3, AnimationGroup } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

export interface CameraPosition {
  alpha: number;
  beta: number;
  radius: number;
  target: Vector3;
}

export interface CarColor {
  name: string;
  material: Material | null;
  displayColor: string;
}

export class CarEngine {
  private engine: Engine;
  private scene: Scene;
  private camera: ArcRotateCamera;
  private canvas: HTMLCanvasElement;
  private carMeshes: Mesh[] = [];
  private animationGroups: AnimationGroup[] = [];
  private headlightLights: SpotLight[] = [];
  private availableColors: CarColor[] = [];
  private lightsOn: boolean = false;

  // Predefined camera positions
  private cameraPositions: Record<string, CameraPosition> = {
    outside: { alpha: Math.PI / 2, beta: Math.PI / 3, radius: 10, target: Vector3.Zero() },
    inside: { alpha: 0, beta: Math.PI / 2, radius: 2, target: new Vector3(0, 1, 0) },
    wheelView: { alpha: Math.PI, beta: Math.PI / 2.5, radius: 4, target: new Vector3(1.5, 0.5, 0) },
    doorView: { alpha: Math.PI / 4, beta: Math.PI / 2, radius: 3, target: new Vector3(-1, 0.5, 0) }
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
    
    // Setup camera
    this.camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 10, Vector3.Zero(), this.scene);
    this.camera.attachControl(canvas, true);

    // Setup lighting
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

    // Handle resize
    window.addEventListener("resize", () => this.engine.resize());
  }

  public async loadCarModel(modelPath: string): Promise<void> {
    try {
      await SceneLoader.AppendAsync("/models/cars/", modelPath, this.scene);
      
      // Stop all animations initially
      this.scene.animationGroups.forEach(group => group.stop());
      this.animationGroups = this.scene.animationGroups;

      // Find car colors and meshes
      this.setupCarColors();
      this.setupHeadlights();
      
      console.log("Car model loaded successfully");
    } catch (error) {
      console.error("Error loading car model:", error);
    }
  }

  private setupCarColors(): void {
    const desiredColors = [
      "Car_Red",
      "Car_White", 
      "Car_Pink",
      "Car_Grey",
      "Car_Blue",
      "Car_Black"
    ];

    // Filter materials that match desired colors
    const carMaterials = this.scene.materials.filter(mat => 
      desiredColors.includes(mat.name)
    );

    // Find meshes using the red material (default car color)
    const redMaterial = this.scene.getMaterialByName("Car_Red");
    if (redMaterial) {
      this.carMeshes = this.scene.meshes.filter(mesh => 
        mesh.material === redMaterial
      ) as Mesh[];
    }

    // Setup available colors
    this.availableColors = carMaterials.map(mat => ({
      name: mat.name.replace("Car_", ""),
      material: mat,
      displayColor: this.materialToColor(mat)
    }));
  }

  private setupHeadlights(): void {
    const headlightLeft = this.scene.getMeshByName("Headlight_L");
    const headlightRight = this.scene.getMeshByName("Headlight_R");

    if (headlightLeft && headlightRight) {
      const leftLight = new SpotLight("headlightLeft", Vector3.Zero(), new Vector3(0, 0, 1), Math.PI / 3, 2, this.scene);
      leftLight.parent = headlightLeft;
      leftLight.diffuse = new Color3(1, 1, 0.8);
      leftLight.intensity = 0;

      const rightLight = new SpotLight("headlightRight", Vector3.Zero(), new Vector3(0, 0, 1), Math.PI / 3, 2, this.scene);
      rightLight.parent = headlightRight;
      rightLight.diffuse = new Color3(1, 1, 0.8);
      rightLight.intensity = 0;

      this.headlightLights = [leftLight, rightLight];
    }
  }

  private materialToColor(material: Material): string {
    // Try to extract color from material
    const mat = material as any;
    if (mat.albedoColor) {
      const c = mat.albedoColor;
      const r = Math.round(c.r * 255);
      const g = Math.round(c.g * 255);
      const b = Math.round(c.b * 255);
      return `rgb(${r},${g},${b})`;
    }
    return "#888888";
  }

  public changeCarColor(colorName: string): void {
    const color = this.availableColors.find(c => c.name === colorName);
    if (color && color.material) {
      this.carMeshes.forEach(mesh => {
        mesh.material = color.material;
      });
    }
  }

  public setCameraPosition(positionName: string): void {
    const position = this.cameraPositions[positionName];
    if (position) {
      this.camera.alpha = position.alpha;
      this.camera.beta = position.beta;
      this.camera.radius = position.radius;
      this.camera.target = position.target;
    }
  }

  public toggleHeadlights(): void {
    this.lightsOn = !this.lightsOn;
    this.headlightLights.forEach(light => {
      light.intensity = this.lightsOn ? 3 : 0;
    });
  }

  public toggleMeshVisibility(meshName: string): boolean {
    const mesh = this.scene.getMeshByName(meshName);
    if (mesh) {
      const newState = !mesh.isEnabled();
      mesh.setEnabled(newState);
      return newState;
    }
    return false;
  }

  public openDoor(): void {
    const openAnim = this.animationGroups.find(group => 
      group.name === "doorFL_open_door_2"
    );
    const closeAnim = this.animationGroups.find(group => 
      group.name === "doorFL_close_door_2"
    );
    
    closeAnim?.stop();
    openAnim?.start(false);
  }

  public closeDoor(): void {
    const openAnim = this.animationGroups.find(group => 
      group.name === "doorFL_open_door_2"
    );
    const closeAnim = this.animationGroups.find(group => 
      group.name === "doorFL_close_door_2"
    );
    
    openAnim?.stop();
    closeAnim?.start(false);
  }

  public getAvailableColors(): CarColor[] {
    return this.availableColors;
  }

  public startRenderLoop(): void {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  public dispose(): void {
    this.engine.dispose();
  }
}