export const testData = {
  credentials: {
    username: '01830377213',
    password: 'nopass@1234'
  },
  dates: {
    startDate: 'Choose Tuesday, July 1st,',
    endDate: 'Choose Thursday, July 31st,'
  },
  months: {
    july: 'July',
    june: 'June'
  },
  navigation: {
    employee: 'Employee',
    selfService: 'Self Service',
    myScreens: 'My Screens'
  }
};

export const selectors = {
  login: {
    iframe: 'iframe[title="Login Page"]',
    username: 'Username/ Mobile',
    password: 'Password',
    rememberMe: 'Remember me',
    loginButton: 'Login'
  },
  dashboard: {
    employeeMenu: 'Employee',
    selfServiceMenu: 'Self Service',
    myScreensMenu: 'My Screens',
    dashboardButton: 'Dashboard',
    profileImage: 'profile',
    logoutMenuItem: 'Logout'
  },
  jobCard: {
    myJobCardButton: 'My Job Card',
    dateRangeSelector: 'Select Date Range',
    pdfReportButton: 'PDF Report',
    exportToExcelButton: 'Export to Excel'
  },
  monthlyAttendance: {
    monthlyAttendanceButton: 'Monthly Attendance',
    monthSelector: 'Select Month',
    pdfReportButton: 'PDF Report'
  }
};
