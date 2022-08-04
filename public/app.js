//ADD SUGAR/////////////////////////////////////////////////////////////////////////////////////////////////////////
//this is how I implement 2 APIs to display a Random Inspirational Quote//////////////////////////////////

const $getQuote = $(".getQuote");
const subQuote = {};

$getQuote.click((event) => {
  //get request for this API returns a huge array of quotes and authors
  $.get("https://type.fit/api/quotes", (data) => {
    const $displayQuote = $(".displayQuote");
    $displayQuote.html("");
    const quotes = JSON.parse(data);
    console.log(quotes);
    const count = quotes.length - 1;
    console.log(count);
    //get request for this API generates a random number within the specified range
    $.get(
      `https://www.randomnumberapi.com/api/v1.0/random?min=0&max=${count}&count=1`,
      (number) => {
        const n = number[0];
        const Quote = quotes[n].text;
        const Author = quotes[n].author;
        const $display = $("<p></p>").html(
          `${Quote}<br><em><strong>${Author}</strong></em>`
        );
        subQuote["quote"] = quotes[n];
        $displayQuote.append($display);
        console.log(quotes[n]);
      }
    );
  });
});
console.log(subQuote[0]);
//POST to register a user///////////////////////////////////////////////////////////////////////////////////////////////

//selecting all pieces of the new user form
const tempUser = {};
const $regName = $("input[name='regName']");
const $email = $("input[name='email']");
const $registerForm = $(".register");
const $regSubmit = $(".lemonMe");

//adding event listener to the submit button
$regSubmit.click(() => {
  tempUser["username"] = $regName.val();
  tempUser["email"] = $email.val();
  //Creating a unique userID (original number was too long so I needed to trim it down)
  const unique = new Date().getTime();
  const ID = unique.toString();
  tempUser["userID"] = ID.slice(5);

  fetch("/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempUser),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

//POST journal entry////////////////////////////////////////////////////////////////////////////////////////////////////////
const tempJournal = {};
//subQuote[0] is formatted quote that will be submitted to table
const $jentry = $("textarea[name='entry']");
const $userName = $("input[name='Uname']");
const $squeeze = $(".squeeze");

//event listener on squeeze submit button
$squeeze.click(() => {
  //handle incorrect entries
  tempJournal["quote"] = JSON.stringify(subQuote);
  tempJournal["userentry"] = $jentry.val();
  tempJournal["uname"] = $userName.val();
  fetch("/journal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempJournal),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("success", data);
    });

  //check user then check quote
});
