
// Get DOM elements
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chatbot-messages');
const settingsMenu = document.getElementById('settings-menu');
const sendButton = document.getElementById('sendButton');
const voiceButton = document.getElementById('voiceButton');

// Function to handle input changes
const handleInputChange = () => {
    if (userInput.value.trim() !== '') {
        // If the input is not empty, show the Send Button and hide the Voice Button
        sendButton.style.opacity = '1';
        sendButton.style.pointerEvents = 'auto';
        voiceButton.style.opacity = '0';
        voiceButton.style.pointerEvents = 'none';
    } else {
        // If the input is empty, show the Voice Button and hide the Send Button
        sendButton.style.opacity = '0';
        sendButton.style.pointerEvents = 'none';
        voiceButton.style.opacity = '1';
        voiceButton.style.pointerEvents = 'auto';
    }
};

// Add an event listener to the input field
userInput.addEventListener('input', handleInputChange);

// Add an event listener to the Send Button
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();

    if (message) {
        // Send the message (you can replace this with your actual send logic)
        console.log('Message sent:', message);

        // Clear the input field
        userInput.value = '';
        const inputEvent = new Event('input', { bubbles: true });
        userInput.dispatchEvent(inputEvent);
        // Directly call handleInputChange to update button visibility
        handleInputChange();
    }
});

// Hide the settings menu when the page loads
window.addEventListener('load', () => {
    settingsMenu.style.display = "none";
    document.getElementById('profile-section').style.display = "none";
    document.getElementById('themes-section').style.display = "none";

    // Load saved colors if available
    loadSavedColors();
});

// Send message when the button is clicked
sendButton.addEventListener('click', sendMessage);

// Send message when Enter key is pressed
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Function to send a message
function sendMessage() {
    const message = userInput.value.trim();

    if (message !== "") {
        // Display user message
        appendMessage(message, 'user-message');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            appendMessage(botResponse, 'bot-message');
        }, 500);

        // Clear input field
        userInput.value = '';
    }
}

// Function to append a message to the chat
function appendMessage(text, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    const messageText = document.createElement('span');
    messageText.textContent = text;

    messageElement.appendChild(messageText);
    chatMessages.appendChild(messageElement);

    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to generate bot responses
function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();

    if (userMessage.includes('hello') || userMessage.includes('hi')) {
        return "Hi there! How can I help you?";
    } else if (userMessage.includes('how are you')) {
        return "I'm just a bot, but I'm doing great! How about you?";
    } else if (userMessage.includes('bye')) {
        return "Goodbye! Have a great day!";
    } else {
        return "I'm not sure how to respond to that. Can you ask me something else?";
    }
}

// Toggle Settings Menu
function toggleDropdown() {
    const dropdownMenu = document.getElementById('settings-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'flex' : 'none';
}

// Toggle hidden sections (profile and themes)
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const isOpen = section.style.display === 'flex';

    // Toggle the section
    section.style.display = isOpen ? 'none' : 'flex';

    // Add/remove a class to the body to hide/show the chatbot container
    if (isOpen) {
        document.body.classList.remove('hidden-section-open');
    } else {
        document.body.classList.add('hidden-section-open');
    }
}

function save() {
    // Save colors
    const bgColor = document.getElementById('bg-color-picker').value;
    const headerColor = document.getElementById('header-color-picker').value;

    localStorage.setItem('bgColor', bgColor);
    localStorage.setItem('headerColor', headerColor);

    // Apply the new colors
    updateColor('--bg-color', bgColor);
    updateColor('--header-color', headerColor);

    // Save text size
    const selectedTextSize = document.querySelector('.text-size-sample.active')?.classList[1]; // Get the active text size class
    if (selectedTextSize) {
        localStorage.setItem('textSize', selectedTextSize);
        applyTextSize(selectedTextSize); // Apply the text size
    }

}

function loadSavedColors() {
    // Load saved colors
    const bgColor = localStorage.getItem('bgColor');
    const headerColor = localStorage.getItem('headerColor');

    if (bgColor) updateColor('--bg-color', bgColor);
    if (headerColor) updateColor('--header-color', headerColor);

    // Set the color pickers to the saved values
    if (bgColor) document.getElementById('bg-color-picker').value = bgColor;
    if (headerColor) document.getElementById('header-color-picker').value = headerColor;

    // Load saved text size
    const savedTextSize = localStorage.getItem('textSize');
    if (savedTextSize) {
        applyTextSize(savedTextSize);
        // Mark the saved text size as active in the UI
        document.querySelectorAll('.text-size-sample').forEach(button => {
            button.classList.remove('active');
            if (button.classList.contains(savedTextSize)) {
                button.classList.add('active');
            }
        });
    }
}

