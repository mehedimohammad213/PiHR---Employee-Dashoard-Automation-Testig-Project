Feature: Employee Login
  As an employee
  I want to log into the PiHR system
  So that I can access my dashboard and perform my daily tasks

  Background:
    Given I am on the login page
    And the login form is visible

  @smoke @login
  Scenario: Successful login with valid credentials
    When I enter valid username "01830377213"
    And I enter valid password "nopass@1234"
    And I check the "Remember me" checkbox
    And I click the "Login" button
    Then I should be successfully logged in
    And I should see the employee dashboard
    And I should see my profile information

  @negative @login
  Scenario: Failed login with invalid credentials
    When I enter invalid username "invalid_user"
    And I enter invalid password "invalid_password"
    And I click the "Login" button
    Then I should see an error message
    And I should remain on the login page

  @validation @login
  Scenario Outline: Login validation with different inputs
    When I enter username "<username>"
    And I enter password "<password>"
    And I click the "Login" button
    Then I should see "<expected_result>"

    Examples:
      | username | password | expected_result |
      |          | nopass@1234 | error message |
      | 01830377213 |          | error message |
      |          |          | error message |
      | test@test | wrongpass | error message |

  @security @login
  Scenario: Login with special characters in credentials
    When I enter username "test@#$%^&*()"
    And I enter password "pass@#$%^&*()"
    And I click the "Login" button
    Then I should see an error message
