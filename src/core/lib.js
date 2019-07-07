const Puppeteer = require("puppeteer");
const DataBase = require('./database');
const PokemonList = require('../pages/pokemonList');

class Bot {
  constructor(config) {
    this.core = {};
    this.core.config = config || {};
    this.core.pages = {};
    this.core.database = {};
    this.core.database = new DataBase();
  }

  async start() {
    this.core.browser = await Puppeteer.launch({
      headless: true,
      defaultViewport: {"width": 1024, "height": 768}
    });

    this.core.bot = await this.core.browser.newPage();
    await this.core.bot.setViewport({"width": 1024, "height": 768});

    this.pages();
  }

  pages() {
    this.core.pages.pokemonList = new PokemonList(this.core);
  }

  async gotoPokemonList() {
    await this.core.pages.pokemonList.start();
  }

  async stop() {
    await this.core.browser.newPage();
    await this.core.browser.close();
  }
}

module.exports = Bot;