function resetToDefault() {
    const defaultBgColor = "#179094"; // Your default background color
    const defaultHeaderColor = "#6ceff8"; // Your default header color
    const defaultTextSize = "text-medium"; // Your default text size

    // Update the color pickers
    document.getElementById('bg-color-picker').value = defaultBgColor;
    document.getElementById('header-color-picker').value = defaultHeaderColor;

    // Apply the default colors
    updateColor('--bg-color', defaultBgColor);
    updateColor('--header-color', defaultHeaderColor);

    // Apply the default text size
    applyTextSize(defaultTextSize);

    // Save the default colors and text size to localStorage
    localStorage.setItem('bgColor', defaultBgColor);
    localStorage.setItem('headerColor', defaultHeaderColor);
    localStorage.setItem('textSize', defaultTextSize);

    // Mark the default text size as active in the UI
    document.querySelectorAll('.text-size-sample').forEach(button => {
        button.classList.remove('active');
        if (button.classList.contains(defaultTextSize)) {
            button.classList.add('active');
        }
    });
}

// Function to update a CSS variable
function updateColor(variable, value) {
    document.documentElement.style.setProperty(variable, value);
}

function applyTextSize(textSizeClass) {
    const chatbotMessages = document.getElementById('chatbot-messages');
    // Remove existing text size classes
    chatbotMessages.classList.remove('text-small', 'text-medium', 'text-large');
    // Add the selected text size class
    chatbotMessages.classList.add(textSizeClass);
}

// Function to sign out (placeholder)
function signOut() {
    console.log("Sign Out clicked!");
}

// Function to toggle the visibility of sections
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

// User profile data as variables/fields
let userProfile = {
    name: "User's Name",
    email: "user@example.com",
    phone: "+123 456 7890",
    regDate: "January 1, 2023"
};

// Function to populate the read-only profile section
function populateReadOnlyProfile() {
    document.getElementById('readonly-name').innerText = userProfile.name;
    document.getElementById('readonly-email').innerText = userProfile.email;
    document.getElementById('readonly-phone').innerText = userProfile.phone;
    document.getElementById('readonly-regdate').innerText = userProfile.regDate;
}

// Function to populate the editable profile section
function populateEditableProfile() {
    document.getElementById('name').value = userProfile.name;
    document.getElementById('email').value = userProfile.email;
    document.getElementById('phone').value = userProfile.phone;
    document.getElementById('editable-regdate').innerText = userProfile.regDate;
}

// Function to toggle between read-only and editable views
function toggleEditProfile() {
    const readonlyProfile = document.getElementById('readonly-profile');
    const editableProfile = document.getElementById('editable-profile');

    // Check if the read-only profile is currently visible
    if (readonlyProfile.style.display !== 'none') {
        // Hide the read-only profile and show the editable profile
        readonlyProfile.style.display = 'none';
        editableProfile.style.display = 'block';

        // Populate the editable fields with the current data
        populateEditableProfile();
    } else {
        // Hide the editable profile and show the read-only profile
        readonlyProfile.style.display = 'block';
        editableProfile.style.display = 'none';
    }
}

// Function to save the updated profile
function saveProfile(event) {
    event.preventDefault(); // Prevent form submission

    // Update the userProfile object with new values
    userProfile.name = document.getElementById('name').value;
    userProfile.email = document.getElementById('email').value;
    userProfile.phone = document.getElementById('phone').value;

    // Update the read-only view with the new values
    populateReadOnlyProfile();

    // Here you would typically send the data to the server to update the database
    // Example:
    // fetch('/update-profile', {
    //     method: 'POST',
    //     body: JSON.stringify(userProfile),
    //     headers: { 'Content-Type': 'application/json' }
    // }).then(response => response.json()).then(data => {
    //     console.log('Profile updated successfully:', data);
    // }).catch(error => {
    //     console.error('Error updating profile:', error);
    // });

    // Switch back to the read-only view
    toggleEditProfile();
}

// Initialize the read-only profile on page load
document.addEventListener('DOMContentLoaded', () => {
    populateReadOnlyProfile();
});