<script lang="ts">
  import { onMount } from "svelte";
  import * as three from "three";
  import {
    appendFragmentShaderScript,
    appendRenderer,
    appendStats,
    appendVertexScript,
    generateStars,
  } from "./space.helpers";

  let container: HTMLElement;
  const VELOCITY = 10;
  const Z_DEPTH = 1000;

  onMount(() => {
    appendVertexScript();
    appendFragmentShaderScript();
    const scene = new three.Scene();
    const camera = new three.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    const renderer = appendRenderer(container);
    const fps = import.meta.env.DEV && appendStats();

    function animate(): number {
      const newStars = generateStars(10, Z_DEPTH);
      scene.add(newStars);

      // move all stars towards camera and remove when passed
      for (const child of scene.children) {
        if (child.position.z > Z_DEPTH) {
          scene.remove(child);
        } else {
          child.position.z += VELOCITY;
        }
      }

      renderer.render(scene, camera);
      fps && fps.update();
      return requestAnimationFrame(() => animate());
    }

    const frame = animate();
    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<div class="backdrop" bind:this={container} />

<style>
  .backdrop {
    position: fixed;
    z-index: -1;
  }
</style>
