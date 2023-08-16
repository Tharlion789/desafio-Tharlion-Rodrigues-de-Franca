const productPrices = {
  1: 3.00, //valor do café
  2: 1.50, //valor do chantily
  3: 6.20, //valor do suco natural
  4: 6.50, //valor do sanduiche
  5: 2.00, //valor do queijo
  6: 7.50, //valor do salgado
};

const selectedIndividualProducts = [];

function addIndividualProduct() {
  const selectedProductIndex = document.getElementById("productSelect").value;
  if (selectedProductIndex !== "0") {
    const selectedProductName = document.getElementById("productSelect").options[selectedProductIndex].text;
    const selectedProductPrice = productPrices[selectedProductIndex];

    selectedIndividualProducts.push({ name: selectedProductName, price: selectedProductPrice });

    const extratoTable = document.getElementById("extratoTable");
    const newRow = extratoTable.insertRow();
    newRow.innerHTML = `
      <td><strong>${selectedProductName}</strong></td>
      <td><strong>R$${selectedProductPrice.toFixed(2)}</strong></td>
    `;

    updateTotal();
  }
}

function calculateTotal() {
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  const comboCheckbox = document.getElementById("comboCheckbox");
  const juiceComboCheckbox = document.getElementById("juiceComboCheckbox");

  let totalPrice = 0;
//combo café + sanduiche
  if (comboCheckbox.checked) {
    const comboPrice = (productPrices[1] + productPrices[4]) * 0.785; // 21.5% de desconto
    totalPrice += comboPrice;
  }
//combo suco + sanduiche
  if (juiceComboCheckbox.checked) {
    const juiceComboPrice = (productPrices[3] + productPrices[4]) * 0.747; // 25.3% de desconto
    totalPrice += juiceComboPrice;
  }
//seletor de prodrutos
  selectedIndividualProducts.forEach(product => {
    totalPrice += product.price;
  });

  if (!comboCheckbox.checked && !juiceComboCheckbox.checked && selectedIndividualProducts.length === 0) {
    alert("Selecione pelo menos um combo ou produtos individuais para calcular o valor total.");
    return;
  }
//metodos de pagamento
  if (paymentMethod === "dinheiro") {
    totalPrice *= 0.95; // 5% de desconto
  } else if (paymentMethod === "credito") {
    totalPrice *= 1.03; // 3% de acréscimo
  }

  document.getElementById("totalValue").textContent = `Valor Total: R$${totalPrice.toFixed(2)}`;
}

function updateTotal() {
  let totalPrice = 0;
  selectedIndividualProducts.forEach(product => {
    totalPrice += product.price;
  });

  document.getElementById("totalValue").textContent = `Valor Total: R$${totalPrice.toFixed(2)}`;
}