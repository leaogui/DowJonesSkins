Feature: Depósito de Skins
    In order to value/devalue my CSGO Skins 
    As an Logged User
    I should be able to invest int my deposited skins

    Background:
        Given I am an User registered in the Site using my Steam Account
        And I am logged in the Site
        And I have skins deposited

    Scenario: A logged user wants to invest his skin
        Given I am on 'Investment Page'
        When I select my wanted skins
        Then I should be able to click on 'Confirm Investment'

    Scenario: A logged user confirms his investment
        Given I am on 'Investment Page'
        And I already selected my wanted skins
        When I click on 'Confirm Investment'
        Then I should be redirected to 'DJ Skins My investments page'
        And I should see my skins there
        And I should not see my skin on 'DJ Skins Inventory page'

    Scenario: A looged user wants to retain his investmento to his inventory before 1 month
        Given I am on 'DJ Skins My investments page'
        And I select my investment that is not 1 month old
        When I try to click on 'Retain to Inventory'
        Then I should be warned that I can not do it

    Scenario: A looged user wants to retain his investmento to his inventory after 1 month
        Given I am on 'DJ Skins My investments page'
        And I select my investment that is more than 1 month old
        When I click on 'Retain to Inventory'
        Then I should cancel this investment 
        And I should not see my skin on 'DJ Skins My investments page'
        And I should see my skin on 'DJ Skins Inventory page'