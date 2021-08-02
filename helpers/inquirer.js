require('colors')
const inquirer = require('inquirer')

const menuOpts = [
  {
    type: 'list',
    name: 'option',
    message: 'Select an option: ',
    choices: [
      { value: 1, name: `${'1.'.magenta} Search place` },
      { value: 2, name: `${'2.'.magenta} History` },
      { value: 3, name: `${'3.'.magenta} Exit` },
    ],
  },
]

const inquirerMenu = async () => {
  console.clear()
  /**
   * Don't touch this logs in order to see a beautiful aligned heading :D
   */
  console.log(' =============================='.yellow)
  console.log(` == ${'WELCOME TO VANIAWEATHER!'.toUpperCase()} ==`.rainbow)
  console.log(' ==============================\n'.yellow)
  /**
   * End of the beautiful aligned heading ^_^
   */

  const { option } = await inquirer.prompt(menuOpts)

  return option
}

const pause = async () => {
  const confirmationQuestion = [
    {
      type: 'input',
      name: 'confirmation',
      message: `Press ${'ENTER'.magenta} to confirm`,
    },
  ]
  console.log('\n')
  return await inquirer.prompt(confirmationQuestion)
}

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please, enter some value'
        }
        return true
      },
    },
  ]
  const { description } = await inquirer.prompt(question)
  return description
}

const tasksToDeleteList = async (tasks = []) => {
  const choices = tasks.map((task, idx) => {
    const index = `${idx + 1}.`.magenta

    return {
      value: task.id,
      name: `${index} ${task.description}: ${
        task.completedIn
          ? `Completed in ${task.completedIn}`.green
          : 'Pending'.red
      }`,
    }
  })

  const cancelIndex = `${choices.length + 1}`.magenta

  choices.push({
    value: choices.length + 1,
    name: `${cancelIndex}. Cancel`,
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices,
    },
  ]

  const { id } = await inquirer.prompt(questions)

  return id
}

const tasksToComplete = async (tasks = []) => {
  const choices = tasks.map((task, idx) => {
    const index = `${idx + 1}.`.magenta

    return {
      value: task.id,
      name: `${index} ${task.description}: ${
        task.completedIn
          ? `Completed in ${task.completedIn}`.green
          : 'Pending'.red
      }`,
      checked: task.completedIn ? true : false,
    }
  })

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Please, choose',
      choices,
    },
  ]

  const { ids } = await inquirer.prompt(question)

  return ids
}

const confirmChoice = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ]

  const { ok } = await inquirer.prompt(question)

  return ok
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  tasksToDeleteList,
  confirmChoice,
  tasksToComplete,
}
