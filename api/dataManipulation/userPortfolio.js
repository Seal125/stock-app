async function isValidTicker(strValue) {
  try {
    const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${strValue}/price?token=Tpk_18b14453d61745afbd4ff1def2a3b51d`);
    const data = await response.json();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function userBalance() {
  const balance = {
    method: 'GET',
    headers: {
      token: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch('/user/balance', balance);
  const userBal = await response.json();
  return userBal;
};

userBalance().then((balance) => {
  const header = document.getElementByClassName('portfolio-title')
  header.innerText += balance.toFixed(2);
  header.innerText += ')';
});

const shares = document.getElementById('sharesForm');
shares.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (await isValidTicker(shares.ticker.value)) {
    const userBal = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      },
      body: JSON.stringify({
        ticker: shares.ticker.value.toUpperCase(),
        shares: shares.shares.value,
      })
    };

    fetch('/buyingShares', userBal)
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  } else {
    const err = document.createElement('p');
    err.innerText = 'Invalid ticker.';
    err.style.color = 'red';
    buySharesForm.appendChild(errorEl);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
});

async function getUserStockInfo() {
  const stocks = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token')
    }
  };
  const response = await fetch('/userTransactions/stock', stock);
  const data = await response.json();
  return data;
};

async function portfolioData(tbodyId) {
  const stockInfo = await getUserStockInfo();
  const clearData = stockInfo.map((stock) => ({
    ticker: stock.ticker,
    quantity: stock.quantity,
  }));
  const tbody = document.getElementById(tbodyId);

  for (let i = 0; i < clearData.length; i++) {
    const tRow = document.createElement('tr');
    for (const data in clearData[i]) {
      const tData = document.createElement('td');
      tData.innerText = clearData[i][data];
      tRow.appendChild(tData);
    }

    const portData = document.createElement('td');
    portData.setAttribute('id', clearData[i].ticker);
    portData.setAttribute('class', 'priceData');
    tRow.appendChild(portData);
    tBody.appendChild(tRow);
  }
};

portfolioData('portfolio');

const updatePrice = window.setInterval(updatePrice, 3000, 'priceData');

async function updatePriceData(name) {
  try {
    const priceSections = document.querySelectorAll(`.${name}`);
    for (const section of priceSections) {
      const ticker = section.id;
      const firstPrice = await getFirstPrice(ticker);
      const price = await getPrice(ticker);
      section.style.color = firstPrice > price ? 'green' : 'red';
      section.innerText = `$${price}`;
    }
  } catch (err) {
    console.log('There was an error updating the price.', err);
  }
}

async function getPrice(ticker) {
  try {
    const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/price?token=Tpk_18b14453d61745afbd4ff1def2a3b51d`);
    const data = await req.json();
    return data;
  } catch (err) {
    console.log('There was an error fetching the ticker price.', err);
  }
}

async function getFirstPrice(ticker) {
  try {
    const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/price?token=Tpk_18b14453d61745afbd4ff1def2a3b51d`);
    const data = await response.json();
    return data.open;
  } catch (err) {
    console.warn('There was an error fetching the first ticker price.', err);
  }
}