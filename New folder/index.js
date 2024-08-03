var siteNameInput=document.getElementById("bookMarkSite");
var siteURLInput=document.getElementById("bookMarkURL");
var searchSiteInput=document.getElementById('siteSearchProduct');
var updateInput=document.getElementById('updateProduct');
var tableInput=document.getElementById("tableContent");
var addInputs=document.getElementById('submitBtn');
var clsButton=document.getElementById('closeBtn');
var boxInfo=document.getElementById('boxInfo');
var boxTot=document.getElementById('hih');


productList=[];
if (localStorage.getItem("product")!==null){
    productList=JSON.parse(localStorage.getItem("product"))
        displayData();
    
    }





function addProduct() {
  if(validateInputs(siteNameInput,'msgName')&&validateInputs(siteURLInput,'msgURL'))
  {
    product={
      code:siteNameInput.value,
      url:siteURLInput.value
  };
  productList.push(product);
  localStorage.setItem("product",JSON.stringify(productList));
  clearForm();
  displayData();
  }
  else{
    boxTot.innerHTML=`
   <div class="box-info position-absolute start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center" id="boxInfo">
    <div class="box-conent bg-white p-4 rounded-2 shadow-lg">
      <header class="box-header w-100 d-flex justify-content-between align-items-center mb-4">
        <div class="circles d-flex">
          <span class="rounded-circle me-2"><i class="fa-solid fa-circle"></i></span>
          <span class="rounded-circle me-2"><i class="fa-solid fa-circle"></i></span>
          <span class="rounded-circle me-2"><i class="fa-solid fa-circle"></i></span>
        </div>
        <button class="btn border-0 " id="closeBtn" onclick="closeButton()">
          <i class="fa-solid fa-xmark close fs-3"></i>
        </button>
      </header>
      <p class="m-0 pb-2">
        Site Name or Url is not valid, Please follow the rules below :
      </p>
      <ol class="rules list-unstyled m-0">
        <li>
          <i class="fa-regular fa-circle-right p-2"></i>Site name must
          contain at least 3 characters
        </li>
        <li>
          <i class="fa-regular fa-circle-right p-2"></i>Site URL must be a
          valid one
        </li>
      </ol>
    </div>
  </div>
   `
  }
   
   
   
   
    
}



function visitSite(index){
window.open(productList[index].url,'-blank')
}

function clearForm() {
    siteNameInput.value='';
    siteURLInput.value='';
    siteNameInput.classList.remove('is-valid')
    siteURLInput.classList.remove('is-valid')
}
function displayData()  {
    var cartoona= ` `;
    
    for (var i=0;i<productList.length;i++){
    cartoona+=`<tr>
                <td>${i+1}</td>
                <td>${productList[i].code}</td>   
                <td>
                  <button onclick="setFormUpdate(${i})" class="btn btn-outline-warning">
                    <i class="fa-solid fa-eye pe-2"></i>Update
                  </button>
                </td>           
                <td>
                  <button class="btn btn-outline-success"  onclick="visitSite(${i})">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-outline-danger pe-2" onclick="deleteProduct(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
    
    `
    }
    
tableInput.innerHTML=cartoona;  
}

function deleteProduct(deletedIndex){
    productList.splice(deletedIndex,1);
    displayData();
    localStorage.setItem("product",JSON.stringify(productList));
    clearForm();
    returnUpdate();
}

function searchProduct(){
    var term=searchSiteInput.value;
    var cartona=``;
for(var i=0 ;i<productList.length;i++){
    if(productList[i].code.toLowerCase().includes(term.toLowerCase())==true){
       
 cartona+=`<tr>
                <td>${i+1}</td>
                <td>${productList[i].code}</td>   
                <td>
                  <button class="btn btn-outline-warning" onclick="setFormUpdate${i}" data-index="0">
                    <i class="fa-solid fa-eye pe-2"></i>Update
                  </button>
                </td>           
                <td>
                  <button class="btn btn-outline-success" data-index="0">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-outline-danger pe-2" onclick="deleteProduct(${i})" data-index="0">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>`
    }
}
tableInput.innerHTML=cartona;
}


var UpdateIndex;
function setFormUpdate(i){
    UpdateIndex=i;
    addInputs.classList.add("d-none");
    updateInput.classList.remove("d-none");
siteNameInput.value=productList[i].code;
siteURLInput.value=productList[i].url;
}



function updateProducted(){
    productList[UpdateIndex].code=siteNameInput.value;
    productList[UpdateIndex].url=siteURLInput.value;
    displayData();
    localStorage.setItem("product",JSON.stringify(productList));
clearForm();
replaceUpdate();
}
function closeButton(){
  hih.classList.replace('d-flex','d-none');

}



function replaceUpdate(){
    addInputs.classList.remove("d-none");
    updateInput.classList.add("d-none");
}


function returnUpdate(){
  addInputs.classList.remove("d-none");
  updateInput.classList.add("d-none");
}



function validateInputs(element,msgID){
  var msg=document.getElementById(msgID)
    var regexInputs={
        bookMarkSite:/^.{3,}$/,
        bookMarkURL:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }

  if(regexInputs[element.id].test(element.value)==true){
    element.classList.add('is-valid');
   element.classList.remove('is-invalid');
   msg.classList.add('d-none')
   return true
  }
  else{
   element.classList.add('is-invalid');
   element.classList.remove('is-valid');
   msg.classList.remove('d-none')

   return false
  }
}

