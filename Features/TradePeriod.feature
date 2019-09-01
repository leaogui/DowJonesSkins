Feature: Depósito de Skins
    In order to confirm my trades
    As an Logged User
    I should be able to confirm my trades only between 10am and 6pm

    Background:
        Given I am an User registered in the Site using my Steam Account
        And I am logged in the Site
        And I bought/sold and Skin

    Scenario: A logged user bought/sold an Skin in the right period
        Given I am on 'DJ Inventory'
        When I look at my skins
        Then I should see the result of the trade

    Scenario: A logged user bought/sold an Skin in the out of the period
        Given I am on 'Dj Skins Deposit page'
        When I look at my skins
        Then I should see no difference
    
    Scenario: A logged user in the 'Historic Board Page' after bought/sold an Skin in the right period
    Given I am on 'Historic Board Page'
        When I see the Board
        Then I should see as a confirmed bought/sold

    Scenario: A logged user in the 'Historic Board Page' after bought/sold an Skin in the out of the period
    Given I am on 'Historic Board Page'
        When I see the Board
        Then I should see as a pending bought/sold