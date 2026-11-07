"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SEEDS } from "@/lib/constants";
import { createSeededRandom } from "@/lib/seededRandom";

const SPREAD = { x: 14, y: 9, z: 6 } as const;
const LANTERNS = 7;
const PALETTE = ["#F5A623", "#E8B04B", "#FF7A18", "#FFD9A0"].map((c) => new THREE.Color(c));

function glowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const g = canvas.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.3, "rgba(255,255,255,0.5)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvas);
}

type EmberSceneProps = { count?: number; className?: string };

/** Rising embers and drifting lantern glows, rendered with three.js. Seeded, so it is reproducible. */
export function EmberScene({ count = 600, className = "" }: EmberSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
    camera.position.z = 7;

    const rand = createSeededRandom(SEEDS.nans * SEEDS.an);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * SPREAD.x;
      positions[i * 3 + 1] = (rand() - 0.5) * SPREAD.y;
      positions[i * 3 + 2] = (rand() - 0.5) * SPREAD.z;
      speeds[i] = 0.15 + rand() * 0.5;
      const c = PALETTE[Math.floor(rand() * PALETTE.length)];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    const geometry = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    geometry.setAttribute("position", posAttr);
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const texture = glowTexture();
    const pointsMat = new THREE.PointsMaterial({
      size: 0.16, map: texture, vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.9,
    });
    scene.add(new THREE.Points(geometry, pointsMat));

    const lanternMat = new THREE.SpriteMaterial({
      map: texture, color: "#FFB347", transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: 0.8,
    });
    const lanterns = Array.from({ length: LANTERNS }, () => {
      const sprite = new THREE.Sprite(lanternMat);
      sprite.scale.set(1.6, 1.6, 1);
      sprite.position.set((rand() - 0.5) * SPREAD.x * 0.8, (rand() - 0.5) * SPREAD.y * 0.7, -2 - rand() * 2);
      sprite.userData = { baseY: sprite.position.y, phase: rand() * Math.PI * 2 };
      scene.add(sprite);
      return sprite;
    });

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    };

    const render = (ms: number) => {
      const t = ms / 1000;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += speeds[i] * 0.006;
        positions[i * 3] += Math.sin(t + i) * 0.0008;
        if (positions[i * 3 + 1] > SPREAD.y / 2) positions[i * 3 + 1] = -SPREAD.y / 2;
      }
      posAttr.needsUpdate = true;
      for (const l of lanterns) {
        l.position.y = l.userData.baseY + Math.sin(t * 0.5 + l.userData.phase) * 0.4;
        l.material.opacity = 0.65 + Math.sin(t * 1.3 + l.userData.phase) * 0.15;
      }
      camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (-pointer.y * 0.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener("resize", resize);
    let raf = 0;
    const loop = (ms: number) => {
      render(ms);
      raf = requestAnimationFrame(loop);
    };
    let observer: IntersectionObserver | undefined;
    if (reduced) {
      render(0);
    } else {
      window.addEventListener("pointermove", onPointer);
      observer = new IntersectionObserver(([entry]) => {
        cancelAnimationFrame(raf);
        if (entry.isIntersecting) raf = requestAnimationFrame(loop);
      });
      observer.observe(mount);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      geometry.dispose();
      pointsMat.dispose();
      lanternMat.dispose();
      texture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [count, reduced]);

  return <div ref={mountRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`} />;
}
