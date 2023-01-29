const containerEl = document.querySelector("#container");
function loadProducts(){
  fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => renderData(data))
  .catch(err => console.error(err))
}

loadProducts()

function renderData(postData){
  containerEl.innerHTML = '';
  postData.forEach(p => {
    const postDiv = document.createElement("div");
    postDiv.className = "post-element"
    postDiv.innerHTML = `
    <img src="${p.image}" alt="">
    <div class="card__items">
        <p class="card__items__p">Price: ${p.price}</p>
        <p class="card__items__p">Discount: ${p.rating.count}</p>
        <p class="card__items__p">Decs: ${p.description}</p>
        <p class="card__items__p">Name: ${p.title}</p>
    </div>
    <i id="icon" class="fa-regular fa-trash-can"></i>
    `
    containerEl.appendChild(postDiv);
  })
};
containerEl.addEventListener("click", (event) => {
    if(event.target.classList.contains("fa-trash-can")){
      const postId = event.target.dataset.postDeleteId;
      const isCustomerAgreed = confirm("Are you sure to delete this?")
        if(postId && isCustomerAgreed){
          fetch(`https://api.escuelajs.co/api/v1/products/${postId}`, {
          method: 'DELETE'
        }).then(response => {
          if(response){
            loadProducts()
          }
        })
      }
    }
    })