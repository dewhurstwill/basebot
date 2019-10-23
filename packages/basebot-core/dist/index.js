"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.init = void 0;var _configParser = require("./configParser");
var _server = _interopRequireDefault(require("./server"));
var _applySkills = _interopRequireDefault(require("./applySkills"));
var _startChannels = _interopRequireDefault(require("./startChannels"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}

var init = function init(_ref) {var skills = _ref.skills,config = _ref.config;
  var logger = (0, _configParser.getSingleModule)(config.logger);
  var channels = (0, _configParser.getAllModules)(config.channels);
  var rawMiddleware = (0, _configParser.getAllModules)(config.middleware);
  var models = (0, _configParser.getAllModels)(rawMiddleware);
  var storage = (0, _configParser.getSingleModule)(config.storage)({ logger: logger, models: models });
  var middleware = rawMiddleware.map(function (mw) {return mw({ storage: storage, logger: logger });});
  var info = logger('core', 'info');var _Server =
  (0, _server["default"])({ logger: logger }),server = _Server.server,app = _Server.app;
  var controllers = (0, _startChannels["default"])({ channels: channels, storage: storage, logger: logger, server: server, app: app });
  // start server
  if (process.env.NODE_ENV !== 'test') {
    info('setting up server on port: ' + (process.env.PORT || 3000));
    app.listen(process.env.PORT || 3000);
  }

  (0, _applySkills["default"])({ controllers: controllers, middleware: middleware, logger: logger, skills: skills });
};exports.init = init;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0Iiwic2tpbGxzIiwiY29uZmlnIiwibG9nZ2VyIiwiY2hhbm5lbHMiLCJyYXdNaWRkbGV3YXJlIiwibWlkZGxld2FyZSIsIm1vZGVscyIsInN0b3JhZ2UiLCJtYXAiLCJtdyIsImluZm8iLCJzZXJ2ZXIiLCJhcHAiLCJjb250cm9sbGVycyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIlBPUlQiLCJsaXN0ZW4iXSwibWFwcGluZ3MiOiJpR0FBQTtBQUNBO0FBQ0E7QUFDQSx3RTs7QUFFTyxJQUFNQSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxPQUF3QixLQUFyQkMsTUFBcUIsUUFBckJBLE1BQXFCLENBQWJDLE1BQWEsUUFBYkEsTUFBYTtBQUMxQyxNQUFNQyxNQUFNLEdBQUcsbUNBQWdCRCxNQUFNLENBQUNDLE1BQXZCLENBQWY7QUFDQSxNQUFNQyxRQUFRLEdBQUcsaUNBQWNGLE1BQU0sQ0FBQ0UsUUFBckIsQ0FBakI7QUFDQSxNQUFNQyxhQUFhLEdBQUcsaUNBQWNILE1BQU0sQ0FBQ0ksVUFBckIsQ0FBdEI7QUFDQSxNQUFNQyxNQUFNLEdBQUcsZ0NBQWFGLGFBQWIsQ0FBZjtBQUNBLE1BQU1HLE9BQU8sR0FBRyxtQ0FBZ0JOLE1BQU0sQ0FBQ00sT0FBdkIsRUFBZ0MsRUFBQ0wsTUFBTSxFQUFOQSxNQUFELEVBQVNJLE1BQU0sRUFBTkEsTUFBVCxFQUFoQyxDQUFoQjtBQUNBLE1BQU1ELFVBQVUsR0FBR0QsYUFBYSxDQUFDSSxHQUFkLENBQWtCLFVBQUFDLEVBQUUsVUFBSUEsRUFBRSxDQUFDLEVBQUNGLE9BQU8sRUFBUEEsT0FBRCxFQUFVTCxNQUFNLEVBQU5BLE1BQVYsRUFBRCxDQUFOLEVBQXBCLENBQW5CO0FBQ0EsTUFBTVEsSUFBSSxHQUFHUixNQUFNLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBbkIsQ0FQMEM7QUFRbEIsMEJBQU8sRUFBRUEsTUFBTSxFQUFOQSxNQUFGLEVBQVAsQ0FSa0IsQ0FRbENTLE1BUmtDLFdBUWxDQSxNQVJrQyxDQVExQkMsR0FSMEIsV0FRMUJBLEdBUjBCO0FBUzFDLE1BQU1DLFdBQVcsR0FBRywrQkFBYyxFQUFFVixRQUFRLEVBQVJBLFFBQUYsRUFBWUksT0FBTyxFQUFQQSxPQUFaLEVBQXFCTCxNQUFNLEVBQU5BLE1BQXJCLEVBQTZCUyxNQUFNLEVBQU5BLE1BQTdCLEVBQXFDQyxHQUFHLEVBQUhBLEdBQXJDLEVBQWQsQ0FBcEI7QUFDQTtBQUNBLE1BQUlFLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLE1BQTdCLEVBQXFDO0FBQ25DTixJQUFBQSxJQUFJLENBQUMsaUNBQWlDSSxPQUFPLENBQUNDLEdBQVIsQ0FBWUUsSUFBWixJQUFvQixJQUFyRCxDQUFELENBQUo7QUFDQUwsSUFBQUEsR0FBRyxDQUFDTSxNQUFKLENBQVdKLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRSxJQUFaLElBQW9CLElBQS9CO0FBQ0Q7O0FBRUQsK0JBQVksRUFBRUosV0FBVyxFQUFYQSxXQUFGLEVBQWVSLFVBQVUsRUFBVkEsVUFBZixFQUEyQkgsTUFBTSxFQUFOQSxNQUEzQixFQUFtQ0YsTUFBTSxFQUFOQSxNQUFuQyxFQUFaO0FBQ0QsQ0FqQk0sQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEFsbE1vZHVsZXMsIGdldFNpbmdsZU1vZHVsZSwgZ2V0QWxsTW9kZWxzIH0gZnJvbSAnLi9jb25maWdQYXJzZXInXG5pbXBvcnQgU2VydmVyIGZyb20gJy4vc2VydmVyJ1xuaW1wb3J0IGFwcGx5U2tpbGxzIGZyb20gJy4vYXBwbHlTa2lsbHMnXG5pbXBvcnQgc3RhcnRDaGFubmVscyBmcm9tICcuL3N0YXJ0Q2hhbm5lbHMnXG5cbmV4cG9ydCBjb25zdCBpbml0ID0gKHsgc2tpbGxzLCBjb25maWcgfSkgPT4ge1xuICBjb25zdCBsb2dnZXIgPSBnZXRTaW5nbGVNb2R1bGUoY29uZmlnLmxvZ2dlcilcbiAgY29uc3QgY2hhbm5lbHMgPSBnZXRBbGxNb2R1bGVzKGNvbmZpZy5jaGFubmVscylcbiAgY29uc3QgcmF3TWlkZGxld2FyZSA9IGdldEFsbE1vZHVsZXMoY29uZmlnLm1pZGRsZXdhcmUpXG4gIGNvbnN0IG1vZGVscyA9IGdldEFsbE1vZGVscyhyYXdNaWRkbGV3YXJlKVxuICBjb25zdCBzdG9yYWdlID0gZ2V0U2luZ2xlTW9kdWxlKGNvbmZpZy5zdG9yYWdlKSh7bG9nZ2VyLCBtb2RlbHN9KVxuICBjb25zdCBtaWRkbGV3YXJlID0gcmF3TWlkZGxld2FyZS5tYXAobXcgPT4gbXcoe3N0b3JhZ2UsIGxvZ2dlcn0pKVxuICBjb25zdCBpbmZvID0gbG9nZ2VyKCdjb3JlJywgJ2luZm8nKVxuICBjb25zdCB7IHNlcnZlciwgYXBwIH0gPSBTZXJ2ZXIoeyBsb2dnZXIgfSlcbiAgY29uc3QgY29udHJvbGxlcnMgPSBzdGFydENoYW5uZWxzKHsgY2hhbm5lbHMsIHN0b3JhZ2UsIGxvZ2dlciwgc2VydmVyLCBhcHAgfSlcbiAgLy8gc3RhcnQgc2VydmVyXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnKSB7XG4gICAgaW5mbygnc2V0dGluZyB1cCBzZXJ2ZXIgb24gcG9ydDogJyArIChwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDApKVxuICAgIGFwcC5saXN0ZW4ocHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwKVxuICB9XG5cbiAgYXBwbHlTa2lsbHMoeyBjb250cm9sbGVycywgbWlkZGxld2FyZSwgbG9nZ2VyLCBza2lsbHMgfSlcbn1cbiJdfQ==