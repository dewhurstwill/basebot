export default [
  {
    event: 'trigger',
    handler(bot, message, controller) {
      if (message.trigger) {
        controller.trigger(message.trigger, [bot, message, controller])
      }
    }
  }
]
