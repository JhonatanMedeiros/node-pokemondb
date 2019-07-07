const Bot = require('./core/lib');
let bot = new Bot();

(async () => {

  await bot.start();

  await bot.gotoPokemonList();

  await bot.stop();
})();
