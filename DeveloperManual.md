                                                     Developer Manual

How to Install Application and All Dependancies:


  There are multiple applications that require installation. These include:
        Supabase
        Body Parser
        Express js
        isValidStateAbbreviation
        Axios
        Fs
        Cors
        node js
  These can be installed through the terminal.

  Dependancies are the API's we are using, since the weather information can not be displayed or gathered without our API's. Other dependancies include if the user is using a Mac or a Windows. Supabase is also a dependancy. Finally our data file, StatesData, is also a dependancy due to us gathering more information/data. 
  


How to run application on a server:


  You can run the application using nodemon and the local URL provided when creating the back end index.js. You can also
  test the api endpoint using insomnia which allows you to get, post, etc... weather information from the APIs or database you are using.
  

How to run the tests written in the software:


  There are no tests written in our software. 


API for the server application:

  The APIs for the server application include nominatim.openstreetmap, Open-Mateo weather and open weather map API.

  Our GET:
    GET /api/weather:
      This is in place to get our data to provide weather information
    POST /api/weather:
      This is in place to save the data we just retrieved.
    PATCH /api/weather/id:
      This is in place in order to update the data we have depending on the certain location given by the user.
    DELETE /api/weather/id:
      This is in place to delete the data we just gathered based on a certain location given by the user. The user may want to look up weather in a different location, so this is essential in displaying new data. 

    


Known Bugs/ Road Maps:


  Known bugs in our software currently is that our software is not compatible for iOS or Android. In addition to that, another known bug is that our software is not able to display weather information globally. As out software currently runs, weather information in the United States is only available. Another thing to note, depending on what browser you are opening the application on, the location services may not work. Make sure that you are allowing your browser to view your location, both on your browser and through your laptop settings. If you are running into issues with a browser, try switching over to another one. 

That leads us to our future road maps. For future developers that may work on our application, we believe it would be extremely beneficial for the users and the progression of the website if it was both iOS and Android compatible. Additionally, opening up the data to include weather information globally will result in more users and inclusivity for our application. 
