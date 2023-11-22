export function subscribe() {
    let email = document.querySelector("#email").value;

    // Validate email format
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Error: Please enter a valid email address.");
        return;
    } else {
        alert("Thank you for subscribing!");
    }
    document.querySelector("#email").value = "";
}
