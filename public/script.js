//client side validation
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";

    if (!name || !email || !phone) {
        errorMessage.textContent = "All required fields must be filled!";
        return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        errorMessage.textContent = "Invalid email format!";
        return false;
    }
    if (!/^\d{10}$/.test(phone)) {
        errorMessage.textContent = "Phone number must be 10 digits!";
        return false;
    }
    return true;
}