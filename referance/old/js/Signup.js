 document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;

    
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    
    let users = JSON.parse(localStorage.getItem("users")) || [];

    
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
      alert("An account with this email already exists.");
      return;
    }

   
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    
    window.location.href = "../html/signin.html";
  });