/** handle the profile signup form */

function getSelectedFileData(inputElement) {
    var files = inputElement.files;

    if (files.length > 0) {
        var formData = new FormData();
        formData.append('profilePicture', files[0]); // Append the file with a specific name
        return formData;
    } else {
        return null; // No file selected
    }
}

const profileFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const name = document.querySelector('#name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const phone = document.querySelector('#phone').value.trim();
    
    // Loop through all file inputs with the class "uploadPicture"
    var formDataArray = [];
    document.querySelectorAll('.uploadPicture').forEach(function(fileInput, index) {
        console.log(fileInput);
        var files = fileInput.files;
        var formData = new FormData();
        console.log(fileInput.files);
        if (files.length > 0) {
            formData.append('profilePicture', files[0]); // Append files with unique names
            formDataArray.push(formData);
            console.log(files[0].name);
        }
    });

    const petPicture = formDataArray[0];
    const image = formDataArray[1];

    if (name && image) {
      // Send a POST request to the Login API endpoint
      const response = await fetch("/api/profile", {
        method: 'POST',
        body: JSON.stringify({ 
            name, 
            description, 
            phone,
            image  
        }),
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
  
document.querySelector('.signup-btn').addEventListener('click', profileFormHandler);


  