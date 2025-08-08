'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type Heart = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
};

export default function Game() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const isHolding = useRef(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 기본 세팅
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const character = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xff99aa })
    );
    scene.add(character);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    camera.position.z = 5;

    // 캐릭터 이동 로직
    let target = new THREE.Vector3();
    const setRandomTarget = () => {
      target.set(Math.random() * 4 - 2, Math.random() * 2 - 1, 0);
    };
    setRandomTarget();

    // raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let hearts: Heart[] = [];

    const spawnHeart = (position: THREE.Vector3) => {
    const geometry = new THREE.SphereGeometry(0.1);
    const material = new THREE.MeshBasicMaterial({
        color: 0xff66cc,
        transparent: true,
        opacity: 1
    });

    const heart = new THREE.Mesh(geometry, material);
    heart.position.copy(position);
    scene.add(heart);

    const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02, // x 방향 랜덤
        0.02 + Math.random() * 0.01,  // y 방향 기본 위 + 랜덤
        (Math.random() - 0.5) * 0.02  // z 살짝 깊이감
    );

    hearts.push({ mesh: heart, velocity });
    };

    let frameId: number;

    const animate = () => {
      // 캐릭터 움직임
      character.position.lerp(target, 0.01);
      if (character.position.distanceTo(target) < 0.05) {
        setRandomTarget();
      }

      // 클릭+홀드 시 캐릭터 위에 있으면 반응
      if (isHolding.current) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(character);
        if (intersects.length > 0) {
          spawnHeart(character.position.clone());
          setScore((prev) => prev + 1);
        }
      }

      // 하트 위로 이동 및 페이드아웃
      hearts = hearts.filter(({ mesh, velocity }) => {
        const mat = mesh.material as THREE.MeshBasicMaterial;

        mesh.position.add(velocity);
        mat.opacity = Math.max(0, mat.opacity - 0.01);
        mat.transparent = true;

        if (mat.opacity <= 0) {
            scene.remove(mesh);
            return false;
        }
        return true;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // 마우스 이벤트
    const onMouseDown = () => (isHolding.current = true);
    const onMouseUp = () => (isHolding.current = false);
    const onMouseMove = (event: MouseEvent) => {
        if (!renderer.domElement) return;
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-[300px] border border-red-500">
      <div className="absolute top-2 left-4 z-10 text-lg font-bold text-pink-600">
        ❤️ {score}
      </div>
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}