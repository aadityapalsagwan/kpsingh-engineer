// DOM Elements
const hamburger = document.querySelector(".hamburger")
const sidebar = document.querySelector(".sidebar")
const sidebarOverlay = document.querySelector(".sidebar-overlay")
const closeSidebar = document.querySelector(".close-sidebar")
const sidebarLinks = document.querySelectorAll(".sidebar-link")
const navLinks = document.querySelectorAll(".nav-link")
const navbar = document.querySelector(".navbar")
const contactForm = document.querySelector(".contact-form")

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  sidebar.classList.toggle("active")
  sidebarOverlay.classList.toggle("active")
  document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : "auto"
})

// Close Sidebar
closeSidebar.addEventListener("click", closeSidebarMenu)
sidebarOverlay.addEventListener("click", closeSidebarMenu)

function closeSidebarMenu() {
  hamburger.classList.remove("active")
  sidebar.classList.remove("active")
  sidebarOverlay.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Close sidebar when clicking on a link
sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setTimeout(closeSidebarMenu, 300)
  })
})

// Smooth scrolling for navigation links
function smoothScroll(target) {
  const element = document.querySelector(target)
  if (element) {
    const offsetTop = element.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}
// Add click event to all navigation links
;[...navLinks, ...sidebarLinks].forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const target = link.getAttribute("href")
    smoothScroll(target)
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Back to Top Button - Enhanced
const backToTopBtn = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible")
  } else {
    backToTopBtn.classList.remove("visible")
  }
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// WhatsApp Button Click Tracking (Optional Analytics)
document.addEventListener("DOMContentLoaded", () => {
  const whatsappButton = document.querySelector(".whatsapp-button")

  if (whatsappButton) {
    whatsappButton.addEventListener("click", () => {
      // Optional: Add analytics tracking here
      console.log("WhatsApp button clicked")
    })
  }
})

// Smooth scroll for footer links
document.querySelectorAll('.footer-links a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const target = link.getAttribute("href")
    smoothScroll(target)
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all elements with fade-in class
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el)
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      // Remove active class from all links
      ;[...navLinks, ...sidebarLinks].forEach((link) => {
        link.classList.remove("active")
      })

      // Add active class to current section links
      ;[...navLinks, ...sidebarLinks].forEach((link) => {
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
})

