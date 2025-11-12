const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");

let formData = { 
    email: "", 
    message: "" 
};

function loadAndFillForm() {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            formData = { ...formData, ...parsedData };

            form.elements.email.value = formData.email || ""; 
            form.elements.message.value = formData.message || "";
        }
    } catch (error) {
        console.error("Error loading data from localStorage:", error);
    }
};
loadAndFillForm();

form.addEventListener("input", (event) => {
    const { name, value } = event.target;
    
    if (name === "email" || name === "message") {
        formData[name] = value.trim(); 
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (formData.email === "" || formData.message === "") {
        alert("Fill please all fields");
        return;
    }
    console.log("Form Submitted:", formData);
    
    localStorage.removeItem(STORAGE_KEY);
    formData = { email: "", message: "" };
    form.reset();
});