const getData = async () => {
  const data = []; //array vacio para push
  const arrayCoins = [
    { name: "bitcoin", image: "./img/btc.png" },
    { name: "ethereum", image: "./img/eth.png" },
    { name: "tether", image: "./img/tether.png" },
    { name: "binance-coin", image: "./img/bnb.png" },
    { name: "solana", image: "./img/solana.png" },
    { name: "usd-coin", image: "./img/usd.png" },
    { name: "xrp", image: "./img/xrp.png" },
    { name: "cardano", image: "./img/cardano.png" },
    { name: "avalanche", image: "./img/avalanche.png" },
    { name: "dogecoin", image: "./img/dogecoin.png" },
    { name: "tron", image: "./img/tron.png" },
    { name: "polkadot", image: "./img/polkadot.png" },
    { name: "chainlink", image: "./img/chainlink.png" },
    { name: "polygon", image: "./img/polygon.png" },
    { name: "wrapped-bitcoin", image: "./img/btc.png" },
    { name: "shiba-inu", image: "./img/shiba.png" },
    { name: "multi-collateral-dai", image: "./img/dai.png" },
    { name: "litecoin", image: "./img/ltc.png" },
    { name: "internet-computer", image: "./img/icp.png" },
    { name: "bitcoin-cash", image: "./img/bch.png" },
    { name: "uniswap", image: "./img/uniswap.png" },
    { name: "unus-sed-leo", image: "./img/unus.png" },
    { name: "ethereum-classic", image: "./img/etc.png" },
    { name: "stellar", image: "./img/xlm.png" },
    { name: "okb", image: "./img/okb.png" },
    { name: "near-protocol", image: "./img/near.png" },
    { name: "monero", image: "./img/monero.png" },
    { name: "filecoin", image: "./img/filecoin.png" },
    { name: "injective-protocol", image: "./img/inj.png" },
    { name: "lido-dao", image: "./img/lido.png" },
    { name: "cosmos", image: "./img/cosmos.png" },
    { name: "bitcoin-bep2", image: "./img/btc.png" },
    { name: "crypto-com-coin", image: "./img/cro.png" },
    { name: "stacks", image: "./img/stx.png" },
    { name: "vechain", image: "./img/vet.png" },
    { name: "trueusd", image: "./img/tusd.png" },

   
  
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
      rank : result.data.rank
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
    rank:response.rank
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
        <a target="_blank" href=${response.explorer}> Blockchain Explorer <a>
        <p style="${colorStyle}">Cambio 24h ${response.changePercent24Hr}%</p>
      </figure>
      
    `;
    document.querySelector("#app").innerHTML += figure;
  });
};

getData();
