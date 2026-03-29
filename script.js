
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("bookingForm");

  if (!form) {
    console.log("Form not found ❌");
    return;
  }

  let bookingData = {};

   const loader = document.getElementById("loader");
   const modal = document.getElementById("whatsappModal");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("input[type='text']").value;
    const date = form.querySelector("input[type='date']").value;

    // SHOW LOADER
  loader.style.display = "flex";


    try {
      const res = await fetch("http://localhost:5000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, date }),
      });

       // HIDE LOADER
    loader.style.display = "none";

    if (!res.ok) {
      alert("Failed to save booking");
      return;
    }

   // SAVE DATA
    bookingData = { name, date };

    // SHOW MODAL
     modal.classList.add("show");
    document.getElementById("whatsappModal").style.display = "flex";

    } catch (err) {
      loader.style.display = "none";
      console.log(err);
      alert("Server error");
    }
  });

  // WhatsApp button
  const whatsappBtn = document.getElementById("whatsappBtn");

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", function () {
      const phone = "254110292500";
      const message = encodeURIComponent("Hello, I want to book a haircut.");

      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    });
  }

});

document.getElementById("sendWhatsApp").addEventListener("click", () => {
  const phone = "254110292500";

  const message = encodeURIComponent(
    `Hello, my name is ${bookingData.name}. I want to book an appointment on ${bookingData.date}.`
  );

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

  window.location.href = "success.html";
});

document.getElementById("skipWhatsApp").addEventListener("click", () => {
  window.location.href = "success.html";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});