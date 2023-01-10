const fetchData = async () => {
  console.log("fetching data from data source");
  const res = await fetch(
    "https://cf-particle-html-test.eip.telegraph.co.uk/data-source/7cddc53d-1f42-437a-9d22-346ff077c333.json"
  );
  const data = await res.json();

  return data;
};

window.addEventListener("DOMContentLoaded", () => {
  fetchData().then(({ data }) => {
    const _data = data[0];
    const headlineCopy = document.querySelector(".wineParticle__text");
    const priceTag = document.querySelector(".wineParticle__price");
    const thumbnailContainer = document.querySelector(".wineParticle__img");
    const ctaUrl = document.querySelector(".wineParticle__cta");
    const ctaText = document.querySelector(".wineParticle__btn");

    console.log(_data);
    const lnBreakIndex = _data.headline.indexOf(" ", _data.headline.length / 2);
    console.log(lnBreakIndex);
    _data.headline = _data.headline.slice(0, lnBreakIndex) + "\n" + _data.headline.slice(lnBreakIndex);

    const price = `£${_data.headline.trim().split("£")[1].split(" ")[0]}`;
    headlineCopy.innerText = _data.headline;
    priceTag.innerText = price;
    headlineCopy.innerHTML = headlineCopy.innerHTML.replace(
      price,
      `<span class="wineParticle__price">${price}</b></u></span>`
    );

    ctaText.innerText = _data.ctatext;
    ctaUrl.href = _data.ctaurl;
    thumbnailContainer.firstElementChild.srcset = _data.desktopimgurl;
    thumbnailContainer.lastElementChild.previousElementSibling.srcset = _data.tabletimgurl;
    thumbnailContainer.lastElementChild.src = _data.mobileimgurl;
  });
});
