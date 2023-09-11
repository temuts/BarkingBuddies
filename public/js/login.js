/** handle the login form, and login based on username and password */
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (email && password) {
      // Send a POST request to the Login API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // redirect to pets homepage
        document.location.replace('/');
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
  
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);


  