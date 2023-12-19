var siteName = document.getElementById("SiteName");
var siteUrl = document.getElementById("SiteUrl");
var add = document.getElementById("add");
var icon_check = document.getElementById("icon-check");
var icon_error = document.getElementById("icon-error");
var icon_checkUrl = document.getElementById("icon-checkUrl");
var icon_errorUrl = document.getElementById("icon-errorUrl");
var exit = document.getElementById("exit");
var light_box = document.getElementsByClassName("light-box");
var nameRegex = /^[a-zA-Z0-9]+$/;
var urlPattern=/^[a-z]{1,8}.com$/

var array = [];

if (localStorage.getItem("website") != null){
    array= JSON.parse(localStorage.getItem("website"));
}

display();
///////////////////
//add ............
add.addEventListener("click", function () {
    var website = {
        name: siteName.value,
        url: siteUrl.value,
    }

    if(siteName.value==null||siteName.value=="" 
    ||siteName.value.length<3 
    || !nameRegex.test(siteName.value) ){
        console.log('error name')
        light_box[0].classList.remove("d-none");
    }
    else if (!urlPattern.test(siteUrl.value)){
        console.log(siteUrl.value)
        console.log('error url')
        light_box[0].classList.remove("d-none");
    }
    else{
        array.push(website);
        localStorage.setItem("website",JSON.stringify(array))
        clear();
        display();
        removeStyle();
    }
 

})
/////////////////////////////
//clear....................
function clear() {
    siteName.value = '';
    siteUrl.value = '';
}
///////////////////////////////////
// desplay ................
function display() {
    var cartona = "";
    for (var i = 0; i < array.length; i++) {
        cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${array[i].name}</td>
          <td>
             <button class="rounded px-3 py-2 visit">
              <a href="${array[i].url}" target="_blank">
              <i class="fa-solid fa-eye"></i>
              <span>Visit</span>
              </a>
             </button>
          </td>
        <td>
          <button  class="rounded px-3 py-2 delete" onclick='del(${i})'>
              <i class="fa-solid fa-trash"></i>
              <span>Delete</span>
          </button>
        </td>
      </tr>
        `
    }

    document.getElementById("content").innerHTML = cartona;
}
///////////////////////////////////
//delete .....................
function del(element) {
    array.splice(element, 1);
    localStorage.setItem("website",JSON.stringify(array))
    display();
}
///////////////

//check siteName ................
siteName.addEventListener('focus' , function(){
    if(siteName.style.border=='none'||siteName.style.border==' #FEC260 solid 1px'){
        siteName.style.border=' #FEC260 solid 1px';
        siteName.style.outline=' #fec16076 solid 4px' ;
    }

    siteName.addEventListener('input' , function(){
        if(siteName.value.length < 3  || !nameRegex.test(siteName.value)){
            siteName.style.border = "red solid 1px"
            siteName.style.outline = "4px solid rgba(255, 0, 0, 0.184)";
            icon_check.classList.add('d-none');
            icon_error.classList.remove('d-none');
        }
    
        else{
            icon_check.classList.remove('d-none')
            icon_error.classList.add('d-none');
            siteName.style.border = "green solid 1px"
            siteName.style.outline = "4px solid rgba(1, 107, 1, 0.135) ";
        }
    })
})

siteName.addEventListener('blur', function() {
    siteName.style.outline = "none";
});
////////////////////
// check url ......................
siteUrl.addEventListener('focus' , function(){
    if(siteUrl.style.border=='none'){
        siteUrl.style.border=' #FEC260 solid 1px';
        siteUrl.style.outline=' 4px solid #fec16076' ;
    }
    siteUrl.addEventListener('input' , function(){
        if(urlPattern.test(siteUrl.value)){
            icon_checkUrl.classList.remove('d-none')
            icon_errorUrl.classList.add('d-none');
            siteUrl.style.border = "green solid 1px"
            siteUrl.style.outline = "4px solid rgba(1, 107, 1, 0.135) ";
        }
        else{
            siteUrl.style.border = "red solid 1px"
            siteUrl.style.outline = "4px solid rgba(255, 0, 0, 0.184)";
            icon_checkUrl.classList.add('d-none');
            icon_errorUrl.classList.remove('d-none');
        }
    })
})

siteUrl.addEventListener('blur', function() {
    siteUrl.style.outline = "none";
});


/////////////
// rmove style ........
function removeStyle(){
    siteName.style.border = "none"
    siteName.style.outline = "none";
    icon_check.classList.add('d-none');
    icon_error.classList.add('d-none');
    siteUrl.style.border = "none"
    siteUrl.style.outline = "none";
    icon_checkUrl.classList.add('d-none');
    icon_errorUrl.classList.add('d-none');
}
/////////////////////////
exit.addEventListener("click",function(){
    light_box[0].classList.add("d-none");
})

document.addEventListener('click',function(e){
  if(e.target==light_box[0]){
    light_box[0].classList.add("d-none");
  }
;})