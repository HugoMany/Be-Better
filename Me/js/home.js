

function isLogin(){
    if(getCookie("id")==null){
        document.location.url=document.location="/Me/login/";
        return false
    }
    else{
        return true
    }
}