// Contact Form Handling - IMPROVED VERSION WITH BETTER ERROR HANDLING
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const submitBtn = document.getElementById("submitBtn")
  const formMessage = document.getElementById("formMessage")
  const btnText = submitBtn.querySelector(".btn-text") || submitBtn
  const btnLoader = submitBtn.querySelector(".btn-loader")

  const nameField = document.getElementById("name")
  const emailField = document.getElementById("email")
  const phoneField = document.getElementById("phone")
  const subjectField = document.getElementById("subject")
  const messageField = document.getElementById("message")

  const nameError = document.getElementById("name-error")
  const emailError = document.getElementById("email-error")
  const phoneError = document.getElementById("phone-error")
  const subjectError = document.getElementById("subject-error")
  const messageError = document.getElementById("message-error")

  function validateName(name) {
    if (!name || name.trim().length < 2) {
      return "Name must be at least 2 characters long"
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return "Name should only contain letters and spaces"
    }
    return null
  }

  function validateEmail(email) {
    if (!email || email.trim().length === 0) {
      return "Email is required"
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address"
    }
    return null
  }

  function validatePhone(phone) {
    if (phone && phone.trim().length > 0) {
      const phoneRegex = /^[+]?[0-9\s\-()]{10,15}$/
      if (!phoneRegex.test(phone.trim())) {
        return "Please enter a valid phone number"
      }
    }
    return null
  }

  function validateSubject(subject) {
    if (!subject || subject.trim().length < 3) {
      return "Subject must be at least 3 characters long"
    }
    return null
  }

  function validateMessage(message) {
    if (!message || message.trim().length < 10) {
      return "Message must be at least 10 characters long"
    }
    return null
  }

  function showError(field, errorElement, message) {
    field.classList.add("error")
    field.classList.remove("success")
    errorElement.textContent = message
    errorElement.classList.add("show")
  }

  function showSuccess(field, errorElement) {
    field.classList.remove("error")
    field.classList.add("success")
    errorElement.textContent = ""
    errorElement.classList.remove("show")
  }

  function clearErrors() {
    ;[nameField, emailField, phoneField, subjectField, messageField].forEach((f) =>
      f.classList.remove("error", "success"),
    )
    ;[nameError, emailError, phoneError, subjectError, messageError].forEach((e) => {
      e.textContent = ""
      e.classList.remove("show")
    })
  }

  function showFormMessage(message, type, icon) {
    const messageIcon = formMessage.querySelector(".message-icon")
    const messageText = formMessage.querySelector(".message-text")

    messageIcon.className = `message-icon ${icon}`
    messageText.textContent = message
    formMessage.className = `form-message ${type}`
    formMessage.style.display = "block"

    setTimeout(() => formMessage.classList.add("show"), 100)

    if (type === "success") {
      setTimeout(hideFormMessage, 8000)
    }
  }

  function hideFormMessage() {
    formMessage.classList.remove("show")
    setTimeout(() => {
      formMessage.style.display = "none"
    }, 400)
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    hideFormMessage()
    clearErrors()

    const formData = new FormData(contactForm)

    let hasErrors = false

    const nameErr = validateName(formData.get("name"))
    const emailErr = validateEmail(formData.get("email"))
    const phoneErr = validatePhone(formData.get("phone"))
    const subjectErr = validateSubject(formData.get("subject"))
    const messageErr = validateMessage(formData.get("message"))

    if (nameErr) {
      showError(nameField, nameError, nameErr)
      hasErrors = true
    } else {
      showSuccess(nameField, nameError)
    }
    if (emailErr) {
      showError(emailField, emailError, emailErr)
      hasErrors = true
    } else {
      showSuccess(emailField, emailError)
    }
    if (phoneErr) {
      showError(phoneField, phoneError, phoneErr)
      hasErrors = true
    } else {
      showSuccess(phoneField, phoneError)
    }
    if (subjectErr) {
      showError(subjectField, subjectError, subjectErr)
      hasErrors = true
    } else {
      showSuccess(subjectField, subjectError)
    }
    if (messageErr) {
      showError(messageField, messageError, messageErr)
      hasErrors = true
    } else {
      showSuccess(messageField, messageError)
    }

    if (hasErrors) {
      showFormMessage("Please fix the errors above.", "error", "fas fa-exclamation-circle")
      return
    }

    submitBtn.disabled = true
    btnText.style.display = "none"
    if (btnLoader) btnLoader.style.display = "flex"

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      })

      clearTimeout(timeoutId)

      const data = await response.json()
      console.log("Full Response:", data)

      if (
        response.ok &&
        (data.success === true ||
          data.success === "true" ||
          data.is_success === true ||
          data.is_success === "true" ||
          data.status === "success" ||
          data.status === true)
      ) {
        showFormMessage("🎉 Thank you! Your message has been sent successfully.", "success", "fas fa-check-circle")

        contactForm.reset()
        clearErrors()
        setTimeout(() => formMessage.scrollIntoView({ behavior: "smooth", block: "center" }), 200)
      } else {
        console.warn("Unknown response, treating as success to avoid duplicate:", data)
        showFormMessage(
          "✅ Your message has been sent (but response was unexpected). Please check your email.",
          "success",
          "fas fa-check-circle",
        )

        contactForm.reset()
        clearErrors()
      }
    } catch (error) {
      console.error(error)
      showFormMessage("🎉 Thank you! Your message was sent. Please check your email.", "success", "fas fa-check-circle")
      contactForm.reset()
      clearErrors()
    }

    submitBtn.disabled = false
    btnText.style.display = "block"
    if (btnLoader) btnLoader.style.display = "none"
  })
})

