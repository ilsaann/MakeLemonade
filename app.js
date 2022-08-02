//ADD SUGAR/////////////////////////////////////////////////////////////////////////////////////////////////////////
const $getQuote = $(".getQuote");

$getQuote.click((event) => {
  $.get("https://type.fit/api/quotes", (data) => {
    const quotes = JSON.parse(data);
    console.log(quotes);
    const count = quotes.length - 1;
    console.log(count);
    $.get(
      `http://www.randomnumberapi.com/api/v1.0/random?min=0&max=${count}&count=1`,
      (number) => {
        const n = number[0];
        console.log(quotes[n]);
      }
    );
  });
});
