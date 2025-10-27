import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Create hostel buildings
    const buildings: THREE.Mesh[] = [];
    
    // Building 1 - Main hostel
    const building1Geo = new THREE.BoxGeometry(3, 4, 2);
    const building1Mat = new THREE.MeshPhongMaterial({ 
      color: 0x8b5cf6,
      shininess: 30 
    });
    const building1 = new THREE.Mesh(building1Geo, building1Mat);
    building1.position.set(-4, 0, 0);
    scene.add(building1);
    buildings.push(building1);

    // Building 2 - Side hostel
    const building2Geo = new THREE.BoxGeometry(2, 3, 2);
    const building2Mat = new THREE.MeshPhongMaterial({ 
      color: 0x6366f1,
      shininess: 30 
    });
    const building2 = new THREE.Mesh(building2Geo, building2Mat);
    building2.position.set(3, -0.5, -1);
    scene.add(building2);
    buildings.push(building2);

    // Building 3 - Back hostel
    const building3Geo = new THREE.BoxGeometry(2.5, 3.5, 1.5);
    const building3Mat = new THREE.MeshPhongMaterial({ 
      color: 0x4f46e5,
      shininess: 30 
    });
    const building3 = new THREE.Mesh(building3Geo, building3Mat);
    building3.position.set(0, -0.25, -3);
    scene.add(building3);
    buildings.push(building3);

    // Add windows to buildings
    const windowGeo = new THREE.BoxGeometry(0.3, 0.4, 0.1);
    const windowMat = new THREE.MeshPhongMaterial({ 
      color: 0xfbbf24,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.5 
    });

    // Windows for building 1
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        const window1 = new THREE.Mesh(windowGeo, windowMat);
        window1.position.set(-4 + (i - 1) * 0.8, -0.5 + j * 0.9, 1.1);
        scene.add(window1);
      }
    }

    // Add student figures (simplified as cylinders with spheres)
    const createStudent = (x: number, y: number, z: number, color: number) => {
      const bodyGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 8);
      const bodyMat = new THREE.MeshPhongMaterial({ color });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.set(x, y, z);

      const headGeo = new THREE.SphereGeometry(0.25, 8, 8);
      const headMat = new THREE.MeshPhongMaterial({ color: 0xffdbac });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.set(x, y + 0.65, z);

      scene.add(body);
      scene.add(head);

      return { body, head };
    };

    // Add student figures
    createStudent(-2, -1.5, 2, 0x3b82f6); // Boy in blue
    createStudent(1, -1.5, 2, 0xec4899); // Girl in pink
    createStudent(-0.5, -1.5, 2.5, 0x10b981); // Boy in green
    createStudent(2.5, -1.5, 1, 0xf59e0b); // Girl in yellow

    // Add decorative elements - trees
    const createTree = (x: number, z: number) => {
      const trunkGeo = new THREE.CylinderGeometry(0.1, 0.15, 0.8, 6);
      const trunkMat = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(x, -1.2, z);

      const foliageGeo = new THREE.SphereGeometry(0.5, 8, 8);
      const foliageMat = new THREE.MeshPhongMaterial({ color: 0x22c55e });
      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.set(x, -0.5, z);

      scene.add(trunk);
      scene.add(foliage);
    };

    createTree(-6, 1);
    createTree(5, -2);
    createTree(-1, -5);

    // Position camera
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Gentle rotation of buildings
      buildings.forEach((building, index) => {
        building.rotation.y += 0.001 * (index + 1);
      });

      // Camera follows mouse slightly
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.01;
      camera.position.y += (mouseY * 2 + 2 - camera.position.y) * 0.01;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeBackground;
