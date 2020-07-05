$(document).ready(function () {
  let my_amenities = {};
  let my_states = {};
  let my_cities = {};
  let my_locations = {};
  $(document).on('change', ".amenities > .popover > li > input[type='checkbox']", function () {
    if (this.checked) {
      my_amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete my_amenities[$(this).data('id')];
    }
    let lst = Object.values(my_amenities);
    if (lst.length > 0) {
      $('div.amenities > h4').text(Object.values(my_amenities).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
  $(document).on('change', ".locations > .popover > li > input[type='checkbox']", function () {
    if (this.checked) {
      my_states[$(this).data('id')] = $(this).data('name');
      my_locations[$(this).data('id')] = $(this).data('name');
    } else {
      delete my_states[$(this).data('id')];
      delete my_locations[$(this).data('id')];
    }
    let my_list = Object.values(my_locations);
    if (my_list.length > 0) {
      $('div.locations > h4').text(my_list.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });
  $(document).on('change', ".locations > .popover > li > ul > li > input[type='checkbox']", function () {
    if (this.checked) {
      my_cities[$(this).data('id')] = $(this).data('name');
      my_locations[$(this).data('id')] = $(this).data('name');
    } else {
      delete my_cities[$(this).data('id')];
      delete my_locations[$(this).data('id')];
    }
    let my_list = Object.values(my_locations);
    if (my_list.length > 0) {
      $('div.locations > h4').text(my_list.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
      }
    }
  });
  $('.filters > button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({'amenities': Object.keys(checkedAmenities)}),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          let place = data[i];
          $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
        }
      }
    });
  });
});
