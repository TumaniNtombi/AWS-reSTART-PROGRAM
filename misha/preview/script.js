function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function mockLogin() {
  alert("Login will connect to AWS Cognito in next phase");
  showPage('dashboard');
}
