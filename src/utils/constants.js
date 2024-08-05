export const COLORS = {
  red: "#ef4444",
  organge: "#f97316",
  green: "#10b981",
  indigo: "#4f46e5",
  voilet: "#8b5cf6",
  pink: "#f472b6",
};

export const SAMPLE_CODE = {
  html: `
  <div class="container">
    <h1 id="greating">Welcome! to Diskettes</h1>
    <button id="btn">Click me</button>
  </div>
  `,
  css: `
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,body{
    height: 100vh;
    width: 100%;
  }
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: #011627;
    color: white;
  }
  #btn{
  padding: 5px 15px;
  border-radius: 30px;
  margin-top: 12px;
  }      
  `,
  javascript: `
  const btn = document.getElementById('btn');
  const greating = document.getElementById('greating');
  btn.addEventListener('click', (e) => {
    greating.innerHTML = "Create something cool Champ!"
    })
  `,
};

export const LANGUAGES = ["html", "css", "javascript"];
