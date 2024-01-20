const getData = async () => {
  const data = []; //array vacio para push
  const arrayCoins = [
    { name: "bitcoin", image: "./img/btc.png" },
    { name: "ethereum", image: "./img/eth.png" },
    { name: "binance-coin", image: "./img/bnb.png" },
    { name: "solana", image: "./img/solana.png" },
    { name: "xrp", image: "./img/xrp.png" },
    { name: "usd-coin", image: "./img/usd.png" },
    { name: "cardano", image: "./img/cardano.png" },
    { name: "avalanche", image: "./img/avalanche.png" },
    { name: "polkadot", image: "./img/polkadot.png" },
    { name: "polygon", image: "./img/polygon.png" },
    { name: "chainlink", image: "./img/chainlink.png" },
    { name: "near-protocol", image: "./img/near.png" },
  ];
  
  for (let i = 0; i < arrayCoins.length; i++) {
    const coin = arrayCoins[i].name;
    const response = await fetch(`https://api.coincap.io/v2/assets/${coin}`);
    const result = await response.json();
    const formattedPrice = parseFloat(result.data.priceUsd).toFixed(2);
    const formattedPricePercent = parseFloat(result.data.changePercent24Hr).toFixed(2); // metodo para formatear precio
    const color = formattedPricePercent > 0 ? 'green' : 'red';
    
    data.push({
      id: result.data.id,
      priceUsd: formattedPrice,
      image: arrayCoins[i].image,
      explorer : result.data.explorer,
      changePercent24Hr :formattedPricePercent,
      color:color,
    });
  }

  mappeoDato(data);
};


const mappeoDato = (data) => {
  console.log(data);
  const dataMappeada = data.map((response) => ({
    id: response.id,
    priceUsd: response.priceUsd,
    image: response.image,
    explorer : response.explorer,
    changePercent24Hr : response.changePercent24Hr,
    color:response.color,
  }));

  printGallery(dataMappeada);
};

const printGallery = (dataPrint) => {
  console.log(dataPrint);

  dataPrint.forEach((response) => {
    console.log(response.explorer)
    const colorStyle = `color: ${response.color};`
    const figure = `
    
      <figure>
        <img src="${response.image}" alt="${response.id}" />
        <h3>${response.id}</h3>
        <p>Precio: $${response.priceUsd}</p>
        <a target="_blank" href=${response.explorer}> Explorer <a>
        <p style="${colorStyle}">Cambio 24h ${response.changePercent24Hr}%</p>
      </figure>
      
    `;
    document.querySelector("#app").innerHTML += figure;
  });
};

getData();
