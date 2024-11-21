$(function() {
  // Initialize form validation and submission
  $("input, textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // Handle form errors here if needed
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // Prevent the default form submission

      // Get values from the feedback form
      var rating = $("input[name='rating']:checked").val(); // Rating selection
      var comments = $("textarea#comments").val(); // Comments textarea

      // If no rating is selected, show an error message
      if (!rating) {
        showFeedbackMessage('danger', 'Please select a rating.');
        return;
      }

      // Prepare the data to be sent to Formspree (or your server)
      $.ajax({
        url: "//formspree.io/{{ site.email }}",  // Update with your email handler URL
        type: "POST",
        data: {
          rating: rating,
          comments: comments
        },
        cache: false,
        success: function() {
          // Show success message
          showFeedbackMessage('success', 'Your feedback has been submitted. Thank you!');
          // Clear the form fields
          $('#feedbackForm').trigger("reset");
        },
        error: function() {
          // Show error message if the server fails
          showFeedbackMessage('danger', 'Sorry, it seems our server is not responding. Please try again later.');
          // Clear the form fields
          $('#feedbackForm').trigger("reset");
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    }
  });

  // Clear success/error message when the user focuses on the comments textarea
  $('#comments').focus(function() {
    $('#success').html('');
  });

  // Function to show success or error messages
  function showFeedbackMessage(type, message) {
    var alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    $('#success').html(`<div class='alert ${alertClass}'>
            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
            <strong>${message}</strong>
        </div>`);
  }

  // Initialize Bootstrap tabs functionality (if needed)
  $("a[data-toggle='tab']").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});
