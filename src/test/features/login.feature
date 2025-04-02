Feature: Login

  Scenario: Successful login
    Given I navigate to the login page
    When I enter valid credentials
    And I click the login button
    Then I should see the appointment page

  Scenario: Invalid login
    Given I navigate to the login page
    When I enter invalid credentials
    And I click the login button
    Then I should see an error message
