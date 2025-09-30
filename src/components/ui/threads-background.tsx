"use client";

import React, { 
  useEffect, 
  useRef, 
  useMemo, 
  useCallback,
  memo 
} from "react";
import { useInView } from "react-intersection-observer";
import { 
  Renderer, 
  Program, 
  Mesh, 
  Triangle, 
  Color 
} from "ogl";

/**
 * Configuration for Threads background rendering
 * Provides default settings and performance optimizations
 */
const THREADS_CONFIG = {
  rendering: {
    alpha: true,
    blendFunc: {
      src: 'SRC_ALPHA',
      dst: 'ONE_MINUS_SRC_ALPHA'
    }
  },
  animation: {
    mouseSmoothing: 0.05,
    timeScale: 0.001,
    fps: 60
  },
  shader: {
    lineCount: 40,
    lineWidth: 7.0,
    lineBlur: 10.0
  },
  performance: {
    visibilityThreshold: 0.1
  }
};

/**
 * Properties for Threads background component
 * Defines configuration for procedural WebGL background
 */
interface ThreadsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
}

// Vertex and fragment shaders (existing implementation)
const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Fragment shader (existing implementation remains the same)
const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

/**
 * Threads Background Component
 * Renders an interactive, animated WebGL background with performance optimizations
 * 
 * @component
 * @param {ThreadsProps} props - Configuration for threads background
 */
const Threads: React.FC<ThreadsProps> = memo(({
  color = [1, 1, 1],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = false,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>(0);
  const rendererRef = useRef<Renderer | null>(null);
  const programRef = useRef<Program | null>(null);

  // Use react-intersection-observer for visibility tracking
  const { ref: intersectionRef, inView } = useInView({
    threshold: THREADS_CONFIG.performance.visibilityThreshold,
    triggerOnce: false
  });

  // Combine refs
  const combinedRef = useCallback((node: HTMLDivElement) => {
    containerRef.current = node;
    intersectionRef(node);
  }, [intersectionRef]);

  // Memoize shader configuration to prevent unnecessary recomputations
  const shaderConfig = useMemo(() => ({
    color,
    amplitude,
    distance
  }), [color, amplitude, distance]);

  // Optimize mouse interaction with useCallback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!rendererRef.current || !containerRef.current || !programRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;

    programRef.current.uniforms.uMouse.value[0] = x;
    programRef.current.uniforms.uMouse.value[1] = y;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!programRef.current) return;
    
    programRef.current.uniforms.uMouse.value[0] = 0.5;
    programRef.current.uniforms.uMouse.value[1] = 0.5;
  }, []);

  // Handle page visibility changes
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden && animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // WebGL setup
    const renderer = new Renderer({ 
      alpha: THREADS_CONFIG.rendering.alpha 
    });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // Ensure canvas is added to container
    if (!container.contains(gl.canvas)) {
      container.appendChild(gl.canvas);
    }

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        uColor: { value: new Color(...shaderConfig.color) },
        uAmplitude: { value: shaderConfig.amplitude },
        uDistance: { value: shaderConfig.distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value.r = clientWidth;
      program.uniforms.iResolution.value.g = clientHeight;
      program.uniforms.iResolution.value.b = clientWidth / clientHeight;
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resize();

    if (enableMouseInteraction) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    function update(t: number) {
      if (!inView) return;

      program.uniforms.iTime.value = t * THREADS_CONFIG.animation.timeScale;
      renderer.render({ scene: mesh });
      animationFrameId.current = requestAnimationFrame(update);
    }
    animationFrameId.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
      
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      
      if (enableMouseInteraction) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      
      if (container.contains(gl.canvas)) 
        container.removeChild(gl.canvas);
      
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    shaderConfig, 
    enableMouseInteraction, 
    handleMouseMove, 
    handleMouseLeave,
    handleVisibilityChange,
    inView
  ]);

  return (
    <section 
      ref={combinedRef} 
      className="w-full h-full absolute top-0 left-0 z-1" 
      aria-label="Animated Background Threads"
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.01)', 
        pointerEvents: 'none' 
      }}
      {...rest} 
    >
      {!inView && <div>Loading WebGL Background...</div>}
    </section>
  );
});

Threads.displayName = 'ThreadsBackground';

export default Threads;