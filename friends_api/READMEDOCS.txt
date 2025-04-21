Models :
    User :
        email
        password

    Friends:
        name
        dob
        email
        phone
        wished

Controllers : 
    Application Controllers :
        authentication request to decode the JWT and token

    Friends Controllers : 
        Only one change in index def instead of returning all, only return users data using where

    Session Controllers :
        for login

    User Controllers : 
        for registering

Added Lib with JWT encoding and decoding classes

