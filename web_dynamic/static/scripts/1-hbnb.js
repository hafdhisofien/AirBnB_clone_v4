$(document).ready(function () {
  let my_amenities = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      my_amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete my_amenities[$(this).data('id')];
    }
    let my_list = Object.values(my_amenities);
    if (my_list.length > 0) {
      $('div.amenities > h4').text(Object.values(my_amenities).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});
