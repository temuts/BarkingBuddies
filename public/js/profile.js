$(document).ready(function () {

    const selectedFiles = {};

    // Generate a random image path for the profile picture
    const randomProfileNumber = Math.floor(Math.random() * 10);
    const initialProfilePicture = `/img/profile/${randomProfileNumber}.png`;
    $('#profilePic').attr('src', initialProfilePicture);

    // Generate a random image path for the profile picture
    const randomPetNumber = Math.floor(Math.random() * 6) + 1;
    const initialPetPicture = `/img/dog${randomPetNumber}.png`;
    $('#petPic').attr('src', initialPetPicture);

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

    // Handle form submission when the signup button is clicked
    $('.signup-btn').on('click', async function (event) {
        event.preventDefault();

        // Create a new FormData object
        const formData = new FormData();

        // Collect values from the form
        const name = $('#name').val().trim();
        const description = $('#description').val().trim();
        const phone = $('#phone').val().trim();

        // Append other form data to the FormData object
        formData.append('name', name);
        formData.append('description', description);
        formData.append('phone', phone);

        // Append the selected file or random profile image to the formData object
        if (selectedFiles[`profilePicture`]) {
            formData.append('profilePicture', selectedFiles['profilePicture']);
            console.log(selectedFiles[`profilePicture`]);
        } else {
            formData.append('profilePicture', initialProfilePicture);
        }

        try {
            const response = await fetch('/api/profile/register', {
                method: 'POST',
                body: formData, // Pass the formData object directly
            });

            if (response.ok) {
                // Redirect to the profile page on success
                window.location.replace('/profile');
            } else {
                const responseData = await response.json();
                if (responseData.err) {
                    alert(responseData.err);
                } else if (responseData.errors) {
                    console.error(responseData.errors);
                } else {
                    alert(response.statusText);
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

});
