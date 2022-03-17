const taskList = [
  {
    id: 7730,
    title: "Создать задачи",
    description: "создание задач с детальным отображением," +
      "создание задач с детальным отображением," +
      "создание задач с детальным отображением," +
      "создание задач с детальным отображением," +
      "создание задач с детальным отображением" +
      "создание задач с детальным отображением",
    date: 1629795050,
    status: "Выполняется",
    importance: "Критичный",
    supervisor: "Александр Павлов",
    idSupervisor: 213214,
    responsible: "Александр",
    subtasks: [
      {
        title: "Создание подзадачи",
        state: true
      },
      {
        title: "Вывод подзадачи",
        state: false
      },
      {
        title: "Вывод подзадачи2",
        state: false
      },

    ],
    progress: [
      {
        position: 0,
        title: "Новая",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 1,
        title: "Назначено",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 2,
        title: "Взят в работу",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
      {
        position: 3,
        title: "Выполнено",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
      {
        position: 4,
        title: "Закрыто",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
    ]
  },
  {
    id: 2,
    title: "Создать poppup",
    description: "создание всплывающее окно ",
    date: 1627042085,
    status: "Выполняется",
    importance: "Критичный",
    supervisor: "Александр Павлов",
    responsible: "Александр",
    progress: [
      {
        position: 0,
        title: "Новая",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 1,
        title: "Назначено",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 2,
        title: "Взят в работу",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 3,
        title: "Выполнено",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
      {
        position: 4,
        title: "Закрыто",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
    ]
  },
  {
    id: 8330,
    title: "Доделать навигацию",
    description: "Сделать функционал навигации",
    date: 1627042087,
    status: "Выполняется",
    importance: "Средний",
    supervisor: "Александр Павлов",
    idSupervisor: 213214,
    responsible: "Александр",
    progress: [
      {
        position: 0,
        title: "Новая",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 1,
        title: "Назначено",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 2,
        title: "Взят в работу",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 3,
        title: "Выполнено",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
      {
        position: 4,
        title: "Закрыто",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
    ]
  },
  {
    id: 3,
    title: "Вырубить лес",
    description: "Вырубить участок леса 22 кв.м",
    date: 1635334225,
    status: "Выполняется",
    importance: "Низкий",
    supervisor: "Александр",
    responsible: "Александр",
    progress: [
      {
        position: 0,
        title: "Новая",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 1,
        title: "Назначено",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 2,
        title: "Взят в работу",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 3,
        title: "Выполнено",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
      {
        position: 4,
        title: "Закрыто",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
    ]
  },
  {
    id: 13,
    title: "Найти месторождение нефти",
    description: "Сообщить о ней в компанию",
    date: 1635334225,
    status: "Выполняется",
    importance: "Низкий",
    supervisor: "Александр",
    responsible: "Александр Павлов",
    progress: [
      {
        position: 0,
        title: "Новая",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 1,
        title: "Назначено",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 2,
        title: "Взят в работу",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 3,
        title: "Выполнено",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
      {
        position: 4,
        title: "Закрыто",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
    ]
  },
  {
    id: 4,
    title: "Сделать detailPage",
    description: "Доработать роутинг detailPage",
    date: 1612612400,
    status: "Закрыт",
    importance: "Средний",
    supervisor: "Александр",
    responsible: "Александр Павлов",
    progress: [
      {
        position: 0,
        title: "Новая",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 1,
        title: "Назначено",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 2,
        title: "Взят в работу",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
      {
        position: 3,
        title: "Выполнено",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
      {
        position: 4,
        title: "Закрыто",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
    ]
  },
  {
    id: 4,
    title: "Сделать detailPage",
    description: "Доработать роутинг detailPage",
    date: 1612612400,
    status: "Закрыт",
    importance: "Средний",
    idSupervisor: 3432432,
    supervisor: "Иван Пупкин",
    responsible: "Александр Павлов",
    progress: [
      {
        position: 0,
        title: "Новая",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 1,
        title: "Назначено",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 2,
        title: "Взят в работу",
        state: [{
          state: "Positive",
          value: 100
        }]
      },
      {
        position: 3,
        title: "Выполнено",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
      {
        position: 4,
        title: "Закрыто",
        state: [{
          state: "Neutral",
          value: 100
        }]
      },
    ]
  }
]


export default taskList