function fillTable(transactions) {
  const tBody = document.getElementById('transaction-info')
  for (let i = 0; i < transactions.length; i++) {
    const tRow = document.createElement('tr')
    for (const data in transactionsArr[i]) {
      const td = document.createElement('td')
      td.innerText = transactionsArr[i][data]
      tRow.appendChild(td)
    }
    tBody.appendChild(tRow)
  }
}

window.addEventListener('load', async () => {
  const transactions = {
    method: 'POST',
    headers: {
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch('/transactions', transactionsInit)
  const transactionData = await response.json()
  const clearTransaction = transactionData.map(transaction => {
    return {
      ticker: transaction.ticker,
      quantity: transaction.quantity,
      cost: transaction.cost.toFixed(2),
      date: transaction.date
    }
  })
  fillTable(clearTransaction)
});