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
    const formattedPrice = parseFloat(result.data.priceUsd).toFixed(2); // metodo para formatear precio
    data.push({
      id: result.data.id,
      priceUsd: formattedPrice,
      image: arrayCoins[i].image,
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
  }));

  printGallery(dataMappeada);
};

const printGallery = (dataPrint) => {
  console.log(dataPrint);

  dataPrint.forEach((response) => {
    const figure = `
    <a id="api" href="https://api.coincap.io/v2/assets">
      <figure>
        <img src="${response.image}" alt="${response.id}" />
        <h3>${response.id}</h3>
        <p>Precio: $${response.priceUsd}</p>
      </figure>
      <a>
    `;
    document.getElementById("app").innerHTML += figure;
  });
};

getData();
