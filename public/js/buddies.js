const requestToBeBuddies = async (event) => {
  event.preventDefault();

  // Send a POST request to the buddies endpoint

  newFriend_ID = $(event.target).data("id");
  console.log(newFriend_ID);

  const response = await fetch("/api/buddies/", {
    method: "POST",
    body: JSON.stringify({ to_user_id: newFriend_ID }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    console.error(response.error);
  }
};

$("#mingle-btn").on("click", requestToBeBuddies);
