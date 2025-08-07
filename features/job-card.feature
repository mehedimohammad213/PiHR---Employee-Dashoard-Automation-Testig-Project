Feature: Job Card Management
  As an employee
  I want to manage my job card
  So that I can track my work hours and generate reports

  Background:
    Given I am logged into the PiHR system
    And I am on the employee dashboard

  @smoke @jobcard
  Scenario: Generate job card PDF report
    When I navigate to the "Employee" section
    And I click on "Self Service"
    And I click on "My Job Card"
    And I select date range from "July 1st" to "July 31st"
    And I click on "PDF Report" button
    Then a PDF report should be generated
    And a new popup window should open with the report

  @jobcard @excel
  Scenario: Export job card to Excel
    When I navigate to the "Employee" section
    And I click on "Self Service"
    And I click on "My Job Card"
    And I select date range from "July 1st" to "July 31st"
    And I click on "Export to Excel" button
    Then an Excel file should be downloaded
    And the download should complete successfully

  @jobcard @validation
  Scenario Outline: Job card date selection validation
    When I navigate to the "Employee" section
    And I click on "Self Service"
    And I click on "My Job Card"
    And I select date range from "<start_date>" to "<end_date>"
    And I click on "PDF Report" button
    Then I should see "<expected_result>"

    Examples:
      | start_date | end_date | expected_result |
      | July 1st   | July 31st | PDF report generated |
      | August 1st | August 31st | PDF report generated |
      | September 1st | September 30th | PDF report generated |

  @jobcard @error
  Scenario: Job card with invalid date range
    When I navigate to the "Employee" section
    And I click on "Self Service"
    And I click on "My Job Card"
    And I select an invalid date range
    And I click on "PDF Report" button
    Then I should see an error message
    And the report should not be generated
