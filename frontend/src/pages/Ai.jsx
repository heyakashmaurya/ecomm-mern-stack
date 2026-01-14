import React, { useContext, useState } from 'react'
import ai from "../assets/ai.avif"
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Open from "../assets/open.wav";

function Ai() {
    let {showSearch, setShowSearch} = useContext(shopDataContext)
    let [activeAi, setActiveAi] = useState(false);    
    let navigate = useNavigate();

    const speak  = (message) => {
        let utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
    }

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    if(!recognition) {
        console.log("Speech Recognition Not Supported");
        return;
    }

    recognition.onresult = function(e) {
        const transcript = e.results[0][0].transcript.trim();

        if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch){
            speak("Opening Search Bar");
            setShowSearch(true);
            navigate("/collection");
        }
        else if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showSearch){
            speak("Closing Search Bar");
            setShowSearch(false);
        }
        else if(transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("shop") ||  transcript.toLowerCase().includes("store") || transcript.toLowerCase().includes("products") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("browse") || transcript.toLowerCase().includes("buy") || transcript.toLowerCase().includes("shopping") || transcript.toLowerCase().includes("open shop") || transcript.toLowerCase().includes("open store") || transcript.toLowerCase().includes("open products") || transcript.toLowerCase().includes("open product") || transcript.toLowerCase().includes("open browse") || transcript.toLowerCase().includes("open buy") || transcript.toLowerCase().includes("open shopping")){
            speak("Opening Collection  Page");
            navigate("/collection");
        }
        else if(transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("main") || transcript.toLowerCase().includes("dashboard") || transcript.toLowerCase().includes("go back") || transcript.toLowerCase().includes("open home") || transcript.toLowerCase().includes("open main") || transcript.toLowerCase().includes("open dashboard") || transcript.toLowerCase().includes("go to home")){
            speak("Opening Home Page");
            navigate("/");
        }
        else if(transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("my cart") || transcript.toLowerCase().includes("shopping cart") || transcript.toLowerCase().includes("open cart") || transcript.toLowerCase().includes("go to cart")){
            speak("Opening Cart Page");
            navigate("/cart");
        }
        else if(transcript.toLowerCase().includes("help") || transcript.toLowerCase().includes("support") || transcript.toLowerCase().includes("contact") || transcript.toLowerCase().includes("contact us") || transcript.toLowerCase().includes("open contact") || transcript.toLowerCase().includes("open support") || transcript.toLowerCase().includes("open help")){
            speak("Opening Contact Page");
            navigate("/contact");
        }
        else if(transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("about us") || transcript.toLowerCase().includes("open about") || transcript.toLowerCase().includes("go to about")){
            speak("Opening About Page");
            navigate("/about");
        }
           
        else if(transcript.toLowerCase().includes("place order") || transcript.toLowerCase().includes("checkout") || transcript.toLowerCase().includes("go to checkout") || transcript.toLowerCase().includes("open checkout") || transcript.toLowerCase().includes("open place order")){
            speak("Opening Place Order Page");
            navigate("/placeorder");
        }
        else if(transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("my orders") || transcript.toLowerCase().includes("my orders page") || transcript.toLowerCase().includes("my order page") || transcript.toLowerCase().includes("order history") || transcript.toLowerCase().includes("open orders") || transcript.toLowerCase().includes("go to orders")){
            speak("Opening Orders Page");
            navigate("/order");
        }
        else if(transcript.toLowerCase().includes("stop listening") || transcript.toLowerCase().includes("stop ai") || transcript.toLowerCase().includes("deactivate ai") || transcript.toLowerCase().includes("turn off ai")){
            speak("Deactivating Voice Assistant");
            recognition.stop();
        }  
        else if(transcript.toLowerCase().includes("thank you") || transcript.toLowerCase().includes("thanks")){
            speak("You are welcome!");
        }   
        else{
            speak("Sorry, I did not understand that command. Please try again.");
        }

    }

    recognition.onend = function() {
        setActiveAi(false);
    }


  return (
    <div className=' fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]  '>

      <img src={ai} alt=""  className={`md:w-[100px] w-[70px] cursor-pointer rounded-full ${activeAi? "translate-x-[10] translate-y-[-10] scale-125  " : 'translate-x-[0] translate-y-[0] scale-100  ' } transition-transform   `} style={ {
        filter: `${activeAi ? "drop-shadow( 0px 0px 30px red)" : "drop-shadow(0px 0px 20px black)  " } `
      } } onClick={() => {recognition.start(); 
        new Audio(Open).play();
        setActiveAi(true);
      }}/>
      
    </div>
  )
}

export default Ai
