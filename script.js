var pics = ["./assets/image-3.jpg","./assets/image.jpg"];
var thumbContainer = document.querySelector(".thumbContainer")
var imgContainer = document.querySelector(".imgContainer");
var sideBar = document.querySelector(".sidebar");
var rangeInput = document.querySelector(".rangeinput");
var propertyDOM = document.querySelector(".propertyDOM");
var addImageDiv = document.querySelector(".addImageDiv");
var rangeDivContainer = document.querySelector(".rangeDivContainer");
var togglePanelBtn=document.querySelector(".togglePanelBtn")

var addUrlBtn = document.querySelector(".addUrlBtn")
var imageurlInput = document.querySelector("#imageurl")


function printPics(){
    var html=""
    pics.forEach(p=>(
        html += 
        `<div onclick=grabPic(this) class='thumbBox'>
        <img src=${p} class='thumbimage' alt='img'/>
        </div>`
    ))

    thumbContainer.innerHTML=html;
}



function printButtons(){
    var html=""
    buttons.forEach(b=>(
        html += 
        `<button onclick=pickProperty('${b.name}') class='propertyBtn'>
        ${b.name}
        </button>`
    ))

    sideBar.innerHTML=html;
}


printPics()
printButtons()

function grabPic(e){
    imgContainer.innerHTML=""
    console.log(e.children[0])
    let img = document.createElement("img");
    img.setAttribute("src",e.children[0].getAttribute('src'))
    img.className='containerImg'
    console.log(img)

     imgContainer.appendChild(img);
    
}




function pickProperty(property){
    // console.log(property)
//set name on DOM
    propertyDOM.innerHTML=property

// find propertyObj to assign min/max
    let idx = buttons.findIndex(btn=>btn.name === property)
    let currentProp = buttons[idx]

    rangeInput.setAttribute("min",buttons[idx].min)
    rangeInput.setAttribute("max",buttons[idx].max)
}



rangeInput.oninput=(e)=>{
    if(propertyDOM.textContent === "??" || propertyDOM.textContent === "Please select a propety with a option button! :)"){
        propertyDOM.textContent = "Please select a propety with a option button! :)"
        return;
    }
    console.log(this.rangeInput.value)

    let idx = buttons.findIndex(btn=>btn.name === propertyDOM.textContent)
    let child = imgContainer.children[0]
    let currentProp = buttons[idx]


    if(idx > 2){
    console.log(buttons[idx])
    console.log(child)
    child.style.filter=`${currentProp.property}(${this.rangeInput.value}${currentProp.unit})`
    }
        else{

            switch(idx){

                case 0:
                    child.style.height=`${this.rangeInput.value}${currentProp.unit}`
                break;

                case 1:
                    child.style.width=`${this.rangeInput.value}${currentProp.unit}`
                break;

                case 2:
                    child.style.borderRadius=`${this.rangeInput.value}${currentProp.unit}`
                break;
                

            }
        }
}


togglePanelBtn.onclick=()=>{
    addImageDiv.classList.toggle("hide-addImageDiv")

    if(addImageDiv.textContent.includes("Add")){
        addImageDiv.textContent = "Adjust Settings"
    }
}



addUrlBtn.onclick=()=>{
    console.log('are we working?')
    console.log(imageurlInput.value)

    document.querySelector(".containerImg").setAttribute("src",imageurlInput.value)
}

