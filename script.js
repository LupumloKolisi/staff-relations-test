// script.js

// In-memory user data
let users = [
  {
    firstName: "Lupumlo",
    lastName: "Kolisi",
    email: "lulokolisi@gmail.com",
    password: "password123",
    role: "Manager",
  },
];

// User Registration and Login
async function initSignInForm() {
  const signInForm = document.getElementById("signInForm");
  signInForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (validateEmail(email) && validatePassword(password)) {
      try {
        const user = await authenticateUser(email, password);
        redirectToAppropriateUrl(user.role);
      } catch (error) {
        alert("Invalid email or password. Please try again.");
      }
    } else {
      alert("Please enter a valid email and password.");
    }
  });
}

async function initRegistrationForm() {
  const registrationForm = document.getElementById("registrationForm");
  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("new-password").value;
    const role = document.getElementById("role").value;

    if (
      validateFirstName(firstName) &&
      validateLastName(lastName) &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      try {
        const newUser = await registerUser(
          firstName,
          lastName,
          email,
          password,
          role
        );
        window.location.href = "/signin";
      } catch (error) {
        alert("Error creating your account. Please try again.");
      }
    } else {
      alert("Please fill out the form correctly.");
    }
  });
}

// Helper functions
function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function validatePassword(password) {
  return /[a-z0-5]{8,}/.test(password);
}

function validateFirstName(firstName) {
  return firstName.trim() !== "";
}

function validateLastName(lastName) {
  return lastName.trim() !== "";
}

async function authenticateUser(email, password) {
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Authentication failed");
  }

  return user;
}

async function registerUser(firstName, lastName, email, password, role) {
  const newUser = { firstName, lastName, email, password, role };
  users.push(newUser);
  return newUser;
}

function redirectToAppropriateUrl(role) {
  switch (role) {
    case "Manager":
      window.location.href = "/manager";
      break;
    case "Employee":
      window.location.href = "/employee";
      break;
    case "HR":
      window.location.href = "/hr";
      break;
    default:
      window.location.href = "/";
  }
}

// Initialize the application
async function initApp() {
  await initSignInForm();
  await initRegistrationForm();
}

initApp();
