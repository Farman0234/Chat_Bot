function sendMessage(){

  let input = document.getElementById("userInput").value.trim().toLowerCase();
  let chatBox = document.getElementById("chat")  

  if (input === "" ){
    return;
  }

  chatBox.innerHTML += `<div><b>You 🤵:</b>${input}</div>`;


  //bot response

  let reply = "";

  if (input.includes("hi") || input.includes("hello")){
    reply ="👋 Hello! How Can i help you"
  }else if(input.includes("how are you")){
    reply = "😊 I am Fine! What About you "
  }else if(input.includes("fine")){
    reply = "😘 Good "
  }else if (input.includes("help me learn java srcipt")){
    reply ="Yes i am help to learn java script you can Start with basics: variables, functions, arrays. Then practice daily!"
  }else if (input.includes("Bye And Thank you")){
    reply = "😍 Good By have a nice day"
  }else{
    reply="🤔 Sorry i cannot understand your message"
  }
    
  chatBox.innerHTML += `<div><b>Bot 🤖:</b>${reply}</div>`;
  
  //clear input
  document.getElementById("userInput").value = "";


}
