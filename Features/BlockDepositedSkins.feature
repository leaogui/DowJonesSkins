Feature: Block do uso das Skins depositadas
    In order to not damage the investment functionality
    As an Logged User with skins deposited
    I should not be able use my skins deposited in the 'DJ Skins Inventory'

    Background:
        Given I am an User registered in the Site using my Steam Account
        And I am logged in the Site
        And I have skins deposited

    Scenario: A logged user wants to use it in the game
        Given I am on my 'Steam Account' or on 'CSGO' itself
        When I click on 'Inventory'
        Then I should not see my skins deposited at 'DJ Skins Inventory'