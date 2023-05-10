// function main(){
//     const permission= document.getElementById('push-permission')
//     if (
//     !permission && !('Notification 'in window) || 
//     !('serviceWorker' in navigator) || 
//     (Notification.permission != 'default')
//     ){
//         return;
//     }

//     const button = document.createElement('button')
//     button.innerText = 'Recevoir des notifcations'
//     permission.appendChild(button)
//     button.addEventListener('click', askPermission)
// }

// async function askPermission() {
//     const permission = await Notification.requestPermission();
//     console.log(permission)
//     if (permission === "granted") {
//       registerServiceWorker();
//     }
//   }

// async function registerServiceWorker(){
//     const registration = await navigator.serviceWorker.register('/sw.js')
// }
// main()
// function notifyMe() {
//     // Let's check if the browser supports notifications
//     if (!('Notification' in window)) {
//       console.log('This browser does not support desktop notification')
//     }
  
//     // Let's check whether notification permissions have alredy been granted
//     else if (Notification.permission === 'granted') {
//       // If it's okay let's create a notification
//       const notification = new Notification('Hi there!')
//     }
  
//     // Otherwise, we need to ask the user for permission
//     else if (
//       Notification.permission !== 'denied' ||
//       Notification.permission === 'default'
//     ) {
//       Notification.requestPermission((permission) => {
//         // If the user accepts, let's create a notification
//         if (permission === 'granted') {
//           const notification = new Notification('Hi there!')
//         }
//       })
//     }
  
//     At last, if the user has denied notifications, and you
//     want to be respectful there is no need to bother them any more.
//   }
  
  const button = document.querySelector("button")

  button.addEventListener("click",()=>{
    Notification.requestPermission().then(perm =>{
        if(perm === "granted"){
            const notification = new Notification("Example notification",{
                body:"This is more text",
                data:{hello:"world"},
                // icon:"img.png"
                tag: "Welcome Message",
            })
            notification.addEventListener("error" , e =>{
                alert("error")

            })
            
        }
    })
  })