$(function() {

  $("input,textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour

      // Get values from the feedback form
      var rating = $("input[name='rating']:checked").val(); // Rating selection
      var comments = $("textarea#comments").val(); // Comments textarea

      // If no rating is selected, show an error
      if (!rating) {
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
        $('#success > .alert-danger').append("<strong>Please select a rating.</strong>");
        $('#success > .alert-danger').append('</div>');
        return;
      }

      // Prepare the data to be sent to Formspree (or your mail handler)
      $.ajax({
        url: "//formspree.io/{{ site.email }}",  // Assuming Formspree integration
        type: "POST",
        data: {
          rating: rating,
          comments: comments
        },
        cache: false,
        success: function() {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your feedback has been submitted. Thank you!</strong>");
          $('#success > .alert-success')
            .append('</div>');

          // Clear all fields
          $('#feedbackForm').trigger("reset");
        },
        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append("<strong>Sorry, it seems that our server is not responding. Please try again later.</strong>");
          $('#success > .alert-danger').append('</div>');

          // Clear all fields
          $('#feedbackForm').trigger("reset");
        },
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  // When clicking on Full hide fail/success boxes
  $('#comments').focus(function() {
    $('#success').html('');
  });

});
