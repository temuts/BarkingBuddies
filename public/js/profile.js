$(document).ready(function () {

    const selectedFiles = {};
    let selectedLocationId = null;
    let selectedDayId = null;
    let selectedGender = null;

    // Generate a random image path for the profile picture
    const randomProfileNumber = Math.floor(Math.random() * 10);
    const initialProfilePicture = `/img/profile/${randomProfileNumber}.png`;
    $('#profilePic').attr('src', initialProfilePicture);

    // Generate a random image path for the profile picture
    const randomPetNumber = Math.floor(Math.random() * 6) + 1;
    const initialPetPicture = `/img/dog${randomPetNumber}.png`;
    $('#petPic').attr('src', initialPetPicture);

    // Fetch locations directly within the document ready block
    $.ajax({
        url: '/api/locations',
        method: 'GET',
        dataType: 'json',
        success: function (locations) {
            const locationDropdown = $('#locationDropdown'); // Use jQuery to select the dropdown

            locations.forEach(location => {
                const option = $('<option></option>');
                option.val(location.location_id); // Use the locationId as the value
                option.text(location.name);
                locationDropdown.append(option);
            });
        },
        error: function (error) {
            console.error(error);
        }
    });

    // Fetch days directly within the document ready block
    $.ajax({
        url: '/api/days',
        method: 'GET',
        dataType: 'json',
        success: function (days) {
            const daysDropdown = $('#daysDropdown'); // Use jQuery to select the dropdown

            days.forEach(day => {
                const option = $('<option></option>');
                option.val(day.day_id); // Use the locationId as the value
                option.text(day.name_of_day);
                daysDropdown.append(option);
            });
        },
        error: function (error) {
            console.error(error);
        }
    });

    $(document).on("change", ".uploadPicture", function () {
        const holder = $(this).closest(".pic-holder");
        const wrapper = $(this).closest(".profile-pic-wrapper");
        const currentImg = holder.find(".pic").attr("src");
        const files = this.files || [];
        const fieldName = this.name; 

        $(holder).find('[role="alert"]').remove();
        this.blur();

        if (files.length > 0) {
            const reader = new FileReader();

            reader.onloadend = function () {
                holder.addClass("uploadInProgress");
                holder.find(".pic").attr("src", this.result);
                holder.append('<div class="upload-loader"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');

                setTimeout(() => {
                    holder.removeClass("uploadInProgress");
                    holder.find(".upload-loader").remove();

                    const success = Math.random() < 0.9;
                    const message = success ? "Image updated successfully" : "There is an error while uploading! Please try again later.";
                    const iconClass = success ? "text-success" : "text-danger";

                    wrapper.append(`<div class="snackbar show" role="alert"><i class="fa fa-check-circle ${iconClass}"></i> ${message}</div>`);
                    $(this).val(""); // Clear input after upload

                    setTimeout(() => {
                        wrapper.find('[role="alert"]').remove();
                    }, 3000);

                    selectedFiles[fieldName] = files[0];

                }, 1500);
            };

            reader.readAsDataURL(files[0]);
        }

    });

    // Event listener for the radio input boxes (Male and Female)
    $('input[name="petGender"]').on('change', (event) => {
        selectedGender = event.target.value;
        console.log(`Selected gender: ${selectedGender}`);
    });
    
    $('#locationDropdown').on('change', (event) => {
        selectedLocationId = event.target.value;
        console.log(`Selected Location ID: ${selectedLocationId}`);
    });

    $('#daysDropdown').on('change', (event) => {
        selectedDayId = event.target.value;
        console.log(`Selected Day ID: ${selectedDayId}`);
    });

    // Handle form submission when the signup button is clicked
    $('.signup-btn').on('click', async function (event) {
        event.preventDefault();

        // Create a new FormData objects for capturing profile and pets info.
        const profileData = new FormData();
        const petData = new FormData();

        // Collect values for Profile
        let name = $('#name').val().trim();
        let description = $('#description').val().trim();
        const phone = $('#phone').val().trim();

        // Append other form data to the FormData object
        profileData.append('name', name);
        profileData.append('description', description);
        profileData.append('phone', phone);
        profileData.append('location_id', selectedLocationId);
        profileData.append('days_id', selectedDayId);

        // Append the selected file or random profile image to the formData object
        if (selectedFiles[`profilePicture`]) {
            profileData.append('profilePicture', selectedFiles['profilePicture']);
            console.log(selectedFiles[`profilePicture`]);
        } else {
            profileData.append('profilePicture', initialProfilePicture);
        }

        // Collect values for Profile
        name = $('#petName').val().trim();
        description = $('#petDescription').val().trim();
        const age =  $('#petAge').val().trim();
        const breed =  $('#petBreed').val().trim();

        // Append other form data to the FormData object
        petData.append('name', name);
        petData.append('description', description);
        petData.append('age', age);
        petData.append('breed', breed);
        petData.append('gender', selectedGender); 

        console.log(selectedGender);
        

        // Append the selected file or random profile image to the formData object
        if (selectedFiles[`petPicture`]) {
            petData.append('petPicture', selectedFiles['petPicture']);
            console.log(selectedFiles[`petPicture`]);
        } else {
            petData.append('petPicture', initialPetPicture);
        }

        try {
            const profileResponse = await fetch('/api/profile/register', {
                method: 'POST',
                body: profileData, // Pass the profileData object
            });

            const petResponse = await fetch('/api/pet/register', {
                method: 'POST',
                body: petData, // Pass the petData object
            });

            if (profileResponse.ok && petResponse.ok) {
                // Redirect to the profile page on success
                window.location.replace('/profile');
            } else {
            
                if (!profileResponse.ok) {
                    // Handle errors in the profileResponse
                    if (profileData.err) {
                        alert(profileData.err);
                    } else if (profileData.errors) {
                        console.error(profileData.errors);
                    } else {
                        alert(profileResponse.statusText);
                    }
                }
            
                if (!petResponse.ok) {
                    // Handle errors in the petResponse
                    if (petData.err) {
                        alert(petData.err);
                    } else if (petData.errors) {
                        console.error(petData.errors);
                    } else {
                        alert(petResponse.statusText);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

});
