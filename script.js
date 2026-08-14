function generateResume() {
  const name = document.getElementById('name').value || 'Your Name';
  const email = document.getElementById('email').value || 'your@email.com';
  const phone = document.getElementById('phone').value || '+91 9876543210';
  const education = document.getElementById('education').value || 'Your education details';
  const skills = document.getElementById('skills').value || 'Your professional skills';
  const experience = document.getElementById('experience').value || 'Your work experience';

  document.getElementById('resumePreview').innerHTML = `
    <div style="font-family:Arial,sans-serif;color:#111827;padding:10px;">
      <h1 style="font-size:32px;margin-bottom:5px;">${name}</h1>
      <p style="color:#374151;margin-bottom:15px;">${email} | ${phone}</p>

      <hr style="margin:20px 0;">

      <h2 style="color:#2563eb;font-size:20px;margin-bottom:10px;">Professional Summary</h2>
      <p style="line-height:1.6;">
        Motivated and career-focused professional with strong communication skills,
        technical knowledge, and a passion for continuous learning. Seeking
        opportunities to contribute effectively in a growth-oriented organization.
      </p>

      <h2 style="color:#2563eb;font-size:20px;margin:20px 0 10px;">Education</h2>
      <p style="line-height:1.6;">${education}</p>

      <h2 style="color:#2563eb;font-size:20px;margin:20px 0 10px;">Skills</h2>
      <p style="line-height:1.6;">${skills}</p>

      <h2 style="color:#2563eb;font-size:20px;margin:20px 0 10px;">Experience</h2>
      <p style="line-height:1.6;">${experience}</p>

      <h2 style="color:#2563eb;font-size:20px;margin:20px 0 10px;">Projects</h2>
      <ul style="padding-left:18px;line-height:1.8;">
        <li>AI-powered Resume Builder</li>
        <li>Professional Portfolio Website</li>
        <li>Responsive Web Application</li>
      </ul>
      function downloadPDF() {
  const element = document.getElementById('resumePreview');

  const options = {
    margin: 0.5,
    filename: 'ResumeAI_Professional_Resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true
    },
    jsPDF: {
      unit: 'in',
      format: 'a4',
      orientation: 'portrait'
    }
  };

  html2pdf().set(options).from(element).save();
}
// 30-day free trial system
function checkTrialStatus() {
  const trialStart = localStorage.getItem('trialStartDate');

  if (!trialStart) {
    localStorage.setItem('trialStartDate', new Date().toISOString());
    return true;
  }

  const startDate = new Date(trialStart);
  const currentDate = new Date();

  const diffTime = currentDate - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return true;
  }

  return false;
}

function updateTrialBanner() {
  const banner = document.getElementById('trialBanner');
  if (!banner) return;

  const trialStart = localStorage.getItem('trialStartDate');
  if (!trialStart) {
    banner.innerHTML = '🎉 30-Day Free Trial Active';
    return;
  }

  const startDate = new Date(trialStart);
  const currentDate = new Date();
  const diffDays = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
  const remaining = 30 - diffDays;

  if (remaining > 0) {
    banner.innerHTML = `🎉 Free Trial: ${remaining} days remaining`;
  } else {
    banner.innerHTML = '⚠️ Free trial expired — ₹20 per resume';
    banner.style.background = '#dc2626';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  checkTrialStatus();
  updateTrialBanner();
});
function verifyPayment() {

  const templateParams = {
    user_name: "ResumeAI Customer",
    user_email: "customer@email.com",
    user_phone: "+91 0000000000",
    payment_status: "Paid ₹20",
    payment_time: new Date().toLocaleString()
  };

  emailjs.send(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
    templateParams
  ).then(function() {

    alert("Payment request submitted successfully! Your PDF will be unlocked after verification.");

    localStorage.setItem("paymentVerified", "true");

  }).catch(function(error) {

    alert("Payment verification failed. Please try again.");

    console.log(error);

  });

}


      <h2 style="color:#2563eb;font-size:20px;margin:20px 0 10px;">Languages</h2>
      <p>English, Hindi</p>
    </div>
  `;
}
