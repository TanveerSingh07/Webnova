// Main content loader
document.addEventListener('DOMContentLoaded', function () {
    // Load home content by default
    loadContent('home');

    // Set up navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.dataset.page;
            loadContent(page);
        });
    });
});

// Content loading function
async function loadContent(page) {
    try {
        let contentHtml = '';

        if (page === 'home') {
            contentHtml = await fetch('content/home.html').then(r => r.text());
        }
        else if (['html', 'css', 'js', 'jquery', 'ajax', 'php'].includes(page)) {
            contentHtml = await fetch(`content/languages/${page}.html`).then(r => r.text());
        }
        else if (page === 'contact') {
            contentHtml = await fetch('content/contact.html').then(r => r.text());
        }
        else {
            contentHtml = '<div class="section"><h2>Page Not Found</h2></div>';
        }

        // Inject the HTML content
        document.getElementById('main-content').innerHTML = contentHtml;

        // Dynamically load and execute scripts
        loadScripts();

        // Re-attach event listeners for the loaded content
        attachDynamicEventListeners();

    } catch (error) {
        console.error('Error loading content:', error);
        document.getElementById('main-content').innerHTML = `
            <div class="section">
                <h2>Error Loading Content</h2>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Function to dynamically load and execute scripts
function loadScripts() {
    const scripts = document.querySelectorAll('#main-content script');
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) {
            newScript.src = oldScript.src;
        } else {
            newScript.text = oldScript.textContent;
        }
        document.body.appendChild(newScript);
        oldScript.remove(); // Remove the original script tag
    });
}

// Function to attach all dynamic event listeners
function attachDynamicEventListeners() {
    // Ensure the jQuery script is loaded properly for its elements
    if (typeof $ !== 'undefined') {
        console.log('jQuery loaded successfully!');
    } else {
        console.log('jQuery not loaded');
    }

    // CSS Demo Toggle
    const cssToggle = document.getElementById('css-toggle');
    if (cssToggle) {
        cssToggle.addEventListener('click', function () {
            document.getElementById('css-demo').classList.toggle('active');
        });
    }

    // HTML/CSS Transformation Toggle
    const transformToggle = document.getElementById('toggle-output');
    if (transformToggle) {
        let isHTML = true;
        transformToggle.addEventListener('click', function () {
            const outputImg = document.getElementById('code-output');
            const codeDisplay = document.getElementById('code-display');

            if (isHTML) {
                outputImg.src = 'cssform.png';
                transformToggle.textContent = 'Show HTML Version';
                codeDisplay.textContent = `
form {
      font-family: Arial, sans-serif;
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    
    h1 {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-top: 10px;
      font-weight: bold;
      color: #34495e;
    }
    
    input[type="text"],
    input[type="email"],
    input[type="tel"] {
      width: 100%;
      padding: 8px;
      margin: 5px 0 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    
    input[type="radio"] {
      margin-right: 5px;
    }
    
    button {
      background-color: #3498db;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 10px;
      width: 100%;
    }
    
    button:hover {
      background-color: #2980b9;
    }
                `;
            } else {
                outputImg.src = 'simpleHtml.png';
                transformToggle.textContent = 'Show CSS Styled Version';
                codeDisplay.textContent = `
 <form>
    <h1>Registration Form</h1>
    <label>Name:</label>
    <input type="text"><br>
    <label>Email:</label>
    <input type="email"><br>
    <label>Phone Number:</label>
    <input type="tel"><br>
    <label>Gender:</label><br>
    <input type="radio" name="gender"> Male<br>
    <input type="radio" name="gender"> Female<br>
    <input type="radio" name="gender"> Other<br>
    <button type="submit">Submit</button>
  </form>
                `;
            }
            isHTML = !isHTML;
        });
    }

    // Explore buttons in tech cards
    document.querySelectorAll('.explore-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.dataset.page;
            loadContent(page);
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! (This is a demo form)');
            this.reset();
        });
    }
}

// Initialize any global functionality
function init() {
    // Any initialization code needed
    console.log('WebNova initialized');
}

// Start the application
init();

// Function to ensure jQuery is loaded before running dependent code
function ensureJQuery(callback) {
    if (typeof jQuery === 'undefined') {
      console.log('jQuery not loaded');
      // Dynamically load jQuery if not already loaded
      var script = document.createElement('script');
      script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      script.onload = callback;
      document.head.appendChild(script);
    } else {
      console.log('jQuery loaded');
      callback(); // jQuery is already loaded, run the callback
    }
  }
  
  // The callback function that uses jQuery
  function initializeApp() {
    $(document).ready(function() {
      console.log('App Initialized');
      // Place your jQuery-dependent code here
    });
  }
  
  // Initialize app after ensuring jQuery is loaded
  ensureJQuery(initializeApp);

  
  $(document).ready(function () {
    // Tab Switching Logic
    $('.tab').click(function () {
      var target = $(this).data('target');
      
      // Hide all tabs
      $('.tab-content').removeClass('active');
      
      // Remove active class from all tabs
      $('.tab').removeClass('active');
      
      // Show the targeted tab
      $(target).addClass('active');
      
      // Set the clicked tab as active
      $(this).addClass('active');
      
      // Re-run the JavaScript functionality when JavaScript tab is shown
      if (target === '#javascriptTab') {
        runJavaScriptTab();
      }
    });
  
    // Function to run JavaScript-related code in the JavaScript tab
    function runJavaScriptTab() {
      // Ensure the JavaScript-related button works every time the tab is shown
      $('#alertButton').off('click').on('click', function () {
        alert("This is an alert from JavaScript!");
      });
    }
  
    // Initially, activate the first tab (jQuery Tab) and hide others
    $('.tab').first().addClass('active');
    $('.tab-content').first().addClass('active');
    
    // Run the JavaScript tab functionality for the first time
    runJavaScriptTab();
  });
  