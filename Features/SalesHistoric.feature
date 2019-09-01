Feature: Histórico de Vendas/Compras de investimentos
    In order to see my historic of buys and sells
    As an Logged User
    I should be able to see and Sales Historic Table/Board

    Background:
        Given I am an User registered in the Site using my Steam Account
        And I am logged in the Site

    Scenario: A logged user wants to see his historic of buys and sells
        Given I am on 'User Page'
        When I click on 'See my Historic'
        Then I should be redirected to the 'Historic Board Page'

    Scenario: A logged user in the 'Historic Board Page' once upon a time bought/sold Skins on 'DJ Skins'
        Given I am on 'Historic Board Page'
        When I see the Board
        Then I should see all my Sales historic, with the price, date and description

    Scenario: A logged user in the 'Historic Board Page' never bought/sold Skins on 'DJ Skins'
        Given I am on 'Historic Board Page'
        When I see the Board
        Then I should see a blank Board