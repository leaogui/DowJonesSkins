Feature: Compra/troca das skins investidas
    In order to retain money to other users
    As an Logged User
    I should be able to withdraw my money from DJ Skins to my PayPal

    Background:
        Given I am an User registered in the Site using my Steam Account
        And I am logged in the Site
        And I have money at 'DJ Skin Wallet'

    Scenario: A logged user wants to withdraw my money from DJ Skins to my PayPal
        Given I am on 'DJ Skin Wallet'
        When I select withdraw to my Paypal
        Then I should be redirect to 'Log at PayPal'

    Scenario: A logged user wants to withdraw my money from DJ Skins to my PayPal and I am Logged at PayPal
        Given I am on 'DJ Skin Wallet'
        When I select withdraw to my Paypal
        Then I should transfer the money to my PayPal Wallet