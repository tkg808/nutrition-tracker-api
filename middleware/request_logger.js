const requestLogger = function (request, response, next)
{
  console.log('\n===== Incoming Request =====\n');
  console.log(`${new Date()}`);
  console.log(`${request.method} ${request.url}`);
  console.log(`body ${JSON.stringify(request.body)}`);
  console.log('\n============================\n');
  next();
};

module.exports = requestLogger;