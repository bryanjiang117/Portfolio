  <script>
    // You can add more social media links here
    const socialLinks = [
      { name: 'Email', url: 'mailto:haozhoujiang@gmail.com', icon: 'email.svg' },
      { name: 'GitHub', url: 'https://github.com/bryanjiang117', icon: 'github.svg' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/bryanjiang117', icon: 'linkedin.svg' },
    ];
  </script>

  <div id='page-5' class='page'>
    <div class='contact-container'>
      <div class='contact-me'>Contact Me!</div>
    </div>
    
    <div class='links'>
      {#each socialLinks as link}
        <a class='social-link' href={link.url} target='_blank'>
          <img src={`/lib/images/${link.icon}`} alt={link.name} />
          <span>{link.name}</span>
        </a>
      {/each}
    </div>
  </div>  


  <style lang='scss'>
    @import '/src/global.scss';

    .contact-me {
      font-size: 8vw;
      letter-spacing: -5px;
      background: radial-gradient(rgb(231, 228, 224), black);
      background-attachment: fixed;
      background-position: center;
      background-size: 80vw 100vh;
      -webkit-text-fill-color: transparent; 
      background-clip: text;
      -webkit-background-clip: text; 
    }

    .contact-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100vh;
    }

    .social-link {
      margin: 0 1rem;
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-align: center;
      height: fit-content;
    }
    .social-link img {
      width: 1.5rem;
      height: 1.5rem;
      filter: invert(60%);
    }

    .links {
      color: rgb(159, 156, 151);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      background-color: inherit;
      margin-top: -4rem;
      margin-bottom: 2rem;
    }

    #page-5 {
      height: 100vh;
      width: 100%;
      margin-top: -30vh;
      background-color: $color-bg-3;
    }
  </style>