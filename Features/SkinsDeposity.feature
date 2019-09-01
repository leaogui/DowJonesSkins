Feature: Depósito de Skins
    In order to invest in my CSGO Skins 
    As an Logged User
    I should be able to deposit my skins on 'DJ Skins Inventory'

    Background:
        Given I am an User registered in the Site using my Steam Account
        And I am logged in the Site

    Scenario: A logged user wants to deposit his skin
        Given I am on 'User Page'
        When I click on 'Deposit my Skins'
        Then I should be redirected to 'Dj Skins Deposit page'

    Scenario: A logged user select skins to deposit
        Given I am on 'Dj Skins Deposit page'
        When I select skins to deposit
        Then I should be able to click on 'Confirm Deposit'

    Scenario: A logged user select allowed skins to deposit
        Given I am on 'Dj Skins Deposit page'
        When I select allowed skins to deposit
        And I click on 'Confirm Deposit'
        Then I should be redirected to 'Dj Skins Inventory page'
        And I should see my deposited skins there 

    Scenario: A logged user wants to deposit a Skin not allowed by the system
        Given I am on 'Dj Skins Deposit page'
        When I select not allowed skins to deposit
        And I click on 'Confirm Deposit'
        Then I must be warned that I can not do it