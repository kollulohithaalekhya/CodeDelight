 const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
      window.location.href = "../html/homepage.html"; 
    } else {
      alert("Invalid email or password");
    }
  });