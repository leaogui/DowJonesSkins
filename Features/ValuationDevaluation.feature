Feature: Sistema de valorização/Desvalorização das Skins investidas
    In order to the Valuation and Devaluation of Skins
    As an Logged User
    I should be able to see an Investment Chart and all Skins invested 

    Background:
        Given I am an User registered in the Site using my Steam Account
        And I am logged in the Site

    Scenario: A logged user wants to see the Valuation and Devaluation of Skins
        Given I am on 'DJ Skins Tnvestment Page'
        When I look at the page
        Then I should be able to see a Investment Chart
        And I should be able to see the price of all skins invested