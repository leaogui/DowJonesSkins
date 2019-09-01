Feature: Compra/troca das skins investidas
    In order to retain skins or money
    As an Logged User
    I should be able to trade my invested skins

    Background:
        Given I am an User registered in the Site using my Steam Account
        And I am logged in the Site
        And I have invested skins
        And I want to trade skins as well

    Scenario: A logged user wants to buy a Skin
        Given I am on 'DJ Skins Tnvestment Page'
        When I select and Invested Skin
        Then I should be able to click on 'Trade'

    Scenario: A logged user trade a Skins succesfully
        Given I am on 'DJ Skins Trade Page'
        When I put the value(money or other skin) of the trade 
        And the seller agree
        And the seller click on 'Confirm Trade'
        Then I should be able to click on 'Confirm Trade'
        And buy the skin

    Scenario: A logged user trade a Skins unsuccessfully
        Given I am on 'DJ Skins Trade Page'
        When I put the value(money or other skin) of the trade
        And the seller disagree
        Then I should be able to continue the trade until he accept it
        And give him other proposal

    Scenario: A logged user wants to trade for my skin and I disagree the value
        Given I am on 'DJ Skins Trade Page'
        When I disagree with the value fo the trade
        Then I should be able to click on 'Inform Disagreement of the Term'

    Scenario: A logged user wants to trade for my skin succesfully
        Given I am on 'DJ Skins Trade Page'
        When I agree with the value fo the trade
        Then I should sell my Skin and get my amount of the trade