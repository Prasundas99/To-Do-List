window.addEventListener("load", () => {
  // select elements
  //   let clear = document.querySelector(".clear");
  let dateElement = document.getElementById("date");
  let list = document.getElementById("list");
  let input = document.getElementById("input");
  let city = document.querySelector('.city');
  let tempreature = document.querySelector('.temp');
  let description = document.querySelector('.desc');

  //select classes
  let CHECK = "fa-check-circle";
  let UNCHECK = "fa-circle-thin";
  let LINE_THROUGH = "lineThrough";

  //variables
  let LIST = [];
  let coordinateState = false;
  let latitude;
  let longitude;
  id = false;
  trash = false;
  done = false;

  //Weatherbit API key
  const API_KEY = `63d4d9c1a46a499998e281f970351c91`;

  //show today date
  const options = { weekday: "long", month: "long", day: "numeric" };
  const today = new Date();
  dateElement.innerHTML = today.toLocaleDateString("en-US", options);

  // add to do function
  function addTODO(toDo, id, done, trash) {
    const position = "beforeend";
    if (trash) {
      return;
    }

    var DONE = done ? CHECK : UNCHECK;
    var LINE = done ? LINE_THROUGH : "";
    const item = `
                    <li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id=""${id}"></i>
                    </li>
            `;
    list.insertAdjacentHTML(position, item);
  }

  // add item to the list when the user clicks the add button
  document.getElementById("add").addEventListener("click", function (event) {
    var toDo = input.value;
    if (toDo) {
      addTODO(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      id++;
    }
    input.value = ""; //to empty the box after entering the value
  });

  // add item to the list when the user enters enter
  document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      var toDo = input.value;
      if (toDo) {
        addTODO(toDo, id, false, false);
        LIST.push({
          name: toDo,
          id: id,
          done: false,
          trash: false,
        });
        id++;
      }
      input.value = "";
    }
  });

  // complete todo
  function completeTODO(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
  }

  // remove todo

  function removeTODO(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
  }

  list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
      completeTODO(element);
    } else if (elementJob == "delete") {
      removeTODO(element);
    }
  });

  // Update weather data
  function updateWeather() {
    coordinateState = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let api = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}`;
        fetch(api)
          .then((res) => {
            if (res.ok) {
              console.log("SUCCESS");
              return res.json();
            } else {
              console.log("FAILURE");
            }
          })
          .then(response => {
            // console.log(response)
            let {city_name,temp,weather} = response.data[0]
            // console.log(city_name,temp,weather.description)
            city.textContent = city_name;
            tempreature.textContent = `${temp}\xB0C`;
            description.textContent = weather.description;

          });
      });
    }
  }

  document.querySelector(".fa-refresh").addEventListener("click", (event) => {
    updateWeather();
  });

  // document.querySelector('.weather-data').innerHTML = `<p>Something went Wrong!</p>`;
});
