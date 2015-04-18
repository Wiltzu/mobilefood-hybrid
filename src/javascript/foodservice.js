var $ = require('jQuery');


function FoodService(CONFIG) {
  var hasLocalStorage = window.localStorage !== undefined;
  
  /*
  * @param {Function} callback like function(data, error)
  */
  this.getRestaurantInfo = function (index, callback) {
    $.ajax({/*dataType: "jsonp",*/
            url: getInfoServiceUrlFor("unica", "tottisalmi"),
            success: function(data) { 
              //callback(parseRestaurant(data, index), null); 
              callback(data.restaurant_info);
            },
            error: function() {
              callback(null, "error");
            },
    });
  }

  function parseRestaurant(data, index) {
    if (data.restaurants && data.restaurants[index]) {
      return data.restaurants[index];
    }
    return {};
  }

  function getInfoServiceUrlFor(chain, restaurantName) {
    return CONFIG.REST_URL + "info/chain/" + chain + "/restaurant/" + restaurantName;
  }

  function getRestServiceUrlFor(year, week) {
    return CONFIG.REST_URL + "?restaurant=unica&year=" + year + "&week=" + week;
  }

  function getFoodServiceUrlFor(chain, year, week, weekDay) {
    return CONFIG.REST_URL + "foods/chain/" + chain + "/" + year + "/" + week + "/" + weekDay;
  }

  /*
  * @param {Function} callback like function(data, error).
  */
  this.getFoodsFor = function (year, week, weekday, callback) {
    $.ajax({/*dataType: "jsonp",*/
            url: getFoodServiceUrlFor("unica", year, week, weekday),
            success: function(data) { 
              //callback(parseFoodForADay(data, weekday), null);
              callback(data.restaurants); 
            },
            error: function() {
              callback(null, "error");
            }
    });
  }

  function parseFoodForADay(data, weekday) {
    if(data.foodsByDay[weekday]) {
      return data.foodsByDay[weekday].foodsByRestaurant;
    }
    return [];
  }
 
};

module.exports = FoodService;
