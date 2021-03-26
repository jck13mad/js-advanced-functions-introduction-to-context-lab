// Your code here
let createEmployeeRecord = function(ele) {
    return {
        firstName: ele[0],
        familyName: ele[1],
        title: ele[2],
        payPerHour: ele[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeEleInfo) {
    return employeeEleInfo.map(function(ele) {
        return createEmployeeRecord(ele)
    })
}

let createTimeInEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, dateTime) {
    let inEvent = employee.timeInEvents.find(function(e) {
        return e.date === dateTime;
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === dateTime;
    })

    return (outEvent.hour - inEvent.hour) / 100;
}

let wagesEarnedOnDate = function(employee, dateTime) {
    let rawWage = hoursWorkedOnDate(employee, dateTime) * employee.payPerHour;
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee) {
    let daysWorked = employee.timeInEvents.map(function(e) {
        return e.date;
    })

    let payable = daysWorked.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable;
}

let calculatePayroll = function(arrayOfRecords) {
    return arrayOfRecords.reduce(function(memo, d) {
        return memo + allWagesFor(d)
    }, 0)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(src) {
        return src.firstName === firstName;
    })
}