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

      <h2 style="color:#2563eb;font-size:20px;margin:20px 0 10px;">Languages</h2>
      <p>English, Hindi</p>
    </div>
  `;
}
