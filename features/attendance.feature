Feature: Monthly Attendance
  As an employee
  I want to view my monthly attendance
  So that I can track my attendance and generate reports

  Background:
    Given I am logged into the PiHR system
    And I am on the employee dashboard

  @smoke @attendance
  Scenario: Generate monthly attendance PDF report
    When I navigate to the "Employee" section
    And I click on "Self Service"
    And I click on "Monthly Attendance"
    And I select month "June"
    And I click on "PDF Report" button
    Then a PDF report should be generated
    And a new popup window should open with the attendance report

  @attendance @validation
  Scenario Outline: Monthly attendance with different months
    When I navigate to the "Employee" section
    And I click on "Self Service"
    And I click on "Monthly Attendance"
    And I select month "<month>"
    And I click on "PDF Report" button
    Then I should see "<expected_result>"

    Examples:
      | month | expected_result |
      | January | PDF report generated |
      | February | PDF report generated |
      | March | PDF report generated |
      | April | PDF report generated |
      | May | PDF report generated |
      | June | PDF report generated |
      | July | PDF report generated |
      | August | PDF report generated |
      | September | PDF report generated |
      | October | PDF report generated |
      | November | PDF report generated |
      | December | PDF report generated |

  @attendance @navigation
  Scenario: Navigate back to dashboard from attendance
    When I navigate to the "Employee" section
    And I click on "Self Service"
    And I click on "Monthly Attendance"
    And I navigate back to "Self Service"
    And I click on "My Screens"
    And I click on "Dashboard"
    Then I should be on the dashboard page
    And I should see the dashboard elements
