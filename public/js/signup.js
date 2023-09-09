const signupFormHandler = async (event) => {
  event.preventDefault();

  // Capture for email, password and confirm_password values.
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirm_password = document.querySelector('#confirm-password').value.trim();

  if (email && password) {
    
    // Send a POST request to the Signup API endpoint
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, confirm_password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      const responseData = await response.json();
      if (responseData.err) {
        // Handle the specific password length validation error here
        alert(responseData.err);
      } else if (responseData.errors) {
        // Handle other validation errors here
        console.error(responseData.errors);
      } else {
        // Handle other error cases
        alert(response.statusText);
      }
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);