const container = document.getElementById("bookingsList");
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "error.html";
}

async function loadBookings() {
  const res = await fetch("http://localhost:5000/bookings", {
    headers: {
      Authorization: token,
    },
  });

  const bookings = await res.json();

  container.innerHTML = "";

  bookings.forEach((b, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p>${b.name} - ${b.date}</p>
      <button onclick="deleteBooking(${index})">Delete</button>
    `;

    container.appendChild(div);
  });
}

async function deleteBooking(index) {
  await fetch(`http://localhost:5000/bookings/${index}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  loadBookings();
}

loadBookings();

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}