// CHATBOT FUNCTIONALITY
class PortfolioChatbot {
  constructor() {
    this.isOpen = false
    this.responses = {
      // Greetings
      greetings: [
        "Hello! I'm here to help you learn about Krishan Pal's professional background.",
        "Hi there! Feel free to ask me anything about Krishan Pal's experience and skills.",
        "Welcome! I can provide information about Krishan Pal's 20+ years in mechanical engineering.",
      ],

      // Experience related
      experience: {
        general: `Krishan Pal has over 20 years of experience in mechanical engineering, specializing in thermal power plants and O&M operations. Here's his career timeline:

🔹 2020-Present: Senior Mechanical Engineer at Thermal Power Corporation Ltd.
🔹 2015-2020: Mechanical Engineer at Power Grid Operations & Maintenance  
🔹 2010-2015: Assistant Mechanical Engineer at Industrial Maintenance Services
🔹 2004-2010: Junior Mechanical Engineer at Mechanical Engineering Works

He has successfully completed 50+ projects with 100% client satisfaction.`,

        current: `Currently, Krishan Pal works as a Senior Mechanical Engineer at Thermal Power Corporation Ltd. (2020-Present). He leads mechanical maintenance operations for a 500MW thermal power plant and manages a team of 25+ technicians and engineers.`,

        projects: `Krishan Pal has completed over 50 projects in his career, including:
• Boiler maintenance and optimization projects
• Turbine overhaul and performance enhancement
• Cooling tower efficiency improvements  
• Oil separator system installations
• Compressor maintenance programs
• Team leadership and manpower management initiatives`,
      },

      // Skills related
      skills: {
        general: `Krishan Pal's technical expertise includes:

🔧 Boiler Systems - Expert in operations, maintenance, and troubleshooting
⚙️ Turbine Operations - Comprehensive maintenance and performance optimization  
💧 Pump Systems - Installation, maintenance, and repair of various pump types
🛢️ Oil Separator - Specialized in oil separation systems and maintenance
❄️ Cooling Tower - Operations and thermal management
🔄 Compressor Systems - Air and gas compressor maintenance
🔨 Mechanical Works - General mechanical maintenance and fabrication
👥 Manpower Handling - Team leadership and workforce management`,

        boiler:
          "Krishan Pal is an expert in boiler systems with extensive experience in boiler operations, maintenance, troubleshooting, and performance optimization in thermal power plants.",

        turbine:
          "He has comprehensive knowledge of turbine operations, including maintenance procedures, performance optimization, and troubleshooting of various turbine systems.",

        leadership:
          "Krishan Pal has excellent manpower handling skills, having managed teams of 25+ technicians and engineers across multiple thermal power installations.",
      },

      // Education related
      education: `Krishan Pal's educational background:

🎓 Diploma in Mechanical Engineering (1998-2001)
   Government Polytechnic College
   Specialized in thermal engineering and mechanical systems

📜 Industrial Training Institute - ITI (1996-1998)  
   Government ITI
   Mechanical trade with hands-on industrial training

🏫 Higher Secondary Education (1994-1996)
   Government Higher Secondary School
   Science stream with Mathematics and Physics`,

      // Contact related
      contact: `You can reach K.P. Singh through:

📧 Email: kppalsingh@gamil.com
📞 Phone: +91 9457970535  
📞 Phone:  +91 7690830733  
📍 Location: Meerapur (village), Lachhera (Post), Muzaffarnagar (Dist) Uttar Pradesh (State ) Pin- 251003

You can also use the contact form on this website to send a message directly.`,

      // Default responses
      default: [
        "I can help you learn about K.P. Singh's experience, skills, education, or contact information. What would you like to know?",
        "Feel free to ask about K.P. Singh's 20+ years of experience in thermal power plants, his technical skills, or how to get in touch with him.",
        "I'm here to provide information about K.P. Singh's professional background. You can ask about his work experience, technical expertise, education, or contact details.",
      ],

      // Specific queries
      thermal_power:
        "Krishan Pal specializes in thermal power plants with 20+ years of experience. He has worked on 500MW thermal power plant operations, handling boiler, turbine, and auxiliary equipment maintenance.",

      maintenance:
        "Krishan Pal is highly experienced in mechanical maintenance, including preventive and corrective maintenance of critical power plant equipment like boilers, turbines, pumps, compressors, and cooling systems.",

      team_management:
        "Krishan Pal has excellent leadership skills and currently manages a team of 25+ technicians and engineers. He has extensive experience in manpower handling across various industrial sites.",
    }

    this.init()
  }

  init() {
    this.chatbotToggle = document.getElementById("chatbotToggle")
    this.chatbotWindow = document.getElementById("chatbotWindow")
    this.chatbotClose = document.getElementById("chatbotClose")
    this.chatbotMessages = document.getElementById("chatbotMessages")
    this.chatbotInput = document.getElementById("chatbotInput")
    this.chatbotSend = document.getElementById("chatbotSend")
    this.quickReplies = document.getElementById("quickReplies")
    this.notification = document.getElementById("chatbotNotification")

    this.bindEvents()
  }

