$ = require 'jquery'  # place the library into a variable

do fill = (item = 'The most creative minds in Art') ->
#..search for an element of class 'tagline' and insert
#   or append the content of the variable 'item' set up
#   in the 'do ...' statement
  $('.tagline').append "#{item}"
fill
