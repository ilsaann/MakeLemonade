//ADD SUGAR/////////////////////////////////////////////////////////////////////////////////////////////////////////
const $getQuote = $(".getQuote");

$getQuote.click((event) => {
  $.get("https://type.fit/api/quotes", (data) => {
    const $displayQuote = $(".displayQuote");
    $displayQuote.html("");
    const quotes = JSON.parse(data);
    console.log(quotes);
    const count = quotes.length - 1;
    console.log(count);
    $.get(
      `http://www.randomnumberapi.com/api/v1.0/random?min=0&max=${count}&count=1`,
      (number) => {
        const n = number[0];
        const Quote = quotes[n].text;
        const Author = quotes[n].author;
        const $display = $("<p></p>").html(`${Quote}<br>${Author}`);
        $displayQuote.append($display);

        console.log(quotes[n]);
      }
    );
  });
});
