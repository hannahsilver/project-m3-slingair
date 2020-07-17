const url = new URL(location.href);
const id = url.searchParams.get("id");
console.log(id);

fetch("/reservations/" + id)
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("flight").innerText = data.flight;
    document.getElementById("seat").innerText = data.seat;
    document.getElementById("name").innerText =
      data.givenName + " " + data.surname;
    document.getElementById("email").innerText = data.email;
  });
