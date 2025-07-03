* {
    box-sizing: border-box;
  }
  
  body {
    background-color: #000;
    font-family: 'Helvetica Neue', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
  
  .calculator {
    width: 320px;
    background-color: #1c1c1c;
    border-radius: 30px;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  }
  
  .display {
    width: 100%;
    height: 80px;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 2.5em;
    text-align: right;
    padding: 20px 10px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  
  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }
  
  .btn {
    height: 70px;
    font-size: 1.5em;
    border: none;
    border-radius: 50%;
    background-color: #333;
    color: white;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .btn:active {
    filter: brightness(1.2);
  }
  
  .top-btn {
    background-color: #a5a5a5;
    color: black;
  }
  
  .operator {
    background-color: #ff9f0a;
    color: white;
  }
  
  .equal {
    background-color: #ff9f0a;
    color: white;
  }
  
  .zero {
    grid-column: span 2;
    border-radius: 40px;
    text-align: left;
    padding-left: 28px;
  }
  