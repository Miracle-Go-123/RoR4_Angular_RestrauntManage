# Setting a timeout for the flash messages 

  $ ->
      flashCallback = ->
        $(".alert").fadeOut()
      $(".alert").bind 'click', (ev) =>
        $(".alert").fadeOut()
      setTimeout flashCallback, 6000