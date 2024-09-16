<script>
  import { onMount } from "svelte";

  const name = 'BRYAN JIANG';

  function handleResizeWindow() {
  // Align text ref https://darraghmckay.com/blog/rect-text
  const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const windowWidth = window.innerWidth;
    const fontSize = windowWidth * 0.11; // 11vw equivalent
    context.font = `${fontSize}px Arial`;
    const metrics = context.measureText(name);
    const length = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const padding = (windowWidth - length) / 2;

    const projectsContainer = document.querySelector('.project-header-container');
    projectsContainer.style.paddingLeft = `${padding}px`;
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
    
    font-size: 8vw;
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