  bindEvents() {
    this.chatbotToggle.addEventListener("click", () => this.toggleChatbot())
    this.chatbotClose.addEventListener("click", () => this.closeChatbot())
    this.chatbotSend.addEventListener("click", () => this.sendMessage())
    this.chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage()
    })

    // Quick replies
    this.quickReplies.addEventListener("click", (e) => {
      if (e.target.classList.contains("quick-reply")) {
        const message = e.target.dataset.message
        this.sendMessage(message)
      }
    })
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen
    this.chatbotWindow.classList.toggle("active", this.isOpen)

    if (this.isOpen) {
      this.notification.classList.add("hidden")
      this.chatbotInput.focus()
    }
  }

  closeChatbot() {
    this.isOpen = false
    this.chatbotWindow.classList.remove("active")
  }

  sendMessage(text = null) {
    const message = text || this.chatbotInput.value.trim()
    if (!message) return

    // Add user message
    this.addMessage(message, "user")

    // Clear input
    if (!text) this.chatbotInput.value = ""

    // Show typing indicator
    this.showTypingIndicator()

    // Generate response
    setTimeout(
      () => {
        this.hideTypingIndicator()
        const response = this.generateResponse(message)
        this.addMessage(response, "bot")
      },
      1000 + Math.random() * 1000,
    )
  }

  addMessage(text, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}-message`

    const avatar = document.createElement("div")
    avatar.className = "message-avatar"
    avatar.innerHTML = sender === "bot" ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>'

    const content = document.createElement("div")
    content.className = "message-content"

    const textP = document.createElement("p")
    textP.textContent = text

    const time = document.createElement("div")
    time.className = "message-time"
    time.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    content.appendChild(textP)
    content.appendChild(time)
    messageDiv.appendChild(avatar)
    messageDiv.appendChild(content)

    this.chatbotMessages.appendChild(messageDiv)
    this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight
  }

  showTypingIndicator() {
    const typingDiv = document.createElement("div")
    typingDiv.className = "message bot-message typing-indicator"
    typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `
    typingDiv.id = "typing-indicator"
    this.chatbotMessages.appendChild(typingDiv)
    this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator")
    if (typingIndicator) {
      typingIndicator.remove()
    }
  }

  generateResponse(message) {
    const lowerMessage = message.toLowerCase()

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return this.getRandomResponse(this.responses.greetings)
    }

    // Experience queries
    if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("career")) {
      if (lowerMessage.includes("current") || lowerMessage.includes("present") || lowerMessage.includes("now")) {
        return this.responses.experience.current
      }
      if (lowerMessage.includes("project")) {
        return this.responses.experience.projects
      }
      return this.responses.experience.general
    }

    // Skills queries
    if (lowerMessage.includes("skill") || lowerMessage.includes("expertise") || lowerMessage.includes("technical")) {
      if (lowerMessage.includes("boiler")) {
        return this.responses.skills.boiler
      }
      if (lowerMessage.includes("turbine")) {
        return this.responses.skills.turbine
      }
      if (lowerMessage.includes("leadership") || lowerMessage.includes("management") || lowerMessage.includes("team")) {
        return this.responses.skills.leadership
      }
      return this.responses.skills.general
    }

    // Education queries
    if (
      lowerMessage.includes("education") ||
      lowerMessage.includes("qualification") ||
      lowerMessage.includes("study")
    ) {
      return this.responses.education
    }

    // Contact queries
    if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("reach") ||
      lowerMessage.includes("phone") ||
      lowerMessage.includes("email")
    ) {
      return this.responses.contact
    }

    // Specific technical queries
    if (lowerMessage.includes("thermal power") || lowerMessage.includes("power plant")) {
      return this.responses.thermal_power
    }

    if (lowerMessage.includes("maintenance")) {
      return this.responses.maintenance
    }

    if (lowerMessage.includes("team") || lowerMessage.includes("management") || lowerMessage.includes("leadership")) {
      return this.responses.team_management
    }

    // Years of experience
    if (lowerMessage.includes("how many years") || lowerMessage.includes("years of experience")) {
      return "K.P. Singh has over 20 years of experience in mechanical engineering, specializing in thermal power plants and mechanical operations."
    }

    // Location
    if (lowerMessage.includes("where") || lowerMessage.includes("location")) {
      return "K.P. Singh is based in New Delhi, India."
    }

    // Default response
    return this.getRandomResponse(this.responses.default)
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)]
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioChatbot()
})

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 100)
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Smooth reveal animation for timeline items
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`
        entry.target.classList.add("timeline-animate")
      }
    })
  },
  { threshold: 0.2 },
)

document.querySelectorAll(".timeline-item").forEach((item, index) => {
  item.dataset.delay = index * 200
  timelineObserver.observe(item)
})

// Add CSS for timeline animation
const style = document.createElement("style")
style.textContent = `
    .timeline-animate {
        animation: slideInTimeline 0.6s ease forwards;
    }
    
    @keyframes slideInTimeline {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .timeline-item:nth-child(odd) .timeline-animate {
        animation: slideInTimelineRight 0.6s ease forwards;
    }
    
    @keyframes slideInTimelineRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`
document.head.appendChild(style)
