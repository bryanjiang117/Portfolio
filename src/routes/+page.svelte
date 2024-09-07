<script lang='js'>

  const name = 'BRYAN JIANG'
  
  let whichJob = true;

  const changeJob = () => {
    whichJob = !whichJob;
  }

  const changeGreeting = () => {

  }
  // let greeting = 'Hey, I\'m';
  let lang = 'eng';

  const intervalId = setInterval(() => {
    changeJob();
  }, 3000);

  import { onDestroy } from "svelte";
  onDestroy(() => {
    clearInterval(intervalId);
  });

  import { onMount } from 'svelte';
  import Typed from 'typed.js';
  
  let sidePadding = 0;
  onMount(() => {
    // Align text ref https://darraghmckay.com/blog/rect-text
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '9rem Arial';
    const metrics = context.measureText(name);
    sidePadding = metrics.actualBoundingBoxLeft;

    // Typing animation
    const greeting = new Typed('#typedGreeting', {
      strings: ['Hey, I\'m', '你好，我叫', '初めまして、僕は'],
      typeSpeed: 60,
      loop: true,
      preStringTyped: (arrayPos, self) => {
        console.log(self.typeSpeed);
      }
    })
  });

</script>

<div class='main-container'>
  <div id='page-1' class='page'>
    <div class='fill flex-col justify-center align-center'>
      <div class='text-container no-select'>
        <div class='relative'>
          <div class='greeting' on:mouseover={changeGreeting} style='transform: translateX({Math.abs(sidePadding)}px)'>
            <span id='typedGreeting'></span>
          </div>
          <h1 class='name'>{name}</h1>
          {#if lang === 'jyp'}
            <span id='desu'>です</span>
          {/if}
        </div>
        <div class='job' on:mouseover={changeJob} style='transform: translateX({sidePadding}px)'>{whichJob ? 'Web' : 'Software'} Developer</div>
      </div>
    </div>
  </div>

  <div class='page'>

  </div>

  <div class='page'>
    
  </div>
</div>

<style lang='scss'>

@import '/src/global.scss';

#page-1 {
  background-color: $color-bg-0;
}

#desu {
  position: absolute;
  bottom: 2rem;
  right: -2.5rem;
}
.job {
  font-size: 1.5rem;
  text-align: right;
  width: 100%;
}

.name {
  margin: -1rem 0 0 0;
  font-size: 9rem;
}

.greeting {
  height: 1.5rem;
}

.text-container {
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
  height: 100vh;
}

.main-container {
  
}

</style>