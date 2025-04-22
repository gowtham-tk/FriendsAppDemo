Objective : To remember friends details and mark if wished them on birthday or not.

Ruby on Rails API :

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

In friends model, make sure to add belongs_to :user, which will be used for foriegn key referencing.
In user model, add has_secure_password, which make password to use bcrypt module to encrypt.

In /config/initiaiziler/cors.rb --> make sure to allow all \* traffic, and allow access for authorization header.

In Routes :
resources :friends --> Creates all 7 standard RESTful routes
resources :users, only: [:create] --> create only one route, which is create (POST)
post "login", to: "sessions#create" --> creates a custom route for login to handle authentication

commands used :
rails generate scaffold User email:string password:string password_digest:string
rails generate model ''
rails generate controller
rails serve
rails db:migrate
rails routes

In React frontend :

In App.js, made sure to sure react router and pass different links for login, register, landing page. It consist of header / navbar
LandingPage.js, consist of Table (read), within it Delete, and wished option toggled (update), and can create a new form (create)
CreateFriend.js, consist of the form and it will be imported to Landing Page

Login.js consist of login form and axios to communicate to API
It will store token and user data to localstorage and will be read by other componenets as well.

Register.js will also have similar components with email, password, confirm_password and will return JWT token
