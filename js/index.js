//transações fictícias cadastradas (criadas manualmente)
var transactions = JSON.parse(localStorage.getItem("@ewallet/transactions")) || [];
  
{
  /*
   <tr>
      <td>Desenvolvimento</td>
      <td>R$ 5.000,00</td>
      <td class="green"><i data-feather="dollar-sign"></i>Venda</td>
      <td>13/08/2021</td>
    </tr> 
*/
}
var table = document.querySelector("#table tbody");

transactions.map((transaction) => {
  var row = document.createElement("tr");

  var title = document.createElement("td");
  title.append(transaction.title);

  var price = document.createElement("td");
  var value = moneyFormat(transaction.currency, transaction.price);
  price.append(value);

  var category = document.createElement("td");
  category.append(transaction.category);

  var date = document.createElement("td");
  date.append(transaction.date);

  row.appendChild(title);
  row.appendChild(price);
  row.appendChild(category);
  row.appendChild(date);

  table.appendChild(row);
});

var addBtn = document.querySelector("#addButton a");
var popup = document.querySelector("#popupbackground");
var closeBtn = document.querySelector("#popup form a");
var form =document.querySelector("form"); 

addBtn.addEventListener("click", () => {
  // O que vai acontecer quando clicar no botão adicionar
  popup.style.display = "flex";
  popup.style.transition = "display 5s";
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  popup.style.transition = "display 5s";
  form.reset();
});

form.addEventListener("submit", (event)=> {
  event.preventDefault();

  var formData = new FormData(event.target);
  var {title,currency,identifier,price,category} = Object.fromEntries(formData);
var date = new Date ( ).toLocaleDateString( );
  var transaction = { 
    title,
    price: parseFloat(price),
    category,
    currency,
    identifier,
    id:transactions.length + 1,
    date
  }
  transactions.push(transaction)
  localStorage.setItem("@ewallet/transactions", JSON.stringify(transactions));
   window.location.reload( );
   

});

function moneyFormat(currency, price) {
  var value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
  }).format(price);
  return value;
}
 