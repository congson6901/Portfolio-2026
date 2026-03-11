/* --- FILE: main.js (BẢN FINAL VÔ ĐỊCH - UPDATE MENU VIDEO) --- */

/* 1. KHAI BÁO HTML DÙNG CHUNG */
const HEADER_HTML = `
<header>
    <div class="container" style="align-items: center;">
        <div class="col-6" style="display: flex; justify-content: space-between; align-items: center;">
            <a href="index.html" style="font-weight: 600; font-size: 1.2rem; z-index: 1003;">Hopesama.</a>
            <button class="hamburger-btn">
                <svg class="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6H20M4 12H20M4 18H20"/></svg>
            </button>
        </div>
        <div class="col-6">
            <nav class="nav-links">
                <a href="index.html" class="nav-link" data-link="work">Work</a>
                <a href="about.html" class="nav-link" data-link="about">About</a>
                <a href="contact.html" class="nav-link" data-link="contact">Contact</a>
                <button class="theme-btn">Dark</button>
            </nav>
        </div>
    </div>
</header>
`;

const FOOTER_HTML = `
<footer>
    <div class="container">
        <div class="col-6 footer-cta">
            <h2 class="footer-title">Let's create something<br>extraordinary.</h2>
            <a href="mailto:congsondesigner@gmail.com" class="footer-email">congsondesigner@gmail.com</a>
        </div>
        <div class="col-6 footer-nav-wrapper">
            <div class="footer-cols">
                <div class="footer-col">
                    <h4>Menu</h4>
                    <div class="footer-links">
                        <a href="index.html" class="footer-link">Work</a>
                        <a href="about.html" class="footer-link">About</a>
                        <a href="contact.html" class="footer-link">Contact</a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Socials</h4>
                    <div class="footer-links">
                        <a href="https://www.behance.net/sonnguyenc1" class="footer-link" target="_blank">Behance</a>
                        <a href="https://www.facebook.com/congson6901" class="footer-link" target="_blank">Facebook</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="footer-bottom"><span>© 2026 Hopesama Portfolio. All rights reserved.</span></div>
        </div>
    </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
    
    /* 2. BƠM HEADER/FOOTER VÀO TRANG */
    const headerContainer = document.getElementById("app-header");
    const footerContainer = document.getElementById("app-footer");

    if (headerContainer) headerContainer.innerHTML = HEADER_HTML;
    if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;

    // Active menu logic
    const currentPath = window.location.pathname;
    const navLinksItems = document.querySelectorAll(".nav-link");
    navLinksItems.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (currentPath.includes(href) || (currentPath.endsWith("/") && href === "index.html")) {
            link.classList.add("active");
        }
        if (currentPath.includes("project-") && href === "index.html") {
            link.classList.add("active");
        }
    });

    // Cập nhật năm
    const footerYear = document.querySelector(".footer-bottom span");
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerText = `© ${currentYear} Hopesama Portfolio. All rights reserved.`;
    }

    /* 3. XỬ LÝ THEME */
    const body = document.body;
    const themeBtns = document.querySelectorAll(".theme-btn"); 
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        themeBtns.forEach(btn => btn.innerText = "Light");
    } else {
        themeBtns.forEach(btn => btn.innerText = "Dark");
    }
    themeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const isDarkNow = body.classList.toggle("dark-mode");
            localStorage.setItem("theme", isDarkNow ? "dark" : "light");
            themeBtns.forEach(b => b.innerText = isDarkNow ? "Light" : "Dark");
        });
    });

    /* 4. XỬ LÝ MENU MOBILE */
    const navLinks = document.querySelector(".nav-links");
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    
    if (hamburgerBtn && navLinks) {
        const newBtn = hamburgerBtn.cloneNode(true);
        hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);
        newBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            const isOpen = navLinks.classList.contains("open");
            body.style.overflow = isOpen ? "hidden" : "";
            newBtn.style.color = isOpen ? "var(--text-color)" : "";
        });
        document.querySelectorAll('.nav-links .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove("open");
                body.style.overflow = "";
                newBtn.style.color = "";
            });
        });
    }

    /* 5. CON TRỎ & ANIMATION */
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");
    const isDesktop = window.matchMedia("(min-width: 993px)").matches;
    const hasGSAP = typeof gsap !== 'undefined';

    if (isDesktop && hasGSAP && cursorDot && cursorOutline) {
        body.classList.add("mouse-active");
        cursorDot.style.visibility = "visible";
        cursorOutline.style.visibility = "visible";
        gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
        gsap.set(cursorOutline, { xPercent: -50, yPercent: -50 });
        let xTo = gsap.quickTo(cursorOutline, "left", { duration: 0.5, ease: "power3" });
        let yTo = gsap.quickTo(cursorOutline, "top", { duration: 0.5, ease: "power3" });
        window.addEventListener("mousemove", (e) => {
            gsap.set(cursorDot, { left: e.clientX, top: e.clientY });
            xTo(e.clientX);
            yTo(e.clientY);
        });
        document.body.addEventListener('mouseover', (e) => {
            const target = e.target.closest('a, button, input, textarea, .project-item, .submit-btn, .card, blockquote');
            if (target) {
                cursorOutline.classList.add("cursor-hover");
                gsap.to(cursorDot, { opacity: 0, duration: 0.2 });
            } else {
                cursorOutline.classList.remove("cursor-hover");
                gsap.to(cursorDot, { opacity: 1, duration: 0.2 });
            }
        });
    }

    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.2, smooth: true });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
    
    if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        const fadeIns = document.querySelectorAll(".fade-in");
        if(fadeIns.length > 0) {
            gsap.from(fadeIns, { y: 30, opacity: 0, duration: 1, delay: 0.2, stagger: 0.1 });
        }
        gsap.utils.toArray(".fade-up").forEach(el => {
            gsap.from(el, {
                y: 50, opacity: 0, duration: 0.8, ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 85%" }
            });
        });
    }

    /* 6. XỬ LÝ GỬI EMAIL (FORMSPREE) */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const submitBtn = document.getElementById("submit-btn");
            const formStatus = document.getElementById("form-status");
            const formData = new FormData(contactForm);

            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Đang gửi...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;
            formStatus.innerText = "";

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    submitBtn.innerText = "Đã gửi thành công!";
                    submitBtn.style.backgroundColor = "#4BB543"; 
                    submitBtn.style.color = "#fff";
                    formStatus.innerText = "Cảm ơn bạn! Hopesama sẽ phản hồi sớm nhất.";
                    formStatus.style.color = "green";
                    contactForm.reset(); 
                    setTimeout(() => {
                        submitBtn.innerText = originalBtnText;
                        submitBtn.style.backgroundColor = "";
                        submitBtn.style.color = "";
                        submitBtn.style.opacity = "1";
                        submitBtn.disabled = false;
                        formStatus.innerText = "";
                    }, 5000);
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerText = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.innerText = "Có lỗi xảy ra, vui lòng thử lại.";
                        }
                        submitBtn.innerText = "Gửi thất bại";
                        submitBtn.style.backgroundColor = "#ff3333"; 
                        formStatus.style.color = "red";
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = "1";
                    });
                }
            }).catch(error => {
                formStatus.innerText = "Lỗi kết nối mạng! Hãy thử lại.";
                formStatus.style.color = "red";
                submitBtn.innerText = "Thử lại";
                submitBtn.style.backgroundColor = "#ff3333";
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
            });
        });
    }
});