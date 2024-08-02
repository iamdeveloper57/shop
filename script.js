const onSearch = () =>{
    const input = document.querySelector(".input");
    const filter = input.value.toUpperCase();
    
    const list = document.querySelectorAll(".card");
    list.forEach((el) => {
        const text = el.textContent.toUpperCase();
        
      if(text.includes(filter)){
        el.style.display = ""
      }
      else{
        el.style.display = "none"
        
      }
    
    });
    
    };
    
    document.querySelector("input").addEventListener("input", onSearch);