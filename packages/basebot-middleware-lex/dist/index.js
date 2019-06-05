"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _awsSdk = require("aws-sdk");

var lex = new _awsSdk.LexRuntime({
  region: process.env.AWS_REGION });var _default =


function _default(logger) {
  var error = logger('middleware:lex', 'error');
  var debug = logger('middleware:lex', 'debug');

  if (!process.env.AWS_REGION || !process.env.BOT_NAME) {
    error('AWS_REGION and BOT_NAME must be set');
  }

  return {
    receive: receive,
    heard: heard };

  function receive(bot, message, next) {
    if (!message.text) {
      next();
      return;
    }

    if (message.is_echo || message.type === 'self_message' || message.alexa) {
      next();
      return;
    }
    debug("userId: ".concat(message.user));
    var params = {
      botAlias: process.env.BOT_NAME || 'Basebot',
      botName: process.env.BOT_NAME || 'Basebot',
      inputText: message.text,
      // FIXME - alexa provides a UID with > 200 characters - this will be massively truncated as a result and could even lead to unintentional session hijacking
      userId: message.user.substr(0, 100),
      requestAttributes: message.requestAttributes,
      sessionAttributes: message.sessionAttributes };

    if (message.text) {
      var request = lex.postText(params, function (err, data) {
        if (err) {
          next(err);
        } else {
          message.lex = {
            intent: data.intentName,
            slots: data.slots,
            session: data.sessionAttributes,
            response: data.message,
            dialogState: data.dialogState,
            slotToElicit: data.slotToElicit };

          debug('response received from Lex:', message.lex);
          if (data.intentName) {
            message.intent === data.intentName;
          }
          next();
        }
      });
    } else {
      next();
    }
  }

  function heard(bot, message, next) {
    if (message.lex && message.lex.dialogState === 'Fulfilled' && message.lex.intentName !== null) {
      return bot.reply(message, message.lex.response);
    }
    next();
  }
};exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbImxleCIsIkxleFJ1bnRpbWUiLCJyZWdpb24iLCJwcm9jZXNzIiwiZW52IiwiQVdTX1JFR0lPTiIsImxvZ2dlciIsImVycm9yIiwiZGVidWciLCJCT1RfTkFNRSIsInJlY2VpdmUiLCJoZWFyZCIsImJvdCIsIm1lc3NhZ2UiLCJuZXh0IiwidGV4dCIsImlzX2VjaG8iLCJ0eXBlIiwiYWxleGEiLCJ1c2VyIiwicGFyYW1zIiwiYm90QWxpYXMiLCJib3ROYW1lIiwiaW5wdXRUZXh0IiwidXNlcklkIiwic3Vic3RyIiwicmVxdWVzdEF0dHJpYnV0ZXMiLCJzZXNzaW9uQXR0cmlidXRlcyIsInJlcXVlc3QiLCJwb3N0VGV4dCIsImVyciIsImRhdGEiLCJpbnRlbnQiLCJpbnRlbnROYW1lIiwic2xvdHMiLCJzZXNzaW9uIiwicmVzcG9uc2UiLCJkaWFsb2dTdGF0ZSIsInNsb3RUb0VsaWNpdCIsInJlcGx5Il0sIm1hcHBpbmdzIjoidUdBQUE7O0FBRUEsSUFBTUEsR0FBRyxHQUFHLElBQUlDLGtCQUFKLENBQWU7QUFDekJDLEVBQUFBLE1BQU0sRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFVBREssRUFBZixDQUFaLEM7OztBQUllLGtCQUFDQyxNQUFELEVBQVk7QUFDekIsTUFBTUMsS0FBSyxHQUFHRCxNQUFNLENBQUMsZ0JBQUQsRUFBbUIsT0FBbkIsQ0FBcEI7QUFDQSxNQUFNRSxLQUFLLEdBQUdGLE1BQU0sQ0FBQyxnQkFBRCxFQUFtQixPQUFuQixDQUFwQjs7QUFFQSxNQUFJLENBQUNILE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxVQUFiLElBQTJCLENBQUNGLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSyxRQUE1QyxFQUFzRDtBQUNwREYsSUFBQUEsS0FBSyxDQUFDLHFDQUFELENBQUw7QUFDRDs7QUFFRCxTQUFPO0FBQ0xHLElBQUFBLE9BQU8sRUFBUEEsT0FESztBQUVQQyxJQUFBQSxLQUFLLEVBQUxBLEtBRk8sRUFBUDs7QUFJQSxXQUFTRCxPQUFULENBQWtCRSxHQUFsQixFQUF1QkMsT0FBdkIsRUFBZ0NDLElBQWhDLEVBQXNDO0FBQ3BDLFFBQUksQ0FBQ0QsT0FBTyxDQUFDRSxJQUFiLEVBQW1CO0FBQ2pCRCxNQUFBQSxJQUFJO0FBQ0o7QUFDRDs7QUFFRCxRQUFJRCxPQUFPLENBQUNHLE9BQVIsSUFBbUJILE9BQU8sQ0FBQ0ksSUFBUixLQUFpQixjQUFwQyxJQUFzREosT0FBTyxDQUFDSyxLQUFsRSxFQUF5RTtBQUN2RUosTUFBQUEsSUFBSTtBQUNKO0FBQ0Q7QUFDRE4sSUFBQUEsS0FBSyxtQkFBWUssT0FBTyxDQUFDTSxJQUFwQixFQUFMO0FBQ0EsUUFBSUMsTUFBTSxHQUFHO0FBQ1hDLE1BQUFBLFFBQVEsRUFBRWxCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSyxRQUFaLElBQXdCLFNBRHZCO0FBRVhhLE1BQUFBLE9BQU8sRUFBRW5CLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSyxRQUFaLElBQXdCLFNBRnRCO0FBR1hjLE1BQUFBLFNBQVMsRUFBRVYsT0FBTyxDQUFDRSxJQUhSO0FBSVg7QUFDQVMsTUFBQUEsTUFBTSxFQUFFWCxPQUFPLENBQUNNLElBQVIsQ0FBYU0sTUFBYixDQUFvQixDQUFwQixFQUF1QixHQUF2QixDQUxHO0FBTVhDLE1BQUFBLGlCQUFpQixFQUFFYixPQUFPLENBQUNhLGlCQU5oQjtBQU9YQyxNQUFBQSxpQkFBaUIsRUFBRWQsT0FBTyxDQUFDYyxpQkFQaEIsRUFBYjs7QUFTQSxRQUFJZCxPQUFPLENBQUNFLElBQVosRUFBa0I7QUFDaEIsVUFBSWEsT0FBTyxHQUFHNUIsR0FBRyxDQUFDNkIsUUFBSixDQUFhVCxNQUFiLEVBQXFCLFVBQVVVLEdBQVYsRUFBZUMsSUFBZixFQUFxQjtBQUN0RCxZQUFJRCxHQUFKLEVBQVM7QUFDUGhCLFVBQUFBLElBQUksQ0FBQ2dCLEdBQUQsQ0FBSjtBQUNELFNBRkQsTUFFTztBQUNMakIsVUFBQUEsT0FBTyxDQUFDYixHQUFSLEdBQWM7QUFDWmdDLFlBQUFBLE1BQU0sRUFBRUQsSUFBSSxDQUFDRSxVQUREO0FBRVpDLFlBQUFBLEtBQUssRUFBRUgsSUFBSSxDQUFDRyxLQUZBO0FBR1pDLFlBQUFBLE9BQU8sRUFBRUosSUFBSSxDQUFDSixpQkFIRjtBQUlaUyxZQUFBQSxRQUFRLEVBQUVMLElBQUksQ0FBQ2xCLE9BSkg7QUFLWndCLFlBQUFBLFdBQVcsRUFBRU4sSUFBSSxDQUFDTSxXQUxOO0FBTVpDLFlBQUFBLFlBQVksRUFBRVAsSUFBSSxDQUFDTyxZQU5QLEVBQWQ7O0FBUUE5QixVQUFBQSxLQUFLLENBQUMsNkJBQUQsRUFBZ0NLLE9BQU8sQ0FBQ2IsR0FBeEMsQ0FBTDtBQUNBLGNBQUkrQixJQUFJLENBQUNFLFVBQVQsRUFBcUI7QUFDbkJwQixZQUFBQSxPQUFPLENBQUNtQixNQUFSLEtBQW1CRCxJQUFJLENBQUNFLFVBQXhCO0FBQ0Q7QUFDRG5CLFVBQUFBLElBQUk7QUFDTDtBQUNGLE9BbEJhLENBQWQ7QUFtQkQsS0FwQkQsTUFvQk87QUFDTEEsTUFBQUEsSUFBSTtBQUNMO0FBQ0Y7O0FBRUQsV0FBU0gsS0FBVCxDQUFnQkMsR0FBaEIsRUFBcUJDLE9BQXJCLEVBQThCQyxJQUE5QixFQUFvQztBQUNsQyxRQUFJRCxPQUFPLENBQUNiLEdBQVIsSUFBZWEsT0FBTyxDQUFDYixHQUFSLENBQVlxQyxXQUFaLEtBQTRCLFdBQTNDLElBQTBEeEIsT0FBTyxDQUFDYixHQUFSLENBQVlpQyxVQUFaLEtBQTJCLElBQXpGLEVBQStGO0FBQzdGLGFBQU9yQixHQUFHLENBQUMyQixLQUFKLENBQVUxQixPQUFWLEVBQW1CQSxPQUFPLENBQUNiLEdBQVIsQ0FBWW9DLFFBQS9CLENBQVA7QUFDRDtBQUNEdEIsSUFBQUEsSUFBSTtBQUNMO0FBQ0YsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExleFJ1bnRpbWUgfSBmcm9tICdhd3Mtc2RrJ1xuXG5jb25zdCBsZXggPSBuZXcgTGV4UnVudGltZSh7XG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTlxufSlcblxuZXhwb3J0IGRlZmF1bHQgKGxvZ2dlcikgPT4ge1xuICBjb25zdCBlcnJvciA9IGxvZ2dlcignbWlkZGxld2FyZTpsZXgnLCAnZXJyb3InKVxuICBjb25zdCBkZWJ1ZyA9IGxvZ2dlcignbWlkZGxld2FyZTpsZXgnLCAnZGVidWcnKVxuXG4gIGlmICghcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTiB8fCAhcHJvY2Vzcy5lbnYuQk9UX05BTUUpIHtcbiAgICBlcnJvcignQVdTX1JFR0lPTiBhbmQgQk9UX05BTUUgbXVzdCBiZSBzZXQnKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZWNlaXZlLFxuICBoZWFyZH1cblxuICBmdW5jdGlvbiByZWNlaXZlIChib3QsIG1lc3NhZ2UsIG5leHQpIHtcbiAgICBpZiAoIW1lc3NhZ2UudGV4dCkge1xuICAgICAgbmV4dCgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZS5pc19lY2hvIHx8IG1lc3NhZ2UudHlwZSA9PT0gJ3NlbGZfbWVzc2FnZScgfHwgbWVzc2FnZS5hbGV4YSkge1xuICAgICAgbmV4dCgpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZGVidWcoYHVzZXJJZDogJHttZXNzYWdlLnVzZXJ9YClcbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgYm90QWxpYXM6IHByb2Nlc3MuZW52LkJPVF9OQU1FIHx8ICdCYXNlYm90JyxcbiAgICAgIGJvdE5hbWU6IHByb2Nlc3MuZW52LkJPVF9OQU1FIHx8ICdCYXNlYm90JyxcbiAgICAgIGlucHV0VGV4dDogbWVzc2FnZS50ZXh0LFxuICAgICAgLy8gRklYTUUgLSBhbGV4YSBwcm92aWRlcyBhIFVJRCB3aXRoID4gMjAwIGNoYXJhY3RlcnMgLSB0aGlzIHdpbGwgYmUgbWFzc2l2ZWx5IHRydW5jYXRlZCBhcyBhIHJlc3VsdCBhbmQgY291bGQgZXZlbiBsZWFkIHRvIHVuaW50ZW50aW9uYWwgc2Vzc2lvbiBoaWphY2tpbmdcbiAgICAgIHVzZXJJZDogbWVzc2FnZS51c2VyLnN1YnN0cigwLCAxMDApLFxuICAgICAgcmVxdWVzdEF0dHJpYnV0ZXM6IG1lc3NhZ2UucmVxdWVzdEF0dHJpYnV0ZXMsXG4gICAgICBzZXNzaW9uQXR0cmlidXRlczogbWVzc2FnZS5zZXNzaW9uQXR0cmlidXRlc1xuICAgIH1cbiAgICBpZiAobWVzc2FnZS50ZXh0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IGxleC5wb3N0VGV4dChwYXJhbXMsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lc3NhZ2UubGV4ID0ge1xuICAgICAgICAgICAgaW50ZW50OiBkYXRhLmludGVudE5hbWUsXG4gICAgICAgICAgICBzbG90czogZGF0YS5zbG90cyxcbiAgICAgICAgICAgIHNlc3Npb246IGRhdGEuc2Vzc2lvbkF0dHJpYnV0ZXMsXG4gICAgICAgICAgICByZXNwb25zZTogZGF0YS5tZXNzYWdlLFxuICAgICAgICAgICAgZGlhbG9nU3RhdGU6IGRhdGEuZGlhbG9nU3RhdGUsXG4gICAgICAgICAgICBzbG90VG9FbGljaXQ6IGRhdGEuc2xvdFRvRWxpY2l0XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlYnVnKCdyZXNwb25zZSByZWNlaXZlZCBmcm9tIExleDonLCBtZXNzYWdlLmxleClcbiAgICAgICAgICBpZiAoZGF0YS5pbnRlbnROYW1lKSB7XG4gICAgICAgICAgICBtZXNzYWdlLmludGVudCA9PT0gZGF0YS5pbnRlbnROYW1lXG4gICAgICAgICAgfVxuICAgICAgICAgIG5leHQoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0KClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoZWFyZCAoYm90LCBtZXNzYWdlLCBuZXh0KSB7XG4gICAgaWYgKG1lc3NhZ2UubGV4ICYmIG1lc3NhZ2UubGV4LmRpYWxvZ1N0YXRlID09PSAnRnVsZmlsbGVkJyAmJiBtZXNzYWdlLmxleC5pbnRlbnROYW1lICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYm90LnJlcGx5KG1lc3NhZ2UsIG1lc3NhZ2UubGV4LnJlc3BvbnNlKVxuICAgIH1cbiAgICBuZXh0KClcbiAgfVxufVxuIl19