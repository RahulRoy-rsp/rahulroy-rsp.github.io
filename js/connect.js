document.getElementById('redirectConn').addEventListener('click', () => {
  const footerConnect = document.getElementById('footer-connect');
  if (footerConnect) {
    footerConnect.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' // Aligns to top of the section
    });
  }
});