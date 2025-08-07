Feature: Employee Logout
  As an employee
  I want to log out of the PiHR system
  So that I can securely end my session

  Background:
    Given I am logged into the PiHR system
    And I am on the employee dashboard

  @smoke @logout
  Scenario: Successful logout from dashboard
    When I click on my profile image
    And I click on "Logout" menu item
    Then I should be successfully logged out
    And I should be redirected to the login page
    And I should see the login form

  @logout @security
  Scenario: Logout and verify session termination
    When I click on my profile image
    And I click on "Logout" menu item
    And I try to access the dashboard URL directly
    Then I should be redirected to the login page
    And I should not be able to access protected pages

  @logout @navigation
  Scenario: Logout from different pages
    When I navigate to the "Employee" section
    And I click on "Self Service"
    And I click on "My Job Card"
    And I click on my profile image
    And I click on "Logout" menu item
    Then I should be successfully logged out
    And I should be redirected to the login page
