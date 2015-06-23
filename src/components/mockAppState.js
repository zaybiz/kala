var data = {
  config: {
    playCompleteSound: true,
    playStartSound: true,
    playRunningSound: true,
    showNotifications: true,
  },
  newTimerData: {
    title: '',
    typeName: 'test'
  },
  defaultTimerData: {
    title: '',
    typeName: 'test'
  },
  currentTimer: {
    title: "timer title",
    typeName: 'pomodoro',
    status: 'init',
    timeRemaining: 2,
    dateStarted: "2015-01",
  },
  timerTypes: {
    pomodoro: {
      typeName: 'pomodoro',
      defaultTimer: true,
      title: "Pomodoro",
      duration: 1500
    },
    miniPomodoro: {
      typeName: 'miniPomodoro',
      defaultTimer: true,
      title: "Mini Pomodoro",
      duration: 900
    },
    microPomodoro: {
      typeName: 'microPomodoro',
      defaultTimer: true,
      title: "Micro Pomodoro",
      duration: 300
    },
    shortBreak: {
      typeName: 'shortBreak',
      title: "Short Break",
      duration: 300
    },
    longBreak: {
      typeName: 'longBreak',
      title: "Long Break",
      duration: 900
    },
    test: {
      typeName: 'test',
      title: "Test",
      duration: 1
    },
  },
  history: [
    {
      title: "Create docker",
      dataCompleted: "2015-02",
      dataStarted: "2015-01",
      association: {
        type: "TaigaTask",
        projectID: 12313,
        taskId: 2121432
      }
    },
    {
      title: "Create docsker",
      dataCompleted: "2015-02",
      dataStarted: "2015-01",
      association: {
        type: "TaigaTask",
        projectID: 12313,
        taskId: 2121432
      }
    }
  ],
  scheduledTimers: [
    {
      title: 'New Task',
      typeName: 'pomodoro'
    }
  ],
  loading:true,
  mock:true,
};

module.exports = data;
// module.exports = {};
