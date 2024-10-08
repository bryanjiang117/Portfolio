<script>
  import { onMount } from "svelte";
  import { getNameMetrics } from "../utils/util.js";

  const name = 'BRYAN JIANG';

  function handleResizeWindow() {
    const { leftSidePadding } = getNameMetrics(name);

    const projectsContainer = document.querySelector('.project-header-container');
    projectsContainer.style.paddingLeft = `${leftSidePadding}px`;
  }

  onMount(() => {
    handleResizeWindow();

    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    }
  });

</script>

<div class='project-header-container'>
  <div class='project-heading'>
    Projects
  </div>
</div>

<style lang='scss'>
  @import '/src/global.scss';

  .project-heading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    background: radial-gradient(rgb(231, 228, 224), black);
    background-attachment: fixed;
    background-position: center;
    background-size: 100vw 100vh;
    -webkit-text-fill-color: transparent; 
    background-clip: text;
    -webkit-background-clip: text; 
    margin-left: 5vw;
    font-size: max(8vw, 4rem);
    letter-spacing: -5px;
  }

  .project-header-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: start;
    background-color: $color-bg-3;
    position: relative;
  }
</style>