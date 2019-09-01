Feature: Cadastro/Login via Steam
    In order to enjoy all the Sites's functionalities 
    As an User
    I should be able to sign Up/log In in the Site using my Steam Account

    Scenario: A new user wants to sign Up/log In in the Site
        Given I am on Home page
        When I click on 'Login With Steam'
        Then I should be redirected to the 'Steam Login page'

    Scenario: A new user is in the Steam Login Page to sign Up/log In
        Given I am on Steam's Login page
        When I enter my credencials 
        And click in 'Iniciar Sessão'
        Then I should be redirected to the 'DJ Skins UserHome page' already logged
    
    Scenario: A new user do not have a Steam Account
        Given I am on Steam's Login page
        When I click on 'Cadastrar-se'
        Then I should be redirected to 'Steam Sign Up page' 
        And sign Up myself on Steam