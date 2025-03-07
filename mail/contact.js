$(function () {
  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {},
    submitSuccess: function ($form, event) {
      event.preventDefault();
      var name = $("input#name").val();
      var email = $("input#email").val();
      var subject = $("input#subject").val();
      var message = $("textarea#message").val();

      $this = $("#sendMessageButton");
      $this.prop("disabled", true);
      Email.send({
        Host: "smtp.gmail.com", // Example: "smtp.gmail.com"
        Username: "myshelterstry@gmail.com", // Your email address
        Password: "xult uzan wttl qzce", // Your email password
        To: "myshelterstry@gmail.com", // Recipient's email address
        From: email,
        Subject: "New Message from " + name + "Subject : "+ subject,
        Body:
          "Message from: " +
          name +
          "<br>Email: " +
          email +
          "<br>Message: " +
          message,
      })
        .then(function (response) {
            console.log(response)
          // Show success or error message
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-success").append(
            "<strong>Your message has been sent. </strong>"
          );
          $("#success > .alert-success").append("</div>");
          $("#contactForm").trigger("reset");
        })
        .catch(function (error) {
            console.log(error)
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-danger").append(
            $("<strong>").text(
              "Sorry " +
                name +
                ", it seems that our mail server is not responding. Please try again later!"
            )
          );
          $("#success > .alert-danger").append("</div>");
          $("#contactForm").trigger("reset");
        });
    //   $.ajax({
    //     url: "contact.php",
    //     type: "POST",
    //     data: {
    //       name: name,
    //       email: email,
    //       subject: subject,
    //       message: message,
    //     },
    //     cache: false,
    //     success: function () {
    //       $("#success").html("<div class='alert alert-success'>");
    //       $("#success > .alert-success")
    //         .html(
    //           "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
    //         )
    //         .append("</button>");
    //       $("#success > .alert-success").append(
    //         "<strong>Your message has been sent. </strong>"
    //       );
    //       $("#success > .alert-success").append("</div>");
    //       $("#contactForm").trigger("reset");
    //     },
    //     error: function () {},
    //     complete: function () {
    //       setTimeout(function () {
    //         $this.prop("disabled", false);
    //       }, 1000);
    //     },
    //   });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

$("#name").focus(function () {
  $("#success").html("");
});
