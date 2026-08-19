/* =========================================================
   ResumeAI - COMPLETE SCRIPT
   PDF BLANK PAGE FIXED
   Replace the ENTIRE script.js with this code.
   ========================================================= */

(function () {

    "use strict";

    /* =========================================================
       1. HELPER FUNCTIONS
       ========================================================= */

    function getValue(id, fallback) {
        const element = document.getElementById(id);

        if (!element) {
            return fallback || "";
        }

        return element.value ? element.value.trim() : "";
    }

    function escapeHTML(value) {
        if (!value) return "";

        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function textToHTML(value) {
        if (!value) return "";

        return escapeHTML(value)
            .replace(/\n/g, "<br>");
    }


    /* =========================================================
       2. TEMPLATE SYSTEM
       ========================================================= */

    let currentTemplate =
        localStorage.getItem("resumeai_selected_template") || "executive";


    function applyTemplate(template) {

        const preview =
            document.getElementById("resumePreview");

        if (!preview) return;

        const templates = [
            "executive",
            "ats",
            "minimal",
            "creative",
            "corporate",
            "fresher"
        ];

        templates.forEach(function (name) {
            preview.classList.remove("template-" + name);
        });

        if (!templates.includes(template)) {
            template = "executive";
        }

        currentTemplate = template;

        preview.classList.add("template-" + template);

        localStorage.setItem(
            "resumeai_selected_template",
            template
        );


        /* Active template button */

        document
            .querySelectorAll(".template-card")
            .forEach(function (card) {

                card.classList.remove("active");

                const onclick =
                    card.getAttribute("onclick") || "";

                if (
                    onclick.includes(
                        "'" + template + "'"
                    ) ||
                    onclick.includes(
                        '"' + template + '"'
                    )
                ) {
                    card.classList.add("active");
                }

            });
    }


    window.selectTemplate = function (template, button) {

        applyTemplate(template);

    };


    /* =========================================================
       3. GENERATE RESUME
       ========================================================= */

    window.generateResume = function () {

        const name =
            getValue("name", "Your Name");

        const email =
            getValue("email", "Email");

        const phone =
            getValue("phone", "Phone");

        const education =
            getValue(
                "education",
                "Education details"
            );

        const skills =
            getValue(
                "skills",
                "Skills"
            );

        const experience =
            getValue(
                "experience",
                "Experience details"
            );


        const preview =
            document.getElementById("resumePreview");

        if (!preview) {

            alert(
                "Resume Preview nahi mila."
            );

            return;
        }


        /* -----------------------------------------------------
           Create clean resume content
           ----------------------------------------------------- */

        preview.innerHTML = `

            <div class="pdf-resume-content">

                <h1
                    style="
                    font-size:34px;
                    margin:0 0 8px 0;
                    color:#111827;
                    font-weight:700;
                    "
                >
                    ${escapeHTML(name)}
                </h1>


                <p
                    style="
                    margin:0;
                    color:#64748b;
                    font-size:14px;
                    line-height:1.7;
                    "
                >
                    ${escapeHTML(email)}
                    &nbsp; | &nbsp;
                    ${escapeHTML(phone)}
                </p>


                <hr
                    style="
                    margin:20px 0;
                    border:0;
                    border-top:1px solid #dbe2ea;
                    "
                >


                <h3
                    style="
                    color:#2563eb;
                    margin:0 0 8px 0;
                    font-size:16px;
                    "
                >
                    PROFESSIONAL SUMMARY
                </h3>


                <p
                    style="
                    margin:0;
                    color:#334155;
                    line-height:1.7;
                    font-size:13px;
                    "
                >
                    ${escapeHTML(name)}
                    is a motivated and career-focused professional
                    with a strong interest in technology,
                    software development and continuous learning.
                    Passionate about building practical projects
                    and developing professional skills.
                </p>


                <h3
                    style="
                    color:#2563eb;
                    margin:22px 0 8px 0;
                    font-size:16px;
                    "
                >
                    EDUCATION
                </h3>


                <p
                    style="
                    margin:0;
                    color:#334155;
                    line-height:1.7;
                    font-size:13px;
                    "
                >
                    ${textToHTML(education)}
                </p>


                <h3
                    style="
                    color:#2563eb;
                    margin:22px 0 8px 0;
                    font-size:16px;
                    "
                >
                    SKILLS
                </h3>


                <p
                    style="
                    margin:0;
                    color:#334155;
                    line-height:1.7;
                    font-size:13px;
                    "
                >
                    ${textToHTML(skills)}
                </p>


                <h3
                    style="
                    color:#2563eb;
                    margin:22px 0 8px 0;
                    font-size:16px;
                    "
                >
                    EXPERIENCE / PROJECTS
                </h3>


                <p
                    style="
                    margin:0;
                    color:#334155;
                    line-height:1.7;
                    font-size:13px;
                    "
                >
                    ${textToHTML(experience)}
                </p>


                <div
                    style="
                    margin-top:30px;
                    padding-top:12px;
                    border-top:1px solid #e2e8f0;
                    color:#64748b;
                    font-size:11px;
                    "
                >
                    Resume generated with ResumeAI
                </div>

            </div>

        `;


        /* Apply selected template */

        applyTemplate(currentTemplate);


        /* Save resume data */

        const resumeData = {

            name: name,
            email: email,
            phone: phone,
            education: education,
            skills: skills,
            experience: experience,
            template: currentTemplate

        };


        localStorage.setItem(
            "resumeai_resume_data",
            JSON.stringify(resumeData)
        );


        /* Success message */

        const oldMessage =
            document.getElementById(
                "resumeSuccessMessage"
            );

        if (oldMessage) {
            oldMessage.remove();
        }


        const message =
            document.createElement("div");

        message.id =
            "resumeSuccessMessage";

        message.innerHTML =
            "✅ Resume generated successfully!";


        message.style.cssText = `
            margin-top:15px;
            padding:12px 15px;
            border-radius:10px;
            background:#dcfce7;
            color:#166534;
            font-size:14px;
            font-weight:600;
        `;


        const previewCard =
            document.querySelector(".preview-card");

        if (previewCard) {
            previewCard.prepend(message);
        }

    };


    /* =========================================================
       4. AI RESUME BUTTON
       ========================================================= */

    window.generateAIResume = function () {

        const experience =
            getValue(
                "experience",
                ""
            );

        const skills =
            getValue(
                "skills",
                ""
            );


        let aiExperience =
            experience;

        let aiSkills =
            skills;


        if (!aiExperience) {

            aiExperience =
                "Developed academic and personal projects to improve practical knowledge, problem-solving ability and technical skills.";

        }


        if (!aiSkills) {

            aiSkills =
                "Python, Java, C/C++, JavaScript, HTML, CSS, Web Development, Problem Solving";

        }


        const experienceInput =
            document.getElementById("experience");

        const skillsInput =
            document.getElementById("skills");


        if (experienceInput) {
            experienceInput.value =
                aiExperience;
        }


        if (skillsInput) {
            skillsInput.value =
                aiSkills;
        }


        window.generateResume();

    };


    /* =========================================================
       5. SAVE DATA AUTOMATICALLY
       ========================================================= */

    function saveFormData() {

        const data = {

            name:
                getValue("name", ""),

            email:
                getValue("email", ""),

            phone:
                getValue("phone", ""),

            education:
                getValue("education", ""),

            skills:
                getValue("skills", ""),

            experience:
                getValue("experience", ""),

            template:
                currentTemplate

        };


        localStorage.setItem(
            "resumeai_resume_data",
            JSON.stringify(data)
        );

    }


    function loadFormData() {

        const saved =
            localStorage.getItem(
                "resumeai_resume_data"
            );


        if (!saved) return;


        try {

            const data =
                JSON.parse(saved);


            if (document.getElementById("name")) {
                document.getElementById("name").value =
                    data.name || "";
            }


            if (document.getElementById("email")) {
                document.getElementById("email").value =
                    data.email || "";
            }


            if (document.getElementById("phone")) {
                document.getElementById("phone").value =
                    data.phone || "";
            }


            if (document.getElementById("education")) {
                document.getElementById("education").value =
                    data.education || "";
            }


            if (document.getElementById("skills")) {
                document.getElementById("skills").value =
                    data.skills || "";
            }


            if (document.getElementById("experience")) {
                document.getElementById("experience").value =
                    data.experience || "";
            }


            if (data.template) {
                currentTemplate =
                    data.template;
            }

        } catch (error) {

            console.log(
                "Saved resume data could not be loaded."
            );

        }

    }


    /* =========================================================
       6. ⭐ FINAL PDF DOWNLOAD
       BLANK PDF PROBLEM FIX
       ========================================================= */

    window.downloadPDF = async function () {

        const preview =
            document.getElementById("resumePreview");


        if (!preview) {

            alert(
                "Resume Preview nahi mila."
            );

            return;

        }


        if (
            !preview.innerText.trim()
        ) {

            alert(
                "Pehle Generate Resume par click karo."
            );

            return;

        }


        /* -----------------------------------------------------
           Check html2pdf library
           ----------------------------------------------------- */

        if (
            typeof window.html2pdf !==
            "function"
        ) {

            alert(
                "PDF library load nahi hui. Page ko refresh karke dobara try karo."
            );

            return;

        }


        /* -----------------------------------------------------
           Loading button
           ----------------------------------------------------- */

        const buttons =
            document.querySelectorAll(
                "button"
            );


        let downloadButton =
            null;


        buttons.forEach(function (button) {

            const text =
                button.innerText
                    .toLowerCase();


            if (
                text.includes("download") &&
                text.includes("pdf")
            ) {
                downloadButton =
                    button;
            }

        });


        const originalText =
            downloadButton
                ? downloadButton.innerText
                : "";


        if (downloadButton) {

            downloadButton.disabled =
                true;

            downloadButton.innerText =
                "⏳ Creating PDF...";

        }


        try {


            /* -------------------------------------------------
               IMPORTANT:
               Clone the VISIBLE preview.

               We DO NOT capture #pdfResume because
               it has display:none.
               ------------------------------------------------- */

            const pdfContainer =
                document.createElement(
                    "div"
                );


            pdfContainer.style.cssText = `
                position:fixed;
                left:-100000px;
                top:0;
                width:794px;
                min-height:1123px;
                background:#ffffff;
                color:#111827;
                padding:45px;
                box-sizing:border-box;
                z-index:-9999;
                overflow:visible;
                font-family:Arial, Helvetica, sans-serif;
            `;


            /* Clone only visible resume */

            const clonedResume =
                preview.cloneNode(true);


            clonedResume.removeAttribute(
                "id"
            );


            clonedResume.style.cssText = `
                display:block !important;
                visibility:visible !important;
                opacity:1 !important;
                position:static !important;
                width:100% !important;
                max-width:none !important;
                min-height:1030px;
                background:#ffffff !important;
                color:#111827 !important;
                box-sizing:border-box !important;
                overflow:visible !important;
                margin:0 !important;
                padding:0 !important;
                transform:none !important;
            `;


            /* Remove anything that should NOT be in PDF */

            clonedResume
                .querySelectorAll(
                    "button, input, textarea, select, .btn-primary, .btn-secondary"
                )
                .forEach(function (element) {

                    element.remove();

                });


            /* Remove hidden PDF element */

            const hiddenPDF =
                clonedResume.querySelector(
                    "#pdfResume"
                );


            if (hiddenPDF) {
                hiddenPDF.remove();
            }


            pdfContainer.appendChild(
                clonedResume
            );


            document.body.appendChild(
                pdfContainer
            );


            /* -------------------------------------------------
               Force all content visible
               ------------------------------------------------- */

            clonedResume
                .querySelectorAll("*")
                .forEach(function (element) {

                    const style =
                        element.style;

                    if (
                        style.display ===
                        "none"
                    ) {
                        style.display =
                            "block";
                    }

                    style.visibility =
                        "visible";

                    style.opacity =
                        "1";

                });


            /* -------------------------------------------------
               Small delay allows browser to render clone
               ------------------------------------------------- */

            await new Promise(
                function (resolve) {

                    setTimeout(
                        resolve,
                        300
                    );

                }
            );


            /* -------------------------------------------------
               PDF SETTINGS
               ------------------------------------------------- */

            const options = {

                margin: [
                    0,
                    0,
                    0,
                    0
                ],

                filename:
                    "ResumeAI_Professional_Resume.pdf",

                image: {
                    type: "jpeg",
                    quality: 0.98
                },

                html2canvas: {

                    scale: 2,

                    useCORS: true,

                    allowTaint: false,

                    backgroundColor:
                        "#ffffff",

                    logging: false,

                    imageTimeout:
                        15000,

                    scrollX: 0,

                    scrollY: 0,

                    windowWidth: 794,

                    windowHeight: 1123

                },

                jsPDF: {

                    unit: "px",

                    format: [
                        794,
                        1123
                    ],

                    orientation:
                        "portrait"

                },

                pagebreak: {

                    mode: [
                        "css",
                        "legacy"
                    ]

                }

            };


            /* -------------------------------------------------
               GENERATE PDF
               ------------------------------------------------- */

            await window
                .html2pdf()
                .set(options)
                .from(pdfContainer)
                .save();


            /* -------------------------------------------------
               Remove temporary element
               ------------------------------------------------- */

            pdfContainer.remove();


            if (downloadButton) {

                downloadButton.disabled =
                    false;

                downloadButton.innerText =
                    originalText ||
                    "Download Professional PDF";

            }


        } catch (error) {

            console.error(
                "PDF ERROR:",
                error
            );


            /* Remove temporary element */

            const temporary =
                document.querySelector(
                    'div[style*="-100000px"]'
                );


            if (temporary) {
                temporary.remove();
            }


            if (downloadButton) {

                downloadButton.disabled =
                    false;

                downloadButton.innerText =
                    originalText ||
                    "Download Professional PDF";

            }


            alert(
                "PDF create nahi ho paya. Page ko refresh karke dobara try karo."
            );

        }

    };


    /* =========================================================
       7. PAGE LOAD
       ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {


            /* Load saved information */

            loadFormData();


            /* Apply saved template */

            applyTemplate(
                currentTemplate
            );


            /* -------------------------------------------------
               Template card click support
               ------------------------------------------------- */

            document
                .querySelectorAll(
                    ".template-card"
                )
                .forEach(function (card) {

                    card.addEventListener(
                        "click",
                        function () {

                            const onclick =
                                card.getAttribute(
                                    "onclick"
                                ) || "";


                            const match =
                                onclick.match(
                                    /selectTemplate\(['"]([^'"]+)/
                                );


                            if (
                                match &&
                                match[1]
                            ) {

                                applyTemplate(
                                    match[1]
                                );

                            }

                        }
                    );

                });


            /* -------------------------------------------------
               Auto-save fields
               ------------------------------------------------- */

            document
                .querySelectorAll(
                    "#name, #email, #phone, #education, #skills, #experience"
                )
                .forEach(function (input) {

                    input.addEventListener(
                        "input",
                        saveFormData
                    );

                });


            /* -------------------------------------------------
               If saved data exists, generate preview
               ------------------------------------------------- */

            const saved =
                localStorage.getItem(
                    "resumeai_resume_data"
                );


            if (saved) {

                try {

                    const data =
                        JSON.parse(saved);


                    if (
                        data.name ||
                        data.email ||
                        data.phone ||
                        data.education ||
                        data.skills ||
                        data.experience
                    ) {

                        setTimeout(
                            function () {

                                window.generateResume();

                            },
                            100
                        );

                    }

                } catch (error) {

                    console.log(
                        "Resume preview auto-load skipped."
                    );

                }

            }

        }
    );


})();
