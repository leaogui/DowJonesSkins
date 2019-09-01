Feature: Saque das Skins
    In order to use my deposited skins on CSGO
    As an Logged User
    I should be able withdraw my skins on 'DJ Skins'

    Background:
        Given I am an User registered in the Site using my Steam Account
        And I am logged in the Site
        And I have skins deposited

    Scenario: A logged user wants to withdraw his Skin on Inventory
        Given I am on 'DJ Skins Inventory page'
        When I select my wanted skins
        Then I should be able to click on 'WithDraw to Steam'

    Scenario: A logged user confirm WithDraw
        Given I am on 'DJ Skins Inventory page'
        When I select my wanted skins
        And I click on 'WithDraw to Steam'
        Then I should confirm the trade
        And I should be my skin back to Steam Account
        And I should not see my skin at 'DJ Skins Inventory page'