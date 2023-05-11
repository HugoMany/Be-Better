
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
function deleteCookie(cname){
    document.cookie = cname+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return true
}
function disconnect(){
    deleteCookie("id");
    return true;
}

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function isConnected(){
  if(getCookie("id")==""){
    if(document.location!="http://127.0.0.1:5500/Me/login/"){
      document.location="/Me/login/";
    }
    return false;
  }
  else{
    return getCookie("id");
  }
}

const varIsConnected = isConnected();