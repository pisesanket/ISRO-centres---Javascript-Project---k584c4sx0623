


class FlagValue{
    constructor(flag){
        this.flag = flag;
    }
    putFlag(flag){
        this.flag = flag;
    }
    getFlag(){
        return this.flag;
    }
}
//toggle category button with 
let clickedCategoryBtn = undefined;
const buttons = document.querySelectorAll('.category-button');
let flagName = new FlagValue(false);
let flagState = new FlagValue(false);
let flagPlace = new FlagValue(false);

buttons.forEach(button => {
    let btns = button;
    button.addEventListener('click', (event) => {
        let classList = event.target.classList.value.split(" ");//to check if target element is already active or not;
        if(event.target.attributes[0].value=='Place'){
            flagState.putFlag(false);
            flagName.putFlag(false);
            if(classList.length == 3){
                flagPlace.putFlag(true); 
            }
            else{ 
                flagPlace.putFlag(false);
                clickedCategoryBtn = event;
            } 
                    
        }else if(event.target.attributes[0].value=='State'){
            flagPlace.putFlag(false);
            flagName.putFlag(false);
            if(classList.length == 3){ 
                flagState.putFlag(true);  
            }else{
                flagState.putFlag(false);
                clickedCategoryBtn = event;    
            }
        }else if(event.target.attributes[0].value=='name'){
            flagState.putFlag(false);
            flagPlace.putFlag(false);
            if(classList.length == 3) {
                flagName.putFlag(true);
            }else{
                clickedCategoryBtn = event;
                flagName.putFlag(false);       
            }
        }
                
        //making all the category buttion inactive ;  
        buttons.forEach(btn => {
            btn.classList.remove('category-btn-active');
        });
    
        if(event.target.attributes[0].value=='Place'&&flagPlace.getFlag()==true){
            flagPlace.putFlag(false);
            clickedCategoryBtn = undefined;
        }else if(event.target.attributes[0].value=='State'&&flagState.getFlag()==true){
            flagState.putFlag(false);
            clickedCategoryBtn = undefined;
        }else if(event.target.attributes[0].value=='name'&&flagName.getFlag()==true){
            flagName.putFlag(false);
            clickedCategoryBtn = undefined;  
        }else{
            btns.classList.add('category-btn-active');//making targeted button active if its already active;
        }
    });
  });

let data;
const contentSection = document.getElementById('content');

//function to fetch all data from api;
async function fetchData(){
    data = await fetch('https://isro.vercel.app/api/centres').then(response=>{
        return response.json();     
    }).then(data=>{
        return data;
    }).catch(error=>{
        console.log(error);
    })
    return data;
}
//function to append to html from data when need to show all data;
async function showAllData(){
    contentSection.innerHTML='';
    let centre = await fetchData();
    centre["centres"].forEach(ele=>{
        let divEle = document.createElement('div');
        divEle.classList.add('table');
        divEle.innerHTML=`<div id="first-row" class="table-row">
        <div class="first-column table-data">CENTER</div>
        <div class="second-column table-data">CITY</div>
        <div class="third-column table-data">STATE</div>
    </div>
    <div id="second-row" class="table-row">
        <div class="first-column table-data">${ele.name}</div>
        <div class="second-column table-data">${ele.Place}</div>
        <div class="third-column table-data">${ele.State}</div>
    </div>`;
    contentSection.appendChild(divEle);
    }) 
}

//function to append data to html when target and category is provided;
async function showFilterData(target,category){
    contentSection.innerHTML='';
    let centre = await fetchData();
    centre["centres"].forEach(ele=>{
        if(ele[category].toLowerCase()==target.toLowerCase()){
                let divEle = document.createElement('div');
                divEle.classList.add('table');
                divEle.innerHTML=`<div id="first-row" class="table-row">
                <div class="first-column table-data">CENTER</div>
                <div class="second-column table-data">CITY</div>
                <div class="third-column table-data">STATE</div>
            </div>
            <div id="second-row" class="table-row">
                <div class="first-column table-data">${ele.name}</div>
                <div class="second-column table-data">${ele.Place}</div>
                <div class="third-column table-data">${ele.State}</div>
            </div>`;
            contentSection.appendChild(divEle);
        }
    }) 
}


async function addToContent(target,category){
    if(category==undefined&&target==''){
        await showAllData();  
    }else if(category==undefined){
        await showAllData();
    }
    else if(target==''){
        await showAllData();
    }else{
        showFilterData(target,category)
    }
}

//adding event listener to search button
let searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click',()=>{
    let input = document.getElementById('input-box').value;
    if(clickedCategoryBtn==undefined){
        addToContent(input,clickedCategoryBtn);
    }else{
        addToContent(input,clickedCategoryBtn.target.attributes[0].value)
    }
})

addToContent('',undefined)
