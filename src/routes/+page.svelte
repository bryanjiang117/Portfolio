<script lang='js'>

  import { onMount } from 'svelte';
  import Typed from 'typed.js';
  import gsap from "gsap";

  // --------------- Start of Page 1 --------------- //

  const name = 'BRYAN JIANG'
  let whichJob = true;
  let sidePadding = 0;
  let greeting;
  let desu;
  let typing = true;

  const changeJob = () => {
    whichJob = !whichJob;
  }

  const changeGreeting = () => {
    if (greeting && !typing) {
      greeting.start();
      typing = true;
    }
  }

  const intervalId = setInterval(() => {
    changeJob();
    changeGreeting();
  }, 3000);

  // --------------- End of Page 1 --------------- //



  // --------------- Start of Page 2 --------------- //

  let isNameVisible = true;
  let nameElement;
  let bio = 'Filler ChatGPT text: Bryan Jiang is a passionate software developer with a focus on web development, creating dynamic and engaging user experiences. He has a keen interest in building complex, scalable applications using modern tools such as React, TypeScript, and SvelteKit. With experience in both frontend and backend technologies. With experience in both frontend and backend technologies, Bryan enjoys tackling challenging problems, especially in areas like authentication, database integration, and real-time updates.';

  // --------------- End of Page 2 --------------- //



  // --------------- Start of Page 3 --------------- //

  import HorizontalLoop from './HorizontalLoop.svelte';

  // --------------- End of Page 3 --------------- //



  onMount(() => {

    // --------------- Start of Page 1 --------------- //

    // Align text ref https://darraghmckay.com/blog/rect-text
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '9rem Arial';
    const metrics = context.measureText(name);
    sidePadding = metrics.actualBoundingBoxLeft;

    // Typing greeting animation
    greeting = new Typed('#greeting', {
      strings: ['Hey, I\'m', '你好，我叫', '初めまして、僕は'],
      backDelay: 0,
      loop: true,
      preStringTyped: (arrayPos, self) => {
        switch (arrayPos) {
          case 0:
            self.typeSpeed = 30;
            break;
          case 1:
            self.typeSpeed = 150;
            break;
          case 2: 
            self.typeSpeed = 100;
            break;
        }
        if (desu) {
          desu.destroy();
        }
      },
      onStringTyped: (arrayPos, self) => {
        greeting.stop();
        typing = false;
        if (arrayPos === 2) {
          self.cursor.style.display = 'none';
          desu = new Typed('#desu', {
            strings: ['です'],
            typeSpeed: 100,
          });
        } else {
           self.cursor.style.display = 'inline';
        }
      }
    });
    

    // --------------- End of Page 1 --------------- //



    // --------------- Start of Page 2 --------------- //

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isNameVisible = entry.isIntersecting;
      });
    });

    observer.observe(nameElement);

    // --------------- End of Page 2 --------------- //



    // --------------- Start of Page 3 --------------- //
    
    

    // --------------- End of Page 3 --------------- //
    

    return () => {
      clearInterval(intervalId);
      observer.disconnect();
    }
  });

</script>

<div class='main-container {isNameVisible ? 'page-1' : 'page-2'}'>
  <div id='page-1' class='page'>
    <div class='fill flex-col justify-center align-center'>

      <div class='name-container no-select'>
        <div class='relative'>
          <div class='greeting' style='transform: translateX({Math.abs(sidePadding)}px)'>
            <span id='greeting'></span>
          </div>
          <h1 class='name' bind:this={nameElement}>{name}</h1>
          <div class='desu-wrapper'>
            <span id='desu'></span>
          </div>  
        </div>
        <div class='job' style='transform: translateX({sidePadding}px)'>{whichJob ? 'web' : 'software'} developer</div>
      </div>

    </div>
  </div>

  <div class='page-divider' />

  <div id='page-2' class='page'>
    <div class='bio-container' style='transform: translateX({Math.abs(sidePadding)}px)'>
      <div class='bio'>
        <h2>ABOUT ME</h2>
        <p>
          &nbsp &nbsp &nbsp &nbsp{bio}
        </p>
      </div>
    </div>
  </div>

  <div class='page-divider-lg' />

  <div id='page-3' class='page'>
    <HorizontalLoop />

  </div>
</div>

<style lang='scss'>

@import '/src/global.scss';

.typed-cursor {
  display: inline-block; /* Keep cursor inline */
  line-height: normal;   /* Make sure line-height doesn't affect the cursor's placement */
  position: static;
}

.marquee-item {
  display: flex;
  gap: 1rem;
}

.page-2 {
  background-color: $color-bg-2;
  color: $color-text-2;
}

#page-2 {
  padding-left: calc((100vw - 918.55px) / 2);
}

h2 {
  font-size: 3.5rem;
  font-weight: bold;
  letter-spacing: -5px;
}

.bio {
  max-width: 30vw;
  font-size: 2.2rem;
  line-height: 3rem;
  letter-spacing: -1.5px;
  transition: color 0.5s ease;
}

.bio-container {
  width: 100%;
  height: 100%;
}

.page-1 {
  background-color: $color-bg-1;
  color: $color-text-1;
}

#page-1 {
  height: 100vh;
}

.desu-wrapper {
  width: 3rem;
  position: absolute;
  bottom: 2rem;
  left: 930px;
}
#desu {

}

.job {
  font-size: 1.5rem;
  letter-spacing: 1px;
  text-align: right;
  width: 100%;
}

.name {
  margin: -1rem 0 -1rem 0;
  font-size: 9rem;
  letter-spacing: -5px;
}

.greeting {
  height: 1.5rem;
}

.name-container {
  flex-grow: 0;
  flex-shrink: 0;
  height: auto;
}

.relative {
  position: relative;
}

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.flex-row {
  display: flex;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.fill {
  width: 100%;
  height: 100%;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}

.page {
  width: 100vw;
  min-height: 100vh;
}

.page-divider {
  height: 30vh;
}

.page-divider-lg {
  height: 40vh;
}

.main-container {
  transition: background-color 0.5s ease; 
}

</style>