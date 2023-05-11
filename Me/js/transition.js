function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

function transition(url){
    scroll(0,0)
    document.getElementById("animEnd").style.opacity="1"
    document.getElementById("animEnd").style["z-index"]="50"
    document.getElementsByTagName("html")[0].style.overflowY="hidden"
  
    delay(500).then(() =>location.href = url);
  
  
  }

function animStart(){
    // if(document.getElementById("indexBack")!=null){
    //   document.getElementById("indexBack").style.height=window.screen.availHeight+"px";
    // }    
    if(document.getElementById("title")!=null){
      delay(500).then(() =>
      {
        document.getElementById("title").style.transform=" translateY(0)";
        document.getElementById("title").style.opacity="1";
      })
    }
    delay(200).then(() =>  document.getElementById("animStart").style.opacity="0" )
    delay(1000).then(() =>  document.getElementById("animStart").style.display="none" )
    delay(1000).then(() => document.getElementsByTagName("html")[0].style.overflowY="visible")

}
const start= animStart()