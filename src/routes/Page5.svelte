<script>
  let name = '';
  let email = '';
  let message = '';

  function handleSubmit() {
    alert(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    // Here you can add your form submission logic
  }
</script>

<style>
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .contact-form div {
    margin-bottom: 1rem;
  }

  .contact-form label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .contact-form button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .contact-form button:hover {
    background-color: #0056b3;
  }
</style>

<div class="contact-form">
  <h2>Contact Me</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="name">Name</label>
      <input type="text" id="name" bind:value={name} required />
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} required />
    </div>
    <div>
      <label for="message">Message</label>
      <textarea id="message" bind:value={message} required></textarea>
    </div>
    <button type="submit">Submit</button>
  </form>
